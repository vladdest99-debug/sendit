/* ============================================
   СОСТОЯНИЕ
   ============================================ */
const state = {
  uid: null,
  nickname: null,
  pendingNickname: null,
  profile: { displayName: '', bio: '', avatarData: null },
  users: [],
  messages: {},
  groupMessages: {},
  groups: {},
  currentChat: null,
  currentChatType: null,
  unread: {},
  replyTo: null,
  reactionTarget: null,
  pendingFileType: null,
  messagesLoaded: false,
  contactUids: [],
  profiles: {},
  contactListeners: {},
  groupUnsubs: {},
  profileFetching: new Set(),
  unsubMe: null,
  unsubMessages: null,
  unsubGroups: null,
  // stories
  stories: {},             // storyId -> story
  storyGroups: {},         // authorUid -> [story]
  unsubStories: null,
  seenStoryIds: new Set(),
  storyTimer: null,
  currentStoryGroup: null,
  currentStoryIndex: 0,
  pendingStoryMedia: null  // {type:'image'|'video', dataUrl}
};

let authMode = 'login';
let tempAvatar = null;
let currentGroupSettingsId = null;
let tempGroupAvatar = null;

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
function formatStoryTime(ts){
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if(min < 1) return 'только что';
  if(min < 60) return min + ' мин назад';
  const h = Math.floor(min / 60);
  return h + ' ч назад';
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
  if(!el) return;
  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  });
}
function profileKey(){ return 'tg-clone:' + state.uid; }
function storiesSeenKey(){ return 'tg-stories-seen:' + state.uid; }
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
function nicknameToEmail(nickname){
  const lower = nickname.toLowerCase();
  const hex = Array.from(lower).map(c => c.codePointAt(0).toString(16)).join('x');
  return `u${hex}@sendit.local`;
}
function validateNickname(nickname){
  if(nickname.length < 2) return 'Никнейм слишком короткий (мин. 2 символа)';
  if(nickname.length > 20) return 'Никнейм слишком длинный (макс. 20)';
  if(!/^[\p{L}0-9_]+$/u.test(nickname)) return 'Только буквы, цифры и _';
  return null;
}
function getUserDisplayName(uid){
  if(uid === state.uid) return 'Вы';
  const u = state.profiles[uid];
  return u ? u.displayName : '?';
}
function plural(n, one, few, many){
  const m10 = n % 10, m100 = n % 100;
  if(m10 === 1 && m100 !== 11) return one;
  if(m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}
function isChannel(gid){
  return !!(state.groups[gid] && state.groups[gid].isChannel);
}
function isAdminIn(gid){
  const g = state.groups[gid];
  return !!(g && g.members && g.members[state.uid] && g.members[state.uid].role === 'admin');
}
function canPostInCurrentChat(){
  if(state.currentChatType !== 'group') return true;
  const gid = state.currentChat;
  if(!isChannel(gid)) return true;
  return isAdminIn(gid);
}

/* ============================================
   ПРОФИЛЬ + STORIES SEEN (localStorage)
   ============================================ */
function saveProfile(){
  if(!state.uid) return;
  try { localStorage.setItem(profileKey(), JSON.stringify({ profile: state.profile })); }
  catch(e){ toast('Не удалось сохранить профиль'); }
}
function loadProfile(){
  try {
    const raw = localStorage.getItem(profileKey());
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.profile) state.profile = { ...state.profile, ...d.profile };
  } catch(e){}
}
function saveSeenStories(){
  if(!state.uid) return;
  try {
    const arr = Array.from(state.seenStoryIds).slice(-500);
    localStorage.setItem(storiesSeenKey(), JSON.stringify(arr));
  } catch(e){}
}
function loadSeenStories(){
  try {
    const raw = localStorage.getItem(storiesSeenKey());
    if(!raw) return;
    const arr = JSON.parse(raw);
    if(Array.isArray(arr)) state.seenStoryIds = new Set(arr);
  } catch(e){}
}

/* ============================================
   ЭКРАН ВХОДА
   ============================================ */
function setAuthMode(mode){
  authMode = mode;
  $('tab-login').classList.toggle('active', mode === 'login');
  $('tab-register').classList.toggle('active', mode === 'register');
  $('auth-submit').textContent = mode === 'login' ? 'Войти' : 'Зарегистрироваться';
  $('password-confirm').style.display = mode === 'register' ? 'block' : 'none';
  $('login-err').textContent = '';
  $('auth-title').textContent = mode === 'login' ? 'Добро пожаловать' : 'Создать аккаунт';
}
function showErr(msg){ $('login-err').textContent = msg; }

async function handleRegister(){
  const nickname = $('username').value.trim();
  const password = $('password').value;
  const confirm = $('password-confirm').value;
  const err = validateNickname(nickname);
  if(err){ showErr(err); return; }
  if(password.length < 6){ showErr('Пароль минимум 6 символов'); return; }
  if(password !== confirm){ showErr('Пароли не совпадают'); return; }
  if(!window.fb){ showErr('Подключение к серверу, подождите'); return; }

  const { auth, createUserWithEmailAndPassword, db, doc, setDoc, serverTimestamp } = window.fb;
  state.pendingNickname = nickname;
  showErr('');
  try {
    const cred = await createUserWithEmailAndPassword(auth, nicknameToEmail(nickname), password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      nickname: nickname,
      nicknameLower: nickname.toLowerCase(),
      displayName: nickname,
      contacts: [],
      createdAt: serverTimestamp()
    });
  } catch(e){
    state.pendingNickname = null;
    if(e.code === 'auth/email-already-in-use') showErr('Этот никнейм уже занят');
    else if(e.code === 'auth/weak-password') showErr('Слишком простой пароль');
    else if(e.code === 'auth/network-request-failed') showErr('Нет интернета');
    else showErr('Ошибка: ' + (e.message || e.code));
  }
}

async function handleLogin(){
  const nickname = $('username').value.trim();
  const password = $('password').value;
  if(!nickname){ showErr('Введите никнейм'); return; }
  if(!password){ showErr('Введите пароль'); return; }
  if(!window.fb){ showErr('Подключение к серверу, подождите'); return; }

  const { auth, signInWithEmailAndPassword } = window.fb;
  showErr('');
  try {
    await signInWithEmailAndPassword(auth, nicknameToEmail(nickname), password);
  } catch(e){
    if(['auth/user-not-found','auth/wrong-password','auth/invalid-credential','auth/invalid-login-credentials'].includes(e.code)){
      showErr('Неверный никнейм или пароль');
    } else if(e.code === 'auth/network-request-failed') showErr('Нет интернета');
    else showErr('Ошибка: ' + (e.message || e.code));
  }
}

/* ============================================
   ПРОФИЛИ
   ============================================ */
async function ensureProfile(uid){
  if(state.profiles[uid] || state.profileFetching.has(uid)) return;
  state.profileFetching.add(uid);
  try {
    const { db, doc, getDoc } = window.fb;
    const snap = await getDoc(doc(db, 'users', uid));
    if(snap.exists()){
      const d = snap.data();
      state.profiles[uid] = {
        uid, nickname: d.nickname,
        displayName: d.displayName || d.nickname,
        avatar: (d.displayName || d.nickname || '?')[0].toUpperCase()
      };
    } else {
      state.profiles[uid] = { uid, nickname: '?', displayName: 'Удалённый', avatar: '?' };
    }
    rebuildUsersList();
    if(currentGroupSettingsId) renderGroupSettings();
  } catch(e){
    console.error('ensureProfile:', e);
  } finally {
    state.profileFetching.delete(uid);
  }
}

function listenToMyContacts(){
  const { db, doc, onSnapshot } = window.fb;
  if(state.unsubMe) state.unsubMe();
  state.unsubMe = onSnapshot(doc(db, 'users', state.uid), (snap) => {
    if(!snap.exists()) return;
    const data = snap.data();
    const newUids = (data.contacts || []).filter(u => u !== state.uid);

    Object.keys(state.contactListeners).forEach(uid => {
      if(!newUids.includes(uid)){
        state.contactListeners[uid]();
        delete state.contactListeners[uid];
      }
    });

    newUids.forEach(uid => {
      if(!state.contactListeners[uid]){
        state.contactListeners[uid] = onSnapshot(doc(db, 'users', uid), (s) => {
          if(s.exists()){
            const d = s.data();
            state.profiles[uid] = {
              uid, nickname: d.nickname,
              displayName: d.displayName || d.nickname,
              avatar: (d.displayName || d.nickname || '?')[0].toUpperCase()
            };
          } else {
            state.profiles[uid] = { uid, nickname: '?', displayName: 'Удалённый', avatar: '?' };
          }
          rebuildUsersList();
          if(currentGroupSettingsId) renderGroupSettings();
        }, err => console.error('contact listener:', err));
      }
    });

    state.contactUids = newUids;
    rebuildUsersList();
    renderStoriesBar();
  }, err => console.error('my user listener:', err));
}

function rebuildUsersList(){
  const uids = new Set();
  state.contactUids.forEach(u => uids.add(u));
  Object.keys(state.messages).forEach(u => { if(u && u !== state.uid) uids.add(u); });

  const list = [];
  uids.forEach(uid => {
    if(state.profiles[uid]) list.push(state.profiles[uid]);
    else ensureProfile(uid);
  });
  state.users = list;
  renderChatList();
}

/* ============================================
   ПОИСК ПО ЛОГИНУ
   ============================================ */
async function findUserByNickname(nickname){
  const { db, collection, query, where, getDocs } = window.fb;
  const q = query(collection(db, 'users'), where('nicknameLower', '==', nickname.toLowerCase()));
  const snap = await getDocs(q);
  if(snap.empty) return null;
  const d = snap.docs[0].data();
  return { uid: d.uid, nickname: d.nickname, displayName: d.displayName || d.nickname };
}

async function addContactByUid(uid){
  const { db, doc, updateDoc, arrayUnion } = window.fb;
  await updateDoc(doc(db, 'users', state.uid), { contacts: arrayUnion(uid) });
}

async function doFind(){
  const nickname = $('find-input').value.trim();
  const res = $('find-result');
  if(!nickname){ res.innerHTML = '<div class="find-error">Введите логин</div>'; return; }
  res.innerHTML = '<div class="find-empty">Поиск...</div>';
  try {
    const found = await findUserByNickname(nickname);
    if(!found){ res.innerHTML = '<div class="find-error">Пользователь не найден</div>'; return; }
    if(found.uid === state.uid){ res.innerHTML = '<div class="find-error">Это ваш логин</div>'; return; }
    if(state.contactUids.includes(found.uid)){
      res.innerHTML = `<div class="find-user">
        <div class="avatar">${escapeHtml((found.displayName||found.nickname)[0].toUpperCase())}</div>
        <div class="info">
          <div class="name">${escapeHtml(found.displayName)}</div>
          <div class="nick">@${escapeHtml(found.nickname)} · уже в контактах</div>
        </div>
      </div>`;
      return;
    }
    res.innerHTML = `<div class="find-user">
      <div class="avatar">${escapeHtml((found.displayName||found.nickname)[0].toUpperCase())}</div>
      <div class="info">
        <div class="name">${escapeHtml(found.displayName)}</div>
        <div class="nick">@${escapeHtml(found.nickname)}</div>
      </div>
      <button id="find-add-btn">Добавить</button>
    </div>`;

    const btn = document.getElementById('find-add-btn');
    btn.addEventListener('click', async () => {
      btn.disabled = true; btn.textContent = '...';
      try {
        await addContactByUid(found.uid);
        toast('Контакт добавлен ✓');
        $('find-modal').classList.remove('visible');
        setTimeout(() => {
          if(!state.contactUids.includes(found.uid)){
            state.profiles[found.uid] = {
              uid: found.uid, nickname: found.nickname,
              displayName: found.displayName,
              avatar: (found.displayName || found.nickname)[0].toUpperCase()
            };
            rebuildUsersList();
            renderStoriesBar();
          }
          openChat(found.uid, 'user');
        }, 400);
      } catch(e){
        console.error(e);
        btn.disabled = false; btn.textContent = 'Добавить';
        toast('Не удалось добавить контакт');
      }
    });
  } catch(e){
    console.error(e);
    res.innerHTML = '<div class="find-error">Ошибка поиска</div>';
  }
}

function openFindModal(){
  $('find-input').value = '';
  $('find-result').innerHTML = '';
  $('find-modal').classList.add('visible');
  setTimeout(() => $('find-input').focus(), 50);
}

/* ============================================
   ИСТОРИИ
   ============================================ */
function listenToStories(){
  const { db, collection, onSnapshot } = window.fb;
  if(state.unsubStories) state.unsubStories();
  state.unsubStories = onSnapshot(collection(db, 'stories'), (snap) => {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000; // 24 часа
    const stories = {};
    snap.forEach(d => {
      const s = d.data();
      const created = s.createdAt && s.createdAt.toDate ? s.createdAt.toDate().getTime() : 0;
      if(created < cutoff) return;
      stories[d.id] = {
        id: d.id,
        authorUid: s.authorUid,
        type: s.type,
        dataUrl: s.dataUrl,
        caption: s.caption || '',
        createdAt: created
      };
    });
    state.stories = stories;
    buildStoryGroups();
    renderStoriesBar();
  }, err => console.error('stories listener:', err));
}

function buildStoryGroups(){
  const groups = {};
  Object.values(state.stories).forEach(s => {
    if(!groups[s.authorUid]) groups[s.authorUid] = [];
    groups[s.authorUid].push(s);
  });
  Object.keys(groups).forEach(uid => {
    groups[uid].sort((a, b) => a.createdAt - b.createdAt);
  });
  state.storyGroups = groups;
}

function getVisibleStoryAuthors(){
  // сначала я, потом контакты с историями
  const result = [];
  if(state.storyGroups[state.uid] && state.storyGroups[state.uid].length){
    result.push(state.uid);
  }
  state.contactUids.forEach(uid => {
    if(state.storyGroups[uid] && state.storyGroups[uid].length) result.push(uid);
  });
  return result;
}

function renderStoriesBar(){
  const bar = $('stories-bar');
  const myStories = state.storyGroups[state.uid] || [];
  const hasMine = myStories.length > 0;

  let html = '';

  // карточка «Моя история»
  const myFirstStory = hasMine ? myStories[myStories.length - 1] : null;
  const myThumb = myFirstStory
    ? (myFirstStory.type === 'image'
        ? `<img src="${myFirstStory.dataUrl}" alt="">`
        : `<video src="${myFirstStory.dataUrl}" muted></video>`)
    : `<span>+</span>`;

  html += `<div class="story-item my-story" data-author="${escapeHtml(state.uid)}">
    <div class="story-ring ${hasMine ? 'seen' : 'add'}">
      <div class="story-thumb">${myThumb}</div>
    </div>
    <div class="story-label">Моя история</div>
    ${hasMine ? `<button class="story-add-btn" id="story-add-btn" title="Добавить историю">＋</button>` : ''}
  </div>`;

  // остальные авторы (контакты)
  state.contactUids.forEach(uid => {
    const stories = state.storyGroups[uid];
    if(!stories || !stories.length) return;
    const p = state.profiles[uid] || { displayName: '?', avatar: '?', nickname: '?' };
    const firstUnseen = stories.find(s => !state.seenStoryIds.has(s.id));
    const isSeen = !firstUnseen;
    const preview = firstUnseen || stories[stories.length - 1];
    const thumb = preview.type === 'image'
      ? `<img src="${preview.dataUrl}" alt="">`
      : `<video src="${preview.dataUrl}" muted></video>`;

    html += `<div class="story-item" data-author="${escapeHtml(uid)}">
      <div class="story-ring ${isSeen ? 'seen' : 'unseen'}">
        <div class="story-thumb">${thumb}</div>
      </div>
      <div class="story-label">${escapeHtml(p.displayName)}</div>
    </div>`;
  });

  bar.innerHTML = html;

  // Обработчики
  bar.querySelectorAll('.story-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if(e.target.id === 'story-add-btn'){ e.stopPropagation(); triggerStoryFileInput(); return; }
      const uid = el.dataset.author;
      if(uid === state.uid && !state.storyGroups[state.uid]){
        triggerStoryFileInput();
        return;
      }
      openStoryViewer(uid);
    });
  });
}

function triggerStoryFileInput(){
  $('story-file-input').value = '';
  $('story-file-input').click();
}

async function handleStoryFileSelected(file){
  if(!file) return;
  if(file.size > 500 * 1024){ toast('Файл слишком большой (макс 500 КБ)'); return; }
  try {
    const dataUrl = await fileToBase64(file);
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    state.pendingStoryMedia = { type, dataUrl };

    const prev = $('story-preview');
    if(type === 'image'){
      prev.innerHTML = `<img src="${dataUrl}" alt="">`;
    } else {
      prev.innerHTML = `<video src="${dataUrl}" controls muted></video>`;
    }
    $('story-caption').value = '';
    $('story-create-modal').classList.add('visible');
  } catch(e){
    console.error(e);
    toast('Ошибка чтения файла');
  }
}

async function publishStory(){
  if(!state.pendingStoryMedia){ toast('Выберите фото или видео'); return; }
  const { db, collection, addDoc, serverTimestamp } = window.fb;
  const btn = $('story-create-publish');
  btn.disabled = true; btn.textContent = '...';
  try {
    await addDoc(collection(db, 'stories'), {
      authorUid: state.uid,
      type: state.pendingStoryMedia.type,
      dataUrl: state.pendingStoryMedia.dataUrl,
      caption: $('story-caption').value.trim(),
      createdAt: serverTimestamp()
    });
    state.pendingStoryMedia = null;
    $('story-create-modal').classList.remove('visible');
    toast('История опубликована ✓');
  } catch(e){
    console.error(e);
    toast('Не удалось опубликовать');
  } finally {
    btn.disabled = false; btn.textContent = 'Опубликовать';
  }
}

function openStoryViewer(authorUid){
  const stories = state.storyGroups[authorUid];
  if(!stories || !stories.length) return;
  state.currentStoryGroup = authorUid;
  // начать с первой непросмотренной
  let idx = stories.findIndex(s => !state.seenStoryIds.has(s.id));
  if(idx === -1) idx = 0;
  state.currentStoryIndex = idx;

  $('story-viewer').classList.add('visible');
  showStory();
}

function showStory(){
  const authorUid = state.currentStoryGroup;
  const stories = state.storyGroups[authorUid];
  if(!stories || !stories.length){ closeStoryViewer(); return; }
  if(state.currentStoryIndex < 0) state.currentStoryIndex = 0;
  if(state.currentStoryIndex >= stories.length){ closeStoryViewer(); return; }

  const story = stories[state.currentStoryIndex];
  const p = state.profiles[authorUid] || { displayName: '?', avatar: '?' };

  // Шапка
  $('story-viewer-avatar').textContent = p.avatar;
  $('story-viewer-author').textContent = authorUid === state.uid ? 'Моя история' : p.displayName;
  $('story-viewer-time').textContent = formatStoryTime(story.createdAt);
  $('story-viewer-delete').style.display = authorUid === state.uid ? '' : 'none';

  // Прогресс-бары
  $('story-progress').innerHTML = stories.map((_, i) => {
    const cls = i < state.currentStoryIndex ? 'filled'
      : i === state.currentStoryIndex ? 'active'
      : '';
    return `<div class="story-progress-seg ${cls}"><div class="story-progress-fill"></div></div>`;
  }).join('');

  // Медиа
  const cont = $('story-viewer-content');
  if(story.type === 'image'){
    cont.innerHTML = `<img src="${story.dataUrl}" alt="">`;
  } else {
    cont.innerHTML = `<video src="${story.dataUrl}" autoplay playsinline></video>`;
  }

  // Подпись
  $('story-viewer-caption').textContent = story.caption || '';
  $('story-viewer-caption').style.display = story.caption ? '' : 'none';

  // Отметить просмотренной
  if(!state.seenStoryIds.has(story.id)){
    state.seenStoryIds.add(story.id);
    saveSeenStories();
  }

  // Таймер
  if(state.storyTimer) clearTimeout(state.storyTimer);
  const activeSeg = $('story-progress').children[state.currentStoryIndex];
  const fill = activeSeg ? activeSeg.querySelector('.story-progress-fill') : null;

  if(story.type === 'image'){
    if(fill){
      fill.style.transition = 'none';
      fill.style.width = '0%';
      // trigger reflow
      void fill.offsetWidth;
      fill.style.transition = 'width 5s linear';
      fill.style.width = '100%';
    }
    state.storyTimer = setTimeout(() => nextStory(), 5000);
  } else {
    const video = cont.querySelector('video');
    if(video){
      const onMeta = () => {
        const dur = isFinite(video.duration) && video.duration > 0 ? video.duration * 1000 : 5000;
        if(fill){
          fill.style.transition = 'none';
          fill.style.width = '0%';
          void fill.offsetWidth;
          fill.style.transition = `width ${dur}ms linear`;
          fill.style.width = '100%';
        }
        state.storyTimer = setTimeout(() => nextStory(), dur + 200);
      };
      video.addEventListener('loadedmetadata', onMeta, { once: true });
      // fallback
      state.storyTimer = setTimeout(() => nextStory(), 15000);
      video.addEventListener('ended', () => {
        if(state.storyTimer) clearTimeout(state.storyTimer);
        nextStory();
      }, { once: true });
    }
  }
}

function nextStory(){
  const stories = state.storyGroups[state.currentStoryGroup] || [];
  if(state.currentStoryIndex < stories.length - 1){
    state.currentStoryIndex++;
    showStory();
  } else {
    // переход к следующему автору
    const authors = getVisibleStoryAuthors();
    const idx = authors.indexOf(state.currentStoryGroup);
    if(idx !== -1 && idx < authors.length - 1){
      const nextAuthor = authors[idx + 1];
      state.currentStoryGroup = nextAuthor;
      state.currentStoryIndex = 0;
      showStory();
    } else {
      closeStoryViewer();
    }
  }
}

function prevStory(){
  if(state.currentStoryIndex > 0){
    state.currentStoryIndex--;
    showStory();
  } else {
    // к предыдущему автору (последняя история)
    const authors = getVisibleStoryAuthors();
    const idx = authors.indexOf(state.currentStoryGroup);
    if(idx > 0){
      const prevAuthor = authors[idx - 1];
      const prevStories = state.storyGroups[prevAuthor] || [];
      state.currentStoryGroup = prevAuthor;
      state.currentStoryIndex = Math.max(0, prevStories.length - 1);
      showStory();
    }
  }
}

function closeStoryViewer(){
  if(state.storyTimer){ clearTimeout(state.storyTimer); state.storyTimer = null; }
  $('story-viewer').classList.remove('visible');
  $('story-viewer-content').innerHTML = '';
  $('story-progress').innerHTML = '';
  $('story-viewer-caption').textContent = '';
  state.currentStoryGroup = null;
  state.currentStoryIndex = 0;
  renderStoriesBar();
}

async function deleteCurrentStory(){
  if(!state.currentStoryGroup || state.currentStoryGroup !== state.uid) return;
  if(!confirm('Удалить эту историю?')) return;
  const stories = state.storyGroups[state.uid];
  const story = stories[state.currentStoryIndex];
  if(!story) return;
  const { db, doc, deleteDoc } = window.fb;
  try {
    await deleteDoc(doc(db, 'stories', story.id));
    toast('История удалена');
    // проверим, есть ли ещё истории у меня
    if(stories.length <= 1){
      closeStoryViewer();
    } else {
      // удалим из локального кэша до прихода onSnapshot
      state.storyGroups[state.uid] = stories.filter(s => s.id !== story.id);
      if(state.currentStoryIndex >= state.storyGroups[state.uid].length){
        state.currentStoryIndex = state.storyGroups[state.uid].length - 1;
      }
      showStory();
    }
  } catch(e){
    console.error(e);
    toast('Не удалось удалить');
  }
}

/* ============================================
   ГРУППЫ И КАНАЛЫ
   ============================================ */
function listenToMyGroups(){
  const { db, collection, onSnapshot, query, where } = window.fb;
  if(state.unsubGroups) state.unsubGroups();
  const q = query(collection(db, 'groups'), where('memberUids', 'array-contains', state.uid));
  state.unsubGroups = onSnapshot(q, snap => {
    const groups = {};
    snap.forEach(d => { groups[d.id] = { ...d.data(), groupId: d.id }; });
    state.groups = groups;
    Object.values(groups).forEach(g => {
      Object.keys(g.members || {}).forEach(uid => {
        if(uid !== state.uid && !state.profiles[uid]) ensureProfile(uid);
      });
    });
    listenToGroupMessages(groups);

    if(state.currentChatType === 'group' && state.currentChat){
      const g = state.groups[state.currentChat];
      if(!g){
        state.currentChat = null;
        state.currentChatType = null;
        $('chat-area').style.display = 'none';
        $('empty-chat').style.display = 'flex';
      } else {
        updateChatHeader(state.currentChat, 'group');
        updateChannelUIPermissions();
      }
    }
    if(currentGroupSettingsId && !state.groups[currentGroupSettingsId]){
      $('group-settings-modal').classList.remove('visible');
      currentGroupSettingsId = null;
    } else if(currentGroupSettingsId){
      renderGroupSettings();
    }

    renderChatList();
  }, err => console.error('groups listener:', err));
}

function listenToGroupMessages(groups){
  const { db, collection, onSnapshot, query, where } = window.fb;
  Object.keys(state.groupUnsubs).forEach(gid => {
    if(!groups[gid]){
      state.groupUnsubs[gid]();
      delete state.groupUnsubs[gid];
      delete state.groupMessages[gid];
    }
  });
  Object.keys(groups).forEach(gid => {
    if(state.groupUnsubs[gid]) return;
    const q = query(collection(db, 'messages'), where('toGroupId', '==', gid));
    state.groupUnsubs[gid] = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => {
        const m = d.data();
        arr.push({
          id: d.id,
          fromUid: m.fromUid,
          toGroupId: gid,
          content: m.content,
          time: m.time && m.time.toDate ? m.time.toDate().getTime() : Date.now(),
          reactions: m.reactions || {},
          replyTo: m.replyTo || null
        });
      });
      arr.sort((a,b) => a.time - b.time);
      const old = state.groupMessages[gid] || [];
      const oldIds = new Set(old.map(m => m.id));
      arr.forEach(m => {
        if(!oldIds.has(m.id) && m.fromUid !== state.uid &&
           !(state.currentChatType === 'group' && state.currentChat === gid)){
          state.unread[gid] = (state.unread[gid] || 0) + 1;
        }
      });
      state.groupMessages[gid] = arr;
      renderChatList();
      if(state.currentChatType === 'group' && state.currentChat === gid){
        renderMessages(); scrollToBottom();
      }
    }, err => console.error('group messages listener:', err));
  });
}

async function createGroup(name, memberUids, asChannel){
  const { db, collection, doc, setDoc, serverTimestamp } = window.fb;
  const groupId = doc(collection(db, 'groups')).id;
  const members = { [state.uid]: { role: 'admin', tag: '' } };
  memberUids.forEach(uid => { members[uid] = { role: 'member', tag: '' }; });
  await setDoc(doc(db, 'groups', groupId), {
    groupId,
    name,
    description: '',
    avatarData: null,
    createdBy: state.uid,
    createdAt: serverTimestamp(),
    memberUids: [state.uid, ...memberUids],
    members,
    isChannel: !!asChannel
  });
  return groupId;
}

function openCreateGroupModal(asChannel){
  const isCh = !!asChannel;
  $('cg-name').value = '';
  $('cg-is-channel').checked = isCh;
  $('cg-title').textContent = isCh ? 'Новый канал' : 'Новая группа';
  $('cg-name').placeholder = isCh ? 'Например: Новости' : 'Например: Команда';
  $('cg-members-label').textContent = isCh ? 'Подписчики' : 'Участники';

  const cont = $('cg-contacts');
  if(!state.users.length){
    cont.innerHTML = '<div class="find-empty">Сначала добавьте контакты через «Найти пользователя»</div>';
  } else {
    cont.innerHTML = state.users.map(u => `
      <label class="cg-contact">
        <input type="checkbox" value="${escapeHtml(u.uid)}">
        <div class="avatar">${escapeHtml(u.avatar)}</div>
        <div class="info">
          <div class="name">${escapeHtml(u.displayName)}</div>
          <div class="nick">@${escapeHtml(u.nickname)}</div>
        </div>
      </label>
    `).join('');
  }
  $('create-group-modal').classList.add('visible');
}

async function handleCreateGroup(){
  const name = $('cg-name').value.trim();
  if(!name){ toast('Введите название'); return; }
  const isCh = $('cg-is-channel').checked;
  const selected = Array.from($('cg-contacts').querySelectorAll('input:checked')).map(i => i.value);
  const btn = $('cg-create');
  btn.disabled = true; btn.textContent = '...';
  try {
    const gid = await createGroup(name, selected, isCh);
    $('create-group-modal').classList.remove('visible');
    toast(isCh ? 'Канал создан ✓' : 'Группа создана ✓');
    setTimeout(() => openChat(gid, 'group'), 500);
  } catch(e){
    console.error(e);
    toast('Не удалось создать');
  } finally {
    btn.disabled = false; btn.textContent = 'Создать';
  }
}

/* ============================================
   НАСТРОЙКИ
   ============================================ */
function openGroupSettings(gid){
  currentGroupSettingsId = gid;
  tempGroupAvatar = state.groups[gid]?.avatarData || null;
  renderGroupSettings();
  $('group-settings-modal').classList.add('visible');
}

function renderGroupSettings(){
  const gid = currentGroupSettingsId;
  const g = state.groups[gid];
  if(!g){ $('group-settings-modal').classList.remove('visible'); return; }

  const isCh = !!g.isChannel;
  const isAdmin = g.members?.[state.uid]?.role === 'admin';

  $('gs-title').textContent = (isCh ? '📢 ' : '') + (g.name || 'Группа');
  $('gs-members-label').textContent = isCh ? 'Подписчики' : 'Участники';
  $('gs-name').value = g.name || '';
  $('gs-desc').value = g.description || '';

  const av = $('gs-avatar');
  if(tempGroupAvatar){
    av.innerHTML = `<img src="${tempGroupAvatar}" alt=""><div class="edit-ov" id="gs-avatar-edit" style="${isAdmin ? '' : 'display:none'}">📷</div>`;
  } else {
    av.innerHTML = `<span>${escapeHtml((g.name || '?')[0].toUpperCase())}</span><div class="edit-ov" id="gs-avatar-edit" style="${isAdmin ? '' : 'display:none'}">📷</div>`;
  }

  $('gs-name').disabled = !isAdmin;
  $('gs-desc').disabled = !isAdmin;
  $('gs-save').style.display = isAdmin ? '' : 'none';
  av.style.cursor = isAdmin ? 'pointer' : 'default';
  $('gs-add-members').style.display = isAdmin ? '' : 'none';
  $('gs-add-members').textContent = isCh ? '➕ Добавить подписчика' : '➕ Добавить участника';

  const memberUids = g.memberUids || [];
  $('gs-members').innerHTML = memberUids.map(uid => {
    const m = g.members?.[uid] || { role: 'member', tag: '' };
    const p = state.profiles[uid] || { displayName: '?', nickname: '?', avatar: '?' };
    const isSelf = uid === state.uid;
    const isAdminRole = m.role === 'admin';
    const showActions = isAdmin && !isSelf;

    const actions = showActions ? `
      <div class="member-actions">
        <button data-action="toggle-role" data-uid="${escapeHtml(uid)}" title="${isAdminRole ? 'Снять админа' : 'Сделать админом'}">${isAdminRole ? '👤' : '👑'}</button>
        <button data-action="edit-tag" data-uid="${escapeHtml(uid)}" title="Тег">🏷️</button>
        <button data-action="remove" data-uid="${escapeHtml(uid)}" title="Удалить">✕</button>
      </div>
    ` : '';

    return `<div class="member-row">
      <div class="avatar">${escapeHtml(p.avatar)}</div>
      <div class="info">
        <div class="name">${escapeHtml(p.displayName)}${isSelf ? ' (вы)' : ''}
          ${isAdminRole ? '<span class="role-badge">админ</span>' : ''}</div>
        <div class="tag">@${escapeHtml(p.nickname)}${m.tag ? ` · <em>${escapeHtml(m.tag)}</em>` : ''}</div>
      </div>
      ${actions}
    </div>`;
  }).join('');

  $('gs-members').querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => handleMemberAction(btn.dataset.action, btn.dataset.uid));
  });
}

async function handleMemberAction(action, uid){
  const gid = currentGroupSettingsId;
  if(!gid) return;
  const g = state.groups[gid];
  if(!g) return;

  if(action === 'remove'){
    if(!confirm('Удалить из ' + (g.isChannel ? 'канала' : 'группы') + '?')) return;
    const newMembers = { ...g.members };
    delete newMembers[uid];
    const newMemberUids = (g.memberUids || []).filter(u => u !== uid);
    const { db, doc, updateDoc } = window.fb;
    try {
      await updateDoc(doc(db, 'groups', gid), { members: newMembers, memberUids: newMemberUids });
      toast('Удалён');
    } catch(e){ console.error(e); toast('Не удалось удалить'); }
  } else if(action === 'toggle-role'){
    const currentRole = g.members?.[uid]?.role || 'member';
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    const { db, doc, updateDoc } = window.fb;
    try {
      await updateDoc(doc(db, 'groups', gid), { [`members.${uid}.role`]: newRole });
      toast(newRole === 'admin' ? 'Назначен админом ✓' : 'Права сняты');
    } catch(e){ console.error(e); toast('Ошибка'); }
  } else if(action === 'edit-tag'){
    const current = g.members?.[uid]?.tag || '';
    const p = state.profiles[uid];
    const tag = prompt(`Тег для ${p ? p.displayName : 'участника'} (пусто = без тега):`, current);
    if(tag === null) return;
    const { db, doc, updateDoc } = window.fb;
    try {
      await updateDoc(doc(db, 'groups', gid), { [`members.${uid}.tag`]: tag.trim() });
      toast('Тег обновлён ✓');
    } catch(e){ console.error(e); toast('Ошибка'); }
  }
}

async function saveGroupSettings(){
  const gid = currentGroupSettingsId;
  if(!gid) return;
  const g = state.groups[gid];
  if(!g) return;
  if(g.members?.[state.uid]?.role !== 'admin'){ toast('Только админ может менять настройки'); return; }

  const name = $('gs-name').value.trim();
  if(!name){ toast('Название не может быть пустым'); return; }
  const description = $('gs-desc').value.trim();

  const updates = { name, description };
  if(tempGroupAvatar !== g.avatarData) updates.avatarData = tempGroupAvatar;

  const { db, doc, updateDoc } = window.fb;
  try {
    await updateDoc(doc(db, 'groups', gid), updates);
    toast('Сохранено ✓');
    $('group-settings-modal').classList.remove('visible');
  } catch(e){
    console.error(e);
    toast('Не удалось сохранить');
  }
}

/* ============================================
   ДОБАВЛЕНИЕ УЧАСТНИКОВ
   ============================================ */
function openAddMembersModal(){
  const gid = currentGroupSettingsId;
  const g = state.groups[gid];
  if(!g) return;
  if(g.members?.[state.uid]?.role !== 'admin'){ toast('Только админ может добавлять'); return; }

  const isCh = !!g.isChannel;
  $('am-title').textContent = isCh ? 'Добавить подписчиков' : 'Добавить участников';
  $('am-label').textContent = isCh ? 'Контакты (не подписаны)' : 'Контакты (не в группе)';

  const memberSet = new Set(g.memberUids || []);
  const candidates = state.users.filter(u => !memberSet.has(u.uid));

  const cont = $('am-contacts');
  if(!candidates.length){
    cont.innerHTML = '<div class="find-empty">Все ваши контакты уже добавлены, либо их нет.</div>';
  } else {
    cont.innerHTML = candidates.map(u => `
      <label class="cg-contact">
        <input type="checkbox" value="${escapeHtml(u.uid)}">
        <div class="avatar">${escapeHtml(u.avatar)}</div>
        <div class="info">
          <div class="name">${escapeHtml(u.displayName)}</div>
          <div class="nick">@${escapeHtml(u.nickname)}</div>
        </div>
      </label>
    `).join('');
  }
  $('add-members-modal').classList.add('visible');
}

async function handleAddMembers(){
  const gid = currentGroupSettingsId;
  const g = state.groups[gid];
  if(!g) return;

  const selected = Array.from($('am-contacts').querySelectorAll('input:checked')).map(i => i.value);
  if(!selected.length){ toast('Выберите хотя бы одного'); return; }

  const btn = $('am-add');
  btn.disabled = true; btn.textContent = '...';

  const newMembers = { ...(g.members || {}) };
  selected.forEach(uid => {
    if(!newMembers[uid]) newMembers[uid] = { role: 'member', tag: '' };
  });
  const newMemberUids = Array.from(new Set([...(g.memberUids || []), ...selected]));

  const { db, doc, updateDoc } = window.fb;
  try {
    await updateDoc(doc(db, 'groups', gid), {
      members: newMembers,
      memberUids: newMemberUids
    });
    toast(`Добавлено: ${selected.length} ✓`);
    $('add-members-modal').classList.remove('visible');
  } catch(e){
    console.error(e);
    toast('Не удалось добавить');
  } finally {
    btn.disabled = false; btn.textContent = 'Добавить';
  }
}

/* ============================================
   СООБЩЕНИЯ
   ============================================ */
function listenToDirectMessages(){
  const { db, collection, onSnapshot, query, where } = window.fb;
  if(state.unsubMessages) state.unsubMessages();

  const groups = { from: [], to: [] };
  const parse = (d) => {
    const m = d.data();
    return {
      id: d.id,
      fromUid: m.fromUid,
      toUid: m.toUid,
      content: m.content,
      time: m.time && m.time.toDate ? m.time.toDate().getTime() : Date.now(),
      reactions: m.reactions || {},
      replyTo: m.replyTo || null
    };
  };

  const rebuild = () => {
    const all = [...groups.from, ...groups.to];
    const seen = new Set();
    const unique = all.filter(m => { if(seen.has(m.id)) return false; seen.add(m.id); return true; });
    unique.sort((a,b) => a.time - b.time);
    const grouped = {};
    unique.forEach(m => {
      const other = m.fromUid === state.uid ? m.toUid : m.fromUid;
      if(!other) return;
      if(!grouped[other]) grouped[other] = [];
      grouped[other].push(m);
    });

    if(state.messagesLoaded){
      Object.keys(grouped).forEach(other => {
        const oldIds = new Set((state.messages[other] || []).map(m => m.id));
        grouped[other].forEach(m => {
          if(!oldIds.has(m.id) && m.fromUid !== state.uid &&
             !(state.currentChatType === 'user' && state.currentChat === other)){
            state.unread[other] = (state.unread[other] || 0) + 1;
          }
        });
      });
    }
    state.messagesLoaded = true;
    state.messages = grouped;
    rebuildUsersList();
    if(state.currentChatType === 'user' && state.currentChat){
      renderMessages(); scrollToBottom();
    }
  };

  const qFrom = query(collection(db, 'messages'), where('fromUid', '==', state.uid));
  const qTo = query(collection(db, 'messages'), where('toUid', '==', state.uid));
  const u1 = onSnapshot(qFrom, s => { groups.from = []; s.forEach(d => groups.from.push(parse(d))); rebuild(); });
  const u2 = onSnapshot(qTo, s => { groups.to = []; s.forEach(d => groups.to.push(parse(d))); rebuild(); });
  state.unsubMessages = () => { u1(); u2(); };
}

/* ============================================
   ЗАПУСК ПОСЛЕ ВХОДА
   ============================================ */
function initAuthListener(){
  if(!window.fb){ setTimeout(initAuthListener, 100); return; }
  const { auth, onAuthStateChanged, db, doc, getDoc, signOut } = window.fb;

  onAuthStateChanged(auth, async (user) => {
    if(!user){
      Object.keys(state.contactListeners).forEach(uid => { try{ state.contactListeners[uid](); }catch(e){} });
      Object.keys(state.groupUnsubs).forEach(gid => { try{ state.groupUnsubs[gid](); }catch(e){} });
      if(state.unsubMe) state.unsubMe();
      if(state.unsubMessages) state.unsubMessages();
      if(state.unsubGroups) state.unsubGroups();
      if(state.unsubStories) state.unsubStories();
      if(state.storyTimer){ clearTimeout(state.storyTimer); state.storyTimer = null; }

      state.uid = null; state.nickname = null; state.currentChat = null; state.currentChatType = null;
      state.messages = {}; state.groupMessages = {}; state.groups = {};
      state.stories = {}; state.storyGroups = {}; state.seenStoryIds = new Set();
      state.users = []; state.unread = {}; state.messagesLoaded = false;
      state.contactUids = []; state.profiles = {}; state.contactListeners = {};
      state.groupUnsubs = {}; state.unsubMe = null; state.unsubMessages = null;
      state.unsubGroups = null; state.unsubStories = null;

      $('app').classList.remove('active', 'chat-open');
      $('story-viewer').classList.remove('visible');
      $('login').style.display = 'flex';
      $('username').value = ''; $('password').value = ''; $('password-confirm').value = '';
      $('stories-bar').innerHTML = '';
      return;
    }

    state.uid = user.uid;

    let profile = null;
    for(let i = 0; i < 5; i++){
      const snap = await getDoc(doc(db, 'users', user.uid));
      if(snap.exists()){ profile = snap.data(); break; }
      await new Promise(r => setTimeout(r, 200));
    }
    if(!profile && state.pendingNickname) profile = { nickname: state.pendingNickname, displayName: state.pendingNickname };
    state.pendingNickname = null;
    if(!profile){ toast('Не удалось загрузить профиль'); await signOut(auth); return; }

    state.nickname = profile.nickname;
    state.profile.displayName = profile.displayName || profile.nickname;
    loadProfile();
    loadSeenStories();
    if(!state.profile.displayName) state.profile.displayName = profile.displayName || profile.nickname;

    state.profiles[state.uid] = {
      uid: state.uid, nickname: state.nickname,
      displayName: state.profile.displayName,
      avatar: (state.profile.displayName || state.nickname || '?')[0].toUpperCase()
    };

    $('login').style.display = 'none';
    $('app').classList.add('active');
    renderMeBar();

    listenToMyContacts();
    listenToDirectMessages();
    listenToMyGroups();
    listenToStories();
    renderChatList();
  });
}

/* ============================================
   ПРОФИЛЬ
   ============================================ */
function renderMeBar(){
  const av = $('me-avatar');
  if(state.profile.avatarData) av.innerHTML = `<img src="${state.profile.avatarData}" alt="">`;
  else av.textContent = (state.profile.displayName || state.nickname || '?')[0].toUpperCase();
  $('me-name').textContent = state.profile.displayName || state.nickname;
}

function openProfileModal(){
  tempAvatar = state.profile.avatarData;
  $('prof-name').value = state.profile.displayName;
  $('prof-bio').value = state.profile.bio || '';
  $('prof-nickname').textContent = state.nickname || '—';
  updateProfAvatar();
  $('profile-modal').classList.add('visible');
}
function updateProfAvatar(){
  const av = $('prof-avatar');
  const initial = (state.profile.displayName || state.nickname || '?')[0].toUpperCase();
  if(tempAvatar) av.innerHTML = `<img src="${tempAvatar}" alt=""><div class="edit-ov">📷</div>`;
  else av.innerHTML = `<span>${initial}</span><div class="edit-ov">📷</div>`;
}

/* ============================================
   ОТПРАВКА
   ============================================ */
async function sendMessage(){
  const input = $('msg-input');
  const text = input.value.trim();
  if(!text || !state.currentChat) return;
  if(!canPostInCurrentChat()){
    toast('Только администраторы могут писать в канале');
    return;
  }
  const { db, collection, addDoc, serverTimestamp } = window.fb;
  const data = {
    fromUid: state.uid,
    content: { type: 'text', text },
    time: serverTimestamp(),
    reactions: {},
    replyTo: state.replyTo || null
  };
  if(state.currentChatType === 'group') data.toGroupId = state.currentChat;
  else data.toUid = state.currentChat;

  try {
    await addDoc(collection(db, 'messages'), data);
    input.value = ''; input.style.height = 'auto'; clearReply();
  } catch(e){ console.error(e); toast('Не удалось отправить: ' + (e.message || e.code)); }
}

async function sendFileContent(content){
  if(!state.currentChat || !window.fb) return;
  if(!canPostInCurrentChat()){
    toast('Только администраторы могут писать в канале');
    return;
  }
  const { db, collection, addDoc, serverTimestamp } = window.fb;
  const data = {
    fromUid: state.uid, content,
    time: serverTimestamp(), reactions: {}, replyTo: state.replyTo || null
  };
  if(state.currentChatType === 'group') data.toGroupId = state.currentChat;
  else data.toUid = state.currentChat;
  try {
    await addDoc(collection(db, 'messages'), data);
    clearReply();
  } catch(e){ console.error(e); toast('Не удалось отправить файл'); }
}

/* ============================================
   СПИСОК ЧАТОВ
   ============================================ */
function getCurrentMessages(){
  if(state.currentChatType === 'group') return state.groupMessages[state.currentChat] || [];
  return state.messages[state.currentChat] || [];
}

function renderChatList(){
  const search = ($('search').value || '').toLowerCase().trim();
  const items = [];

  state.users.forEach(u => {
    const msgs = state.messages[u.uid] || [];
    const last = msgs[msgs.length - 1];
    items.push({
      type: 'user', id: u.uid,
      name: u.displayName || u.nickname,
      avatarLetter: u.avatar, avatarData: null,
      nick: u.nickname,
      last, lastTime: last ? last.time : 0,
      unread: state.unread[u.uid] || 0
    });
  });

  Object.values(state.groups).forEach(g => {
    const msgs = state.groupMessages[g.groupId] || [];
    const last = msgs[msgs.length - 1];
    items.push({
      type: 'group', id: g.groupId,
      name: g.name || (g.isChannel ? 'Канал' : 'Группа'),
      avatarLetter: (g.name || '?')[0].toUpperCase(),
      avatarData: g.avatarData || null,
      nick: null,
      last, lastTime: last ? last.time : 0,
      unread: state.unread[g.groupId] || 0,
      isChannel: !!g.isChannel
    });
  });

  const filtered = items.filter(it => {
    const n = it.name.toLowerCase();
    const nn = (it.nick || '').toLowerCase();
    return n.includes(search) || nn.includes(search);
  });

  const c = $('chat-list');
  if(!filtered.length){
    c.innerHTML = state.users.length === 0 && Object.keys(state.groups).length === 0
      ? '<div class="empty-list">Пока никого нет.<br><br>Нажмите <b>➕</b> вверху — найти пользователя, создать группу или канал.</div>'
      : '<div class="empty-list">Ничего не найдено</div>';
    return;
  }

  filtered.sort((a,b) => {
    if(a.lastTime || b.lastTime) return b.lastTime - a.lastTime;
    return a.name.localeCompare(b.name);
  });

  c.innerHTML = filtered.map(it => {
    let lastText = '';
    if(it.last){
      const preview = it.last.content.type === 'text'
        ? it.last.content.text
        : it.last.content.type === 'image' ? '📷 Фото'
        : it.last.content.type === 'video' ? '🎬 Видео'
        : it.last.content.type === 'audio' ? '🎵 Музыка'
        : '📎 Файл';
      const showSenderName = it.type === 'group' && !it.isChannel;
      const prefix = it.last.fromUid === state.uid ? 'Вы: '
        : showSenderName ? (getUserDisplayName(it.last.fromUid) + ': ') : '';
      lastText = prefix + escapeHtml(preview.slice(0, 30));
    }
    const lastTime = it.last ? formatTime(it.last.time) : '';
    const active = (state.currentChat === it.id && state.currentChatType === it.type) ? 'active' : '';
    const avatarHtml = it.avatarData
      ? `<div class="avatar"><img src="${it.avatarData}" alt=""></div>`
      : `<div class="avatar">${escapeHtml(it.avatarLetter)}</div>`;
    const typeIcon = it.type === 'group' ? (it.isChannel ? '📢 ' : '👥 ') : '';

    return `<div class="chat-item ${active}" data-id="${escapeHtml(it.id)}" data-type="${it.type}">
      ${avatarHtml}
      <div class="info">
        <div class="name">${typeIcon}${escapeHtml(it.name)}</div>
        <div class="last">${lastText || '<span style="opacity:.5">Нет сообщений</span>'}</div>
      </div>
      <div class="meta">
        <div>${lastTime}</div>
        ${it.unread ? `<div class="badge">${it.unread}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  c.querySelectorAll('.chat-item').forEach(el => {
    el.addEventListener('click', () => openChat(el.dataset.id, el.dataset.type));
  });
}

/* ============================================
   ОТКРЫТИЕ ЧАТА
   ============================================ */
function updateChatHeader(id, type){
  if(type === 'group'){
    const g = state.groups[id];
    if(!g) return;
    $('chat-name').textContent = g.name || '?';
    if(g.avatarData) $('chat-avatar').innerHTML = `<img src="${g.avatarData}" alt="">`;
    else $('chat-avatar').textContent = (g.name || '?')[0].toUpperCase();

    const cnt = (g.memberUids || []).length;
    let countText;
    if(g.isChannel){
      countText = `${cnt} ${plural(cnt, 'подписчик', 'подписчика', 'подписчиков')}`;
      $('chat-status').textContent = '📢 канал · ' + countText;
    } else {
      countText = `${cnt} ${plural(cnt, 'участник', 'участника', 'участников')}`;
      $('chat-status').textContent = countText;
    }
    $('group-settings-btn').style.display = '';
  } else {
    const u = state.profiles[id];
    $('chat-name').textContent = u ? u.displayName : '?';
    $('chat-avatar').textContent = u ? u.avatar : '?';
    $('chat-status').textContent = 'в чате';
    $('group-settings-btn').style.display = 'none';
  }
}

function updateChannelUIPermissions(){
  const canPost = canPostInCurrentChat();
  $('input-panel').style.display = canPost ? '' : 'none';
  $('channel-notice').style.display = canPost ? 'none' : '';
  $('reply-bar').style.display = 'none';
}

function openChat(id, type){
  state.currentChat = id;
  state.currentChatType = type;
  state.unread[id] = 0;

  $('empty-chat').style.display = 'none';
  $('chat-area').style.display = 'flex';

  updateChatHeader(id, type);
  updateChannelUIPermissions();

  clearReply();
  renderMessages();
  renderChatList();
  if(canPostInCurrentChat()) $('msg-input').focus();
  $('app').classList.add('chat-open');
}

/* ============================================
   РЕНДЕР СООБЩЕНИЙ
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
  const msgs = getCurrentMessages();
  if(!msgs.length){
    c.innerHTML = '<div style="text-align:center;color:#6c7883;padding:40px;font-size:13px">Начните диалог 👋</div>';
    return;
  }

  const inChannel = state.currentChatType === 'group' && isChannel(state.currentChat);

  c.innerHTML = msgs.map(m => {
    const isMe = m.fromUid === state.uid;
    const ct = m.content;
    let body = '';

    if(ct.type === 'text') body = `<div class="text">${escapeHtml(ct.text)}</div>`;
    else if(ct.type === 'image') body = `<div class="media" data-full="${ct.dataUrl}"><img src="${ct.dataUrl}" alt=""></div>`;
    else if(ct.type === 'video') body = `<div class="media"><video src="${ct.dataUrl}" controls></video></div>`;
    else if(ct.type === 'audio') body = `<div class="audio-player"><audio src="${ct.dataUrl}" controls></audio></div>`;
    else if(ct.type === 'file'){
      body = `<div class="file-attach">
        <div class="ficon">${getFileIcon(ct.name)}</div>
        <div class="finfo">
          <div class="fname">${escapeHtml(ct.name)}</div>
          <div class="fsize">${formatSize(ct.size)}</div>
        </div>
        <a href="${ct.dataUrl}" download="${escapeHtml(ct.name)}" title="Скачать">⬇</a>
      </div>`;
    }

    let senderHtml = '';
    if(!isMe && state.currentChatType === 'group' && !inChannel){
      const g = state.groups[state.currentChat];
      const tag = g?.members?.[m.fromUid]?.tag;
      const name = getUserDisplayName(m.fromUid);
      senderHtml = `<div class="sender-name">${escapeHtml(name)}${tag ? ` <span class="sender-tag">${escapeHtml(tag)}</span>` : ''}</div>`;
    }

    let replyHtml = '';
    if(m.replyTo){
      const prev = msgs.find(x => x.id === m.replyTo);
      if(prev){
        replyHtml = `<div class="reply-quote">
          <div class="rname">${escapeHtml(getUserDisplayName(prev.fromUid))}</div>
          <div class="rtext">${escapeHtml(getReplyPreview(prev))}</div>
        </div>`;
      }
    }

    let reactionsHtml = '';
    const rk = Object.keys(m.reactions || {});
    if(rk.length){
      reactionsHtml = '<div class="reactions">' + rk.map(emoji => {
        const users = m.reactions[emoji];
        const mine = users.includes(state.uid) ? 'mine' : '';
        return `<span class="react ${mine}" data-id="${m.id}" data-emoji="${emoji}">${emoji} ${users.length}</span>`;
      }).join('') + '</div>';
    }

    return `<div class="msg-row ${isMe ? 'me' : 'other'}" data-id="${m.id}">
      <div class="bubble">
        ${senderHtml}
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

  c.querySelectorAll('.media[data-full]').forEach(el => el.addEventListener('click', () => openViewer(el.dataset.full)));
  c.querySelectorAll('.tool-reply').forEach(el => el.addEventListener('click', () => setReply(el.dataset.id)));
  c.querySelectorAll('.tool-del').forEach(el => el.addEventListener('click', () => deleteMessage(el.dataset.id)));
  c.querySelectorAll('.tool-react').forEach(el => el.addEventListener('click', e => showReactionPicker(el.dataset.id, e.clientX, e.clientY)));
  c.querySelectorAll('.react').forEach(el => el.addEventListener('click', () => toggleReaction(el.dataset.id, el.dataset.emoji)));

  scrollToBottom();
}

/* ============================================
   REPLY
   ============================================ */
function setReply(id){
  const msgs = getCurrentMessages();
  const m = msgs.find(x => x.id === id);
  if(!m) return;
  state.replyTo = id;
  $('reply-name').textContent = m.fromUid === state.uid ? 'Вы' : getUserDisplayName(m.fromUid);
  $('reply-text').textContent = getReplyPreview(m);
  $('reply-bar').classList.add('visible');
  if(canPostInCurrentChat()) $('msg-input').focus();
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
  const msgs = getCurrentMessages();
  const m = msgs.find(x => x.id === id);
  if(!m) return;
  const reactions = JSON.parse(JSON.stringify(m.reactions || {}));
  if(!reactions[emoji]) reactions[emoji] = [];
  const arr = reactions[emoji];
  const idx = arr.indexOf(state.uid);
  if(idx === -1) arr.push(state.uid); else arr.splice(idx, 1);
  if(!arr.length) delete reactions[emoji];

  const { db, doc, updateDoc } = window.fb;
  try { await updateDoc(doc(db, 'messages', id), { reactions }); }
  catch(e){ console.error(e); toast('Не удалось поставить реакцию'); }
}

/* ============================================
   УДАЛЕНИЕ
   ============================================ */
async function deleteMessage(id){
  if(!confirm('Удалить сообщение?')) return;
  const { db, doc, deleteDoc } = window.fb;
  try { await deleteDoc(doc(db, 'messages', id)); }
  catch(e){ console.error(e); toast('Не удалось удалить'); }
}

/* ============================================
   ВЛОЖЕНИЯ
   ============================================ */
function openFilePicker(type){
  if(!canPostInCurrentChat()){ toast('Только администраторы могут писать в канале'); return; }
  state.pendingFileType = type;
  const fi = $('file-input');
  fi.accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : type === 'audio' ? 'audio/*' : '';
  fi.value = '';
  fi.click();
}

async function handleFileSelected(file){
  if(!file) return;
  const type = state.pendingFileType;
  if(file.size > 500 * 1024){ toast('Файл слишком большой (макс 500 КБ)'); return; }
  try {
    const dataUrl = await fileToBase64(file);
    const ct = { type, dataUrl };
    if(type === 'file' || type === 'audio') ct.name = file.name;
    if(type === 'file') ct.size = file.size;
    await sendFileContent(ct);
  } catch(e){ console.error(e); toast('Ошибка чтения файла'); }
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
   ОБРАБОТЧИКИ
   ============================================ */
$('tab-login').addEventListener('click', () => setAuthMode('login'));
$('tab-register').addEventListener('click', () => setAuthMode('register'));
$('auth-submit').addEventListener('click', () => authMode === 'login' ? handleLogin() : handleRegister());
$('username').addEventListener('keydown', e => { if(e.key === 'Enter') $('password').focus(); });
$('password').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); authMode === 'login' ? handleLogin() : $('password-confirm').focus(); } });
$('password-confirm').addEventListener('keydown', e => { if(e.key === 'Enter'){ e.preventDefault(); handleRegister(); } });

$('add-btn').addEventListener('click', e => { e.stopPropagation(); $('add-menu').classList.toggle('visible'); });
$('menu-find').addEventListener('click', () => { $('add-menu').classList.remove('visible'); openFindModal(); });
$('menu-new-group').addEventListener('click', () => { $('add-menu').classList.remove('visible'); openCreateGroupModal(false); });
$('menu-new-channel').addEventListener('click', () => { $('add-menu').classList.remove('visible'); openCreateGroupModal(true); });

$('find-cancel').addEventListener('click', () => $('find-modal').classList.remove('visible'));
$('find-search').addEventListener('click', doFind);
$('find-input').addEventListener('keydown', e => { if(e.key === 'Enter') doFind(); });

$('cg-cancel').addEventListener('click', () => $('create-group-modal').classList.remove('visible'));
$('cg-create').addEventListener('click', handleCreateGroup);
$('cg-is-channel').addEventListener('change', () => {
  const isCh = $('cg-is-channel').checked;
  $('cg-title').textContent = isCh ? 'Новый канал' : 'Новая группа';
  $('cg-name').placeholder = isCh ? 'Например: Новости' : 'Например: Команда';
  $('cg-members-label').textContent = isCh ? 'Подписчики' : 'Участники';
});

$('group-settings-btn').addEventListener('click', () => { if(state.currentChatType === 'group') openGroupSettings(state.currentChat); });
$('gs-close').addEventListener('click', () => { $('group-settings-modal').classList.remove('visible'); currentGroupSettingsId = null; });
$('gs-save').addEventListener('click', saveGroupSettings);
$('gs-avatar').addEventListener('click', () => {
  const g = state.groups[currentGroupSettingsId];
  if(!g) return;
  if(g.members?.[state.uid]?.role !== 'admin') return;
  $('group-avatar-input').click();
});
$('group-avatar-input').addEventListener('change', async e => {
  const f = e.target.files[0]; if(!f) return;
  if(f.size > 500 * 1024){ toast('Аватар группы — макс 500 КБ'); return; }
  tempGroupAvatar = await fileToBase64(f);
  renderGroupSettings();
});

$('gs-add-members').addEventListener('click', openAddMembersModal);
$('am-cancel').addEventListener('click', () => $('add-members-modal').classList.remove('visible'));
$('am-add').addEventListener('click', handleAddMembers);

$('me-bar').addEventListener('click', openProfileModal);
$('prof-avatar').addEventListener('click', () => $('avatar-input').click());
$('avatar-input').addEventListener('change', async e => {
  const f = e.target.files[0]; if(!f) return;
  if(f.size > 2*1024*1024){ toast('Аватар слишком большой (макс 2 МБ)'); return; }
  tempAvatar = await fileToBase64(f);
  updateProfAvatar();
});
$('prof-cancel').addEventListener('click', () => { $('profile-modal').classList.remove('visible'); $('avatar-input').value = ''; });
$('prof-save').addEventListener('click', async () => {
  const n = $('prof-name').value.trim();
  if(!n){ toast('Имя не может быть пустым'); return; }
  state.profile.displayName = n;
  state.profile.bio = $('prof-bio').value.trim();
  state.profile.avatarData = tempAvatar;
  renderMeBar(); saveProfile();
  $('profile-modal').classList.remove('visible');
  toast('Профиль сохранён ✓');
  if(window.fb && state.uid){
    const { db, doc, setDoc } = window.fb;
    try { await setDoc(doc(db, 'users', state.uid), { displayName: n }, { merge: true }); }
    catch(e){ console.error(e); }
  }
});

$('logout-btn').addEventListener('click', async () => {
  if(!confirm('Выйти из аккаунта?')) return;
  $('profile-modal').classList.remove('visible');
  if(window.fb){ try{ await window.fb.signOut(window.fb.auth); }catch(e){} }
});

// STORIES — загрузка файла
$('story-file-input').addEventListener('change', e => handleStoryFileSelected(e.target.files[0]));
$('story-create-cancel').addEventListener('click', () => {
  state.pendingStoryMedia = null;
  $('story-create-modal').classList.remove('visible');
});
$('story-create-publish').addEventListener('click', publishStory);

// STORIES — viewer
$('story-viewer-close').addEventListener('click', closeStoryViewer);
$('story-nav-prev').addEventListener('click', prevStory);
$('story-nav-next').addEventListener('click', nextStory);
$('story-viewer-delete').addEventListener('click', deleteCurrentStory);

// Клик на пустое место в viewer — закрыть (только вне контента)
$('story-viewer').addEventListener('click', e => {
  if(e.target.id === 'story-viewer') closeStoryViewer();
});

// Отправка
$('send-btn').addEventListener('click', sendMessage);
$('msg-input').addEventListener('keydown', e => { if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } });
$('msg-input').addEventListener('input', function(){ this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 120) + 'px'; });
$('reply-close').addEventListener('click', clearReply);

$('attach-btn').addEventListener('click', () => $('attach-menu').classList.toggle('visible'));
$('attach-menu').querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => { openFilePicker(b.dataset.type); $('attach-menu').classList.remove('visible'); });
});
$('file-input').addEventListener('change', e => handleFileSelected(e.target.files[0]));

$('reaction-picker').querySelectorAll('button').forEach(b => {
  b.addEventListener('click', () => {
    if(state.reactionTarget) toggleReaction(state.reactionTarget, b.dataset.emoji);
    $('reaction-picker').classList.remove('visible');
    state.reactionTarget = null;
  });
});

document.addEventListener('click', e => {
  if(!e.target.closest('#reaction-picker') && !e.target.closest('.tool-react')) $('reaction-picker').classList.remove('visible');
  if(!e.target.closest('#attach-menu') && !e.target.closest('#attach-btn')) $('attach-menu').classList.remove('visible');
  if(!e.target.closest('#add-menu') && !e.target.closest('#add-btn')) $('add-menu').classList.remove('visible');
});

$('viewer-close').addEventListener('click', closeViewer);
$('viewer').addEventListener('click', e => { if(e.target.id === 'viewer') closeViewer(); });

$('search').addEventListener('input', renderChatList);

$('back-btn').addEventListener('click', () => $('app').classList.remove('chat-open'));
if(window.innerWidth <= 768) $('back-btn').style.display = 'block';

initAuthListener();
setAuthMode('login');
console.log('✅ Мессенджер с историями загружен');