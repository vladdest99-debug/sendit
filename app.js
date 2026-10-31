/* ============================================
   СОСТОЯНИЕ
   ============================================ */
const state = {
  me: null,
  profile: { name: '', bio: '', avatarData: null },
  users: [],
  messages: {},
  currentChat: null,
  unread: {},
  replyTo: null,
  reactionTarget: null,
  pendingFileType: null,
  messagesLoaded: false,
  unsubUsers: null,
  unsubMessages: null
};

const $ = (id) => document.getElementById(id);

/* ============================================
   УТИЛИТЫ
   ============================================ */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function formatTime(ts){
  return new Date(ts).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
}
function toast(text){
  const t = $('toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2200);
}
function scrollToBottom(){
  const el = $('messages');
  el.scrollTop = el.scrollHeight;
}
function storageKey(){ return 'tg-clone:' + state.me; }
function fileToBase64(file){
  return new Promise((res, rej)=>{
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}
function formatSize(bytes){
  if(bytes < 1024) return bytes + ' Б';
  if(bytes < 1048576) return (bytes/1024).toFixed(1) + ' КБ';
  return (bytes/1048576).toFixed(1) + ' МБ';
}
function getFileIcon(name){
  const e = name.split('.').pop().toLowerCase();
  if(e === 'pdf') return '📕';
  if(['doc','docx'].includes(e)) return '📘';
  if(['xls','xlsx'].includes(e)) return '📗';
  if(['zip','rar','7z'].includes(e)) return '🗜️';
  if(e === 'txt') return '📄';
  return '📎';
}

/* ============================================
   ПРОФИЛЬ (хранится в localStorage браузера)
   ============================================ */
function saveProfile(){
  if(!state.me) return;
  try {
    localStorage.setItem(storageKey(), JSON.stringify({ profile: state.profile }));
  } catch(e){
    toast('Не удалось сохранить профиль (превышен лимит)');
  }
}
function loadProfile(){
  try {
    const raw = localStorage.getItem(storageKey());
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.profile) state.profile = { ...state.profile, ...d.profile };
  } catch(e){}
}

/* ============================================
   FIREBASE — регистрация и подписки
   ============================================ */
function registerInFirebase(){
  if(!window.fb) return;
  const { db, doc, setDoc, serverTimestamp } = window.fb;
  setDoc(doc(db, 'users', state.me), {
    name: state.me,
    displayName: state.profile.name || state.me,
    lastSeen: serverTimestamp()
  }).catch(err => console.error('register:', err));
}

function listenToUsers(){
  if(!window.fb) return;
  const { db, collection, onSnapshot } = window.fb;
  state.unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
    const list = [];
    snap.forEach(d => {
      const u = d.data();
      if(u.name === state.me) return;
      list.push({
        name: u.name,
        displayName: u.displayName || u.name,
        avatar: (u.name || '?')[0].toUpperCase(),
        online: true
      });
    });
    // Добавляем собеседников, с которыми уже есть переписка, но которых нет в коллекции users
    Object.keys(state.messages).forEach(n => {
      if(n && n !== state.me && !list.find(u => u.name === n)){
        list.push({ name: n, displayName: n, avatar: n[0].toUpperCase(), online: false });
      }
    });
    state.users = list;
    renderChatList();
  }, err => console.error('users listener:', err));
}

function listenToMessages(){
  if(!window.fb) return;
  const { db, collection, onSnapshot, query, orderBy } = window.fb;
  const q = query(collection(db, 'messages'), orderBy('time'));
  state.unsubMessages = onSnapshot(q, (snap) => {
    const grouped = {};
    snap.forEach(d => {
      const m = d.data();
      if(m.from !== state.me && m.to !== state.me) return;
      const other = m.from === state.me ? m.to : m.from;
      if(!other) return;
      if(!grouped[other]) grouped[other] = [];
      grouped[other].push({
        id: d.id,
        from: m.from,
        to: m.to,
        content: m.content,
        time: m.time && m.time.toDate ? m.time.toDate().getTime() : Date.now(),
        reactions: m.reactions || {},
        replyTo: m.replyTo || null
      });
    });

    // Считаем непрочитанные (только реально новые сообщения, не при первой загрузке)
    if(state.messagesLoaded){
      const oldMessages = state.messages;
      Object.keys(grouped).forEach(other => {
        const oldIds = new Set((oldMessages[other] || []).map(m => m.id));
        grouped[other].forEach(m => {
          if(!oldIds.has(m.id) && m.from !== state.me && state.currentChat !== other){
            state.unread[other] = (state.unread[other] || 0) + 1;
          }
        });
      });
    }
    state.messagesLoaded = true;
    state.messages = grouped;

    // Добавляем в список тех, кто есть только в сообщениях
    const known = new Set(state.users.map(u => u.name));
    Object.keys(grouped).forEach(n => {
      if(n && n !== state.me && !known.has(n)){
        state.users.push({ name: n, displayName: n, avatar: n[0].toUpperCase(), online: false });
        known.add(n);
      }
    });

    renderChatList();
    if(state.currentChat){
      renderMessages();
      scrollToBottom();
    }
  }, err => console.error('messages listener:', err));
}

/* ============================================
   ВХОД
   ============================================ */
function doLogin(){
  const name = $('username').value.trim();
  if(!name){ $('login-err').textContent = 'Введите имя'; return; }
  if(!window.fb){ $('login-err').textContent = 'Подключение к базе, подождите пару секунд и нажмите снова'; return; }

  state.me = name;
  loadProfile();
  if(!state.profile.name) state.profile.name = name;

  $('login').style.display = 'none';
  $('app').classList.add('active');
  renderMeBar();

  registerInFirebase();
  listenToUsers();
  listenToMessages();
  renderChatList();
}

function renderMeBar(){
  const av = $('me-avatar');
  if(state.profile.avatarData){
    av.innerHTML = `<img src="${state.profile.avatarData}" alt="">`;
  } else {
    av.textContent = (state.profile.name || state.me || '?')[0].toUpperCase();
  }
  $('me-name').textContent = state.profile.name || state.me;
}

/* ============================================
   ПРОФИЛЬ — модалка
   ============================================ */
let tempAvatar = null;
function openProfileModal(){
  tempAvatar = state.profile.avatarData;
  $('prof-name').value = state.profile.name;
  $('prof-bio').value = state.profile.bio || '';
  updateProfAvatar();
  $('profile-modal').classList.add('visible');
}
function updateProfAvatar(){
  const av = $('prof-avatar');
  const initial = (state.profile.name || state.me || '?')[0].toUpperCase();
  if(tempAvatar){
    av.innerHTML = `<img src="${tempAvatar}" alt=""><div class="edit-ov">📷</div>`;
  } else {
    av.innerHTML = `<span>${initial}</span><div class="edit-ov">📷</div>`;
  }
}

/* ============================================
   ОТПРАВКА СООБЩЕНИЙ
   ============================================ */
async function sendMessage(){
  const input = $('msg-input');
  const text = input.value.trim();
  if(!text || !state.currentChat) return;
  if(!window.fb){ toast('Нет подключения к базе'); return; }

  const { db, collection, addDoc, serverTimestamp } = window.fb;
  try {
    await addDoc(collection(db, 'messages'), {
      from: state.me,
      to: state.currentChat,
      content: { type: 'text', text },
      time: serverTimestamp(),
      reactions: {},
      replyTo: state.replyTo || null
    });
    input.value = '';
    input.style.height = 'auto';
    clearReply();
  } catch(e){
    console.error(e);
    toast('Не удалось отправить сообщение');
  }
}

async function sendFileContent(content){
  if(!state.currentChat || !window.fb) return;
  const { db, collection, addDoc, serverTimestamp } = window.fb;
  try {
    await addDoc(collection(db, 'messages'), {
      from: state.me,
      to: state.currentChat,
      content,
      time: serverTimestamp(),
      reactions: {},
      replyTo: state.replyTo || null
    });
    clearReply();
  } catch(e){
    console.error(e);
    toast('Не удалось отправить файл (возможно, слишком большой)');
  }
}

/* ============================================
   СПИСОК ЧАТОВ
   ============================================ */
function lastMsgTime(user){
  const m = state.messages[user];
  return m && m.length ? m[m.length-1].time : 0;
}
function renderChatList(){
  const search = ($('search').value || '').toLowerCase().trim();
  const list = state.users.filter(u => {
    const dn = (u.displayName || u.name).toLowerCase();
    return dn.includes(search) || u.name.toLowerCase().includes(search);
  });
  const c = $('chat-list');
  if(!list.length){
    c.innerHTML = '<div class="empty-list">Пока никого нет.<br><br>Откройте это же приложение во втором браузере (или в режиме инкогнито), войдите под другим именем — и вы появитесь друг у друга.</div>';
    return;
  }

  list.sort((a,b)=>{
    const la = lastMsgTime(a.name), lb = lastMsgTime(b.name);
    if(la || lb) return lb - la;
    return a.name.localeCompare(b.name);
  });

  c.innerHTML = list.map(u => {
    const msgs = state.messages[u.name] || [];
    const last = msgs[msgs.length - 1];
    let lastText = '';
    if(last){
      const preview = last.content.type === 'text'
        ? last.content.text
        : last.content.type === 'image' ? '📷 Фото'
        : last.content.type === 'video' ? '🎬 Видео'
        : last.content.type === 'audio' ? '🎵 Музыка'
        : '📎 Файл';
      lastText = (last.from === state.me ? 'Вы: ' : '') + escapeHtml(preview.slice(0,40));
    }
    const lastTime = last ? formatTime(last.time) : '';
    const unread = state.unread[u.name] || 0;
    const active = state.currentChat === u.name ? 'active' : '';
    const online = u.online ? 'online' : '';
    const displayName = u.displayName || u.name;

    return `<div class="chat-item ${active} ${online}" data-user="${escapeHtml(u.name)}">
      <div class="avatar">${escapeHtml(u.avatar)}</div>
      <div class="info">
        <div class="name">${escapeHtml(displayName)}</div>
        <div class="last">${lastText || '<span style="opacity:.5">Нет сообщений</span>'}</div>
      </div>
      <div class="meta">
        <div>${lastTime}</div>
        ${unread ? `<div class="badge">${unread}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  c.querySelectorAll('.chat-item').forEach(el=>{
    el.addEventListener('click', ()=>openChat(el.dataset.user));
  });
}

/* ============================================
   ОТКРЫТИЕ ЧАТА
   ============================================ */
function openChat(username){
  state.currentChat = username;
  state.unread[username] = 0;

  $('empty-chat').style.display = 'none';
  $('chat-area').style.display = 'flex';

  const user = state.users.find(u => u.name === username);
  $('chat-name').textContent = user ? (user.displayName || user.name) : username;
  $('chat-avatar').textContent = user ? user.avatar : username[0].toUpperCase();

  const st = $('chat-status');
  if(user && user.online){ st.textContent = 'онлайн'; st.classList.add('online'); }
  else { st.textContent = 'не в сети'; st.classList.remove('online'); }

  $('typing-ind').classList.remove('visible');
  clearReply();
  renderMessages();
  renderChatList();
  $('msg-input').focus();
  $('app').classList.add('chat-open');
}

/* ============================================
   СООБЩЕНИЯ — рендер
   ============================================ */
function getReplyPreview(msg){
  if(!msg || !msg.content) return '';
  if(msg.content.type === 'text') return msg.content.text.slice(0,50);
  if(msg.content.type === 'image') return '📷 Фото';
  if(msg.content.type === 'video') return '🎬 Видео';
  if(msg.content.type === 'audio') return '🎵 Музыка';
  return '📎 Файл';
}

function renderMessages(){
  const c = $('messages');
  const msgs = state.messages[state.currentChat] || [];
  if(!msgs.length){
    c.innerHTML = '<div style="text-align:center;color:#6c7883;padding:40px;font-size:13px">Начните диалог 👋</div>';
    return;
  }

  c.innerHTML = msgs.map(m => {
    const isMe = m.from === state.me;
    const ct = m.content;
    let body = '';

    if(ct.type === 'text'){
      body = `<div class="text">${escapeHtml(ct.text)}</div>`;
    } else if(ct.type === 'image'){
      body = `<div class="media" data-full="${ct.dataUrl}"><img src="${ct.dataUrl}" alt=""></div>`;
    } else if(ct.type === 'video'){
      body = `<div class="media"><video src="${ct.dataUrl}" controls></video></div>`;
    } else if(ct.type === 'audio'){
      body = `<div class="audio-player"><audio src="${ct.dataUrl}" controls></audio></div>`;
    } else if(ct.type === 'file'){
      body = `<div class="file-attach">
        <div class="ficon">${getFileIcon(ct.name)}</div>
        <div class="finfo">
          <div class="fname">${escapeHtml(ct.name)}</div>
          <div class="fsize">${formatSize(ct.size)}</div>
        </div>
        <a href="${ct.dataUrl}" download="${escapeHtml(ct.name)}" title="Скачать">⬇</a>
      </div>`;
    }

    let replyHtml = '';
    if(m.replyTo){
      const prev = msgs.find(x => x.id === m.replyTo);
      if(prev){
        const rname = prev.from === state.me ? 'Вы' : prev.from;
        replyHtml = `<div class="reply-quote">
          <div class="rname">${escapeHtml(rname)}</div>
          <div class="rtext">${escapeHtml(getReplyPreview(prev))}</div>
        </div>`;
      }
    }

    let reactionsHtml = '';
    const rk = Object.keys(m.reactions || {});
    if(rk.length){
      reactionsHtml = '<div class="reactions">' + rk.map(emoji => {
        const users = m.reactions[emoji];
        const mine = users.includes(state.me) ? 'mine' : '';
        return `<span class="react ${mine}" data-id="${m.id}" data-emoji="${emoji}">${emoji} ${users.length}</span>`;
      }).join('') + '</div>';
    }

    return `<div class="msg-row ${isMe ? 'me' : 'other'}" data-id="${m.id}">
      <div class="bubble">
        ${replyHtml}
        ${body}
        ${reactionsHtml}
        <div class="footer">
          <span>${formatTime(m.time)}</span>
          ${isMe ? '<span class="check">✓✓</span>' : ''}
        </div>
      </div>
      <div class="msg-tools">
        <button class="tool-react" data-id="${m.id}" title="Реакция">😊</button>
        <button class="tool-reply" data-id="${m.id}" title="Ответить">↩</button>
        ${isMe ? `<button class="tool-del" data-id="${m.id}" title="Удалить">🗑</button>` : ''}
      </div>
    </div>`;
  }).join('');

  c.querySelectorAll('.media[data-full]').forEach(el=>{
    el.addEventListener('click', ()=>openViewer(el.dataset.full));
  });
  c.querySelectorAll('.tool-reply').forEach(el=>{
    el.addEventListener('click', ()=>setReply(el.dataset.id));
  });
  c.querySelectorAll('.tool-del').forEach(el=>{
    el.addEventListener('click', ()=>deleteMessage(el.dataset.id));
  });
  c.querySelectorAll('.tool-react').forEach(el=>{
    el.addEventListener('click', e => showReactionPicker(el.dataset.id, e.clientX, e.clientY));
  });
  c.querySelectorAll('.react').forEach(el=>{
    el.addEventListener('click', ()=>toggleReaction(el.dataset.id, el.dataset.emoji));
  });

  scrollToBottom();
}

/* ============================================
   REPLY
   ============================================ */
function setReply(id){
  const msgs = state.messages[state.currentChat] || [];
  const m = msgs.find(x => x.id === id);
  if(!m) return;
  state.replyTo = id;
  $('reply-name').textContent = m.from === state.me ? 'Вы' : m.from;
  $('reply-text').textContent = getReplyPreview(m);
  $('reply-bar').classList.add('visible');
  $('msg-input').focus();
}
function clearReply(){
  state.replyTo = null;
  $('reply-bar').classList.remove('visible');
}

/* ============================================
   РЕАКЦИИ
   ============================================ */
function showReactionPicker(id, x, y){
  state.reactionTarget = id;
  const p = $('reaction-picker');
  p.style.left = Math.min(x, window.innerWidth - 240) + 'px';
  p.style.top = Math.max(y - 50, 10) + 'px';
  p.classList.add('visible');
}

async function toggleReaction(id, emoji){
  if(!window.fb) return;
  const msgs = state.messages[state.currentChat] || [];
  const m = msgs.find(x => x.id === id);
  if(!m) return;

  const reactions = JSON.parse(JSON.stringify(m.reactions || {}));
  if(!reactions[emoji]) reactions[emoji] = [];
  const arr = reactions[emoji];
  const idx = arr.indexOf(state.me);
  if(idx === -1) arr.push(state.me);
  else arr.splice(idx, 1);
  if(!arr.length) delete reactions[emoji];

  const { db, doc, updateDoc } = window.fb;
  try {
    await updateDoc(doc(db, 'messages', id), { reactions });
  } catch(e){
    console.error(e);
    toast('Не удалось поставить реакцию');
  }
}

/* ============================================
   УДАЛЕНИЕ
   ============================================ */
async function deleteMessage(id){
  if(!confirm('Удалить сообщение?')) return;
  if(!window.fb) return;
  const { db, doc, deleteDoc } = window.fb;
  try {
    await deleteDoc(doc(db, 'messages', id));
  } catch(e){
    console.error(e);
    toast('Не удалось удалить');
  }
}

/* ============================================
   ВЛОЖЕНИЯ
   ============================================ */
function openFilePicker(type){
  state.pendingFileType = type;
  const fi = $('file-input');
  fi.accept = type === 'image' ? 'image/*'
    : type === 'video' ? 'video/*'
    : type === 'audio' ? 'audio/*'
    : '';
  fi.value = '';
  fi.click();
}

async function handleFileSelected(file){
  if(!file) return;
  const type = state.pendingFileType;
  // Firestore: документ до 1 МБ, base64 занимает ~+33%. Ставим 500 КБ для запаса.
  const MAX = 500 * 1024;
  if(file.size > MAX){
    toast('Файл слишком большой (макс 500 КБ для Firebase)');
    return;
  }
  try {
    const dataUrl = await fileToBase64(file);
    const ct = { type, dataUrl };
    if(type === 'file' || type === 'audio') ct.name = file.name;
    if(type === 'file') ct.size = file.size;
    await sendFileContent(ct);
  } catch(e){
    console.error(e);
    toast('Ошибка чтения файла');
  }
}

/* ============================================
   ПРОСМОТР МЕДИА
   ============================================ */
function openViewer(url){
  $('viewer-content').innerHTML = `<img src="${url}" alt="">`;
  $('viewer').classList.add('visible');
}
function closeViewer(){
  $('viewer').classList.remove('visible');
  $('viewer-content').innerHTML = '';
}

/* ============================================
   ОБРАБОТЧИКИ СОБЫТИЙ
   ============================================ */
$('login-btn').addEventListener('click', doLogin);
$('username').addEventListener('keydown', e => { if(e.key === 'Enter') doLogin(); });

$('me-bar').addEventListener('click', openProfileModal);
$('prof-avatar').addEventListener('click', ()=>$('avatar-input').click());
$('avatar-input').addEventListener('change', async e=>{
  const f = e.target.files[0]; if(!f) return;
  if(f.size > 2*1024*1024){ toast('Аватар слишком большой (макс 2 МБ)'); return; }
  tempAvatar = await fileToBase64(f);
  updateProfAvatar();
});
$('prof-cancel').addEventListener('click', ()=>{
  $('profile-modal').classList.remove('visible');
  $('avatar-input').value = '';
});
$('prof-save').addEventListener('click', async ()=>{
  const n = $('prof-name').value.trim();
  if(!n){ toast('Имя не может быть пустым'); return; }
  state.profile.name = n;
  state.profile.bio = $('prof-bio').value.trim();
  state.profile.avatarData = tempAvatar;
  renderMeBar();
  saveProfile();
  $('profile-modal').classList.remove('visible');
  toast('Профиль сохранён ✓');

  if(window.fb && state.me){
    const { db, doc, setDoc } = window.fb;
    try {
      await setDoc(doc(db, 'users', state.me), { displayName: n }, { merge: true });
    } catch(e){ console.error(e); }
  }
});

$('send-btn').addEventListener('click', sendMessage);
$('msg-input').addEventListener('keydown', e=>{
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});
$('msg-input').addEventListener('input', function(){
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

$('reply-close').addEventListener('click', clearReply);

$('attach-btn').addEventListener('click', ()=>{
  $('attach-menu').classList.toggle('visible');
});
$('attach-menu').querySelectorAll('button').forEach(b=>{
  b.addEventListener('click', ()=>{
    openFilePicker(b.dataset.type);
    $('attach-menu').classList.remove('visible');
  });
});
$('file-input').addEventListener('change', e=>{
  handleFileSelected(e.target.files[0]);
});

$('reaction-picker').querySelectorAll('button').forEach(b=>{
  b.addEventListener('click', ()=>{
    if(state.reactionTarget) toggleReaction(state.reactionTarget, b.dataset.emoji);
    $('reaction-picker').classList.remove('visible');
    state.reactionTarget = null;
  });
});
document.addEventListener('click', e=>{
  if(!e.target.closest('#reaction-picker') && !e.target.closest('.tool-react')){
    $('reaction-picker').classList.remove('visible');
  }
  if(!e.target.closest('#attach-menu') && !e.target.closest('#attach-btn')){
    $('attach-menu').classList.remove('visible');
  }
});

$('viewer-close').addEventListener('click', closeViewer);
$('viewer').addEventListener('click', e=>{
  if(e.target.id === 'viewer') closeViewer();
});

$('search').addEventListener('input', renderChatList);

$('back-btn').addEventListener('click', ()=>{
  $('app').classList.remove('chat-open');
});
if(window.innerWidth <= 768) $('back-btn').style.display = 'block';

$('username').focus();

console.log('✅ Мессенджер загружен');