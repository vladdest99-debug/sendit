//* ============ i18n ============ */
const TRANSLATIONS = {
ru:{
welcome:'Добро пожаловать',createAccount:'Создать аккаунт',subtitle:'Войдите или создайте аккаунт',
subtitleRegister:'Создайте новый аккаунт',login:'Вход',register:'Регистрация',nickname:'Никнейм',
password:'Пароль (мин. 6 символов)',passwordConfirm:'Повторите пароль',signIn:'Войти',signUp:'Зарегистрироваться',
authHint:'Никнейм: буквы, цифры, _. Пароль: минимум 6 символов.',searchChats:'Поиск в чатах',
findUser:'Найти пользователя',newGroup:'Создать группу',newChannel:'Создать канал',online:'в сети',
selectChat:'Выберите чат, чтобы начать общение',writeMessage:'Написать сообщение...',
channelOnlyAdmins:'Только администраторы могут писать в канале',myStory:'Моя история',
settings:'Настройки',myProfile:'Мой профиль',language:'Язык',logout:'Выйти из аккаунта',
theme:'Тема',themeDark:'Тёмная',themeLight:'Светлая',themeChanged:'Тема изменена',
close:'Закрыть',cancel:'Отмена',save:'Сохранить',loginLabel:'Логин:',displayName:'Отображаемое имя',
aboutMe:'О себе',aboutPlaceholder:'Напишите о себе...',musicLabel:'Музыка',
musicNotSelected:'Файл не выбран',musicUpload:'Загрузить музыку',myChannelLabel:'Мой канал',
channelLabel:'Канал',noChannel:'— Не выбран —',errNotSubscribed:'Вы не подписаны на этот канал',
profileTitle:'Профиль',messageUser:'Перейти в чат',findUserTitle:'Найти пользователя',
loginFieldLabel:'Логин',find:'Найти',findInputPlaceholder:'Введите логин',
newGroupTitle:'Новая группа',newChannelTitle:'Новый канал',nameLabel:'Название',
namePlaceholderGroup:'Например: Команда',namePlaceholderChannel:'Например: Новости',
membersLabel:'Участники',subscribersLabel:'Подписчики',
createAsChannel:'Создать как канал (писать смогут только администраторы)',create:'Создать',
description:'Описание',descriptionPlaceholder:'О чём...',addMember:'Добавить участника',
addSubscriber:'Добавить подписчика',addMembersTitle:'Добавить участников',
addSubscribersTitle:'Добавить подписчиков',contactsNotInGroup:'Контакты (не в группе)',
contactsNotSubscribed:'Контакты (не подписаны)',add:'Добавить',newStory:'Новая история',
storyCaptionLabel:'Подпись (необязательно)',storyCaptionPlaceholder:'Что происходит?',
publish:'Опубликовать',storyPreviewEmpty:'Выберите фото или видео',
emptyChatList:'Пока никого нет.<br><br>Нажмите <b>➕</b> вверху — найти пользователя, создать группу или канал.',
nothingFound:'Ничего не найдено',noMessages:'Нет сообщений',youPrefix:'Вы: ',
startDialog:'Начните диалог 👋',inChat:'в чате',channelStatusPrefix:'📢 канал · ',
errEnterNickname:'Введите никнейм',errEnterPassword:'Введите пароль',
errInvalidCredentials:'Неверный никнейм или пароль',errNoInternet:'Нет интернета',
errServerConnecting:'Подключение к серверу, подождите',errNicknameTaken:'Этот никнейм уже занят',
errWeakPassword:'Слишком простой пароль',errPasswordMin:'Пароль минимум 6 символов',
errPasswordsDontMatch:'Пароли не совпадают',errNicknameShort:'Никнейм слишком короткий (мин. 2 символа)',
errNicknameLong:'Никнейм слишком длинный (макс. 20)',errNicknameChars:'Только буквы, цифры и _',
errNameEmpty:'Имя не может быть пустым',errFileTooBig:'Файл слишком большой',
errFileRead:'Ошибка чтения файла',errSendFailed:'Не удалось отправить',
errSendFileFailed:'Не удалось отправить файл',errAddContact:'Не удалось добавить контакт',
errSearch:'Ошибка поиска',errCreateGroup:'Не удалось создать',errSaveGroup:'Не удалось сохранить',
errAddMembers:'Не удалось добавить',errDeleteMsg:'Не удалось удалить',
errReaction:'Не удалось поставить реакцию',errPublishStory:'Не удалось опубликовать',
errDeleteStory:'Не удалось удалить',errProfileLoad:'Не удалось загрузить профиль',
okContactAdded:'Контакт добавлен',okGroupCreated:'Группа создана',okChannelCreated:'Канал создан',
okProfileSaved:'Профиль сохранён',okStoryPublished:'История опубликована',
okStoryDeleted:'История удалена',okSaved:'Сохранено',okMusicUploaded:'Музыка загружена',
okMusicRemoved:'Музыка удалена',errMusicRead:'Ошибка чтения музыки',
errProfileSync:'Профиль сохранён, но данные не синхронизированы',
errBanned:'Аккаунт заблокирован администратором',musicFileLabel:'Аудиофайл',
confirmLogout:'Выйти из аккаунта?',confirmDeleteMsg:'Удалить сообщение?',
confirmDeleteStory:'Удалить эту историю?',confirmRemoveMember:'Удалить из группы?',
confirmRemoveFromChannel:'Удалить из канала?',tagPrompt:'Тег для {name} (пусто = без тега):',
roleAdminAssigned:'Назначен админом',roleRemoved:'Права сняты',memberRemoved:'Удалён из группы',
tagUpdated:'Тег обновлён',addedCount:'Добавлено: {n}',onlyAdminCanEdit:'Только админ может менять настройки',
onlyAdminCanAdd:'Только админ может добавлять',selectAtLeastOne:'Выберите хотя бы одного',
contactsAlreadyAdded:'Все ваши контакты уже добавлены, либо их нет.',
contactsFirst:'Сначала добавьте контакты через «Найти пользователя»',
userNotFound:'Пользователь не найден',itIsYourLogin:'Это ваш логин',
alreadyInContacts:'уже в контактах',sub1:'подписчик',sub2:'подписчика',sub5:'подписчиков',
mem1:'участник',mem2:'участника',mem5:'участников',timeJustNow:'только что',
timeMinAgo:'{n} мин назад',timeHourAgo:'{n} ч назад',today:'Сегодня',yesterday:'Вчера',
photo:'📷 Фото',video:'🎬 Видео',music:'🎵 Музыка',file:'📎 Файл',
photoMenu:'Фото',videoMenu:'Видео',musicMenu:'Музыка',fileMenu:'Файл',langChanged:'Язык изменён',
adminBanned:'Пользователь забанен',adminUnbanned:'Разбанен',adminError:'Ошибка',
adminConfirmBan:'Забанить @{nick}?',adminConfirmClearMsgs:'Удалить ВСЕ сообщения пользователя @{nick}?',
adminMsgsDeleted:'Удалено сообщений: {n}',adminDeleteMsgConfirm:'Удалить сообщение?',
adminNoUsers:'Пользователей нет',adminNoMsgs:'Сообщений нет',adminLoadError:'Ошибка загрузки',
adminLoading:'Загрузка...',adminBannedLabel:'забанен',adminBanBtn:'Забанить',adminUnbanBtn:'Разбанить',
noS3Big:'Файл больше 700 КБ требует S3. Настройте Cloud.ru.',storyReactionErr:'Не удалось поставить реакцию',
contactsTitle:'Контакты',contactsInDev:'Раздел в разработке',
contactsInDevHint:'Список контактов появится здесь совсем скоро. А пока вы можете найти пользователя по его логину.',
findByLoginBtn:'Найти пользователя по логину',
chatWallpaper:'Обои чата',wallpaperDefault:'Стандартные',wallpaperCustom:'Своё изображение',
wallpaperUpload:'Загрузить',errWallpaperBig:'Изображение слишком большое',
okWallpaperSaved:'Обои сохранены',wpPurple:'Фиолетовые',wpPink:'Розовые',wpBlue:'Голубые',
wpGreen:'Зелёные',wpSunset:'Закат',wpOcean:'Океан',wpMint:'Мята',
voice:'🎤 Голосовое',voiceMsg:'🎤 Голосовое сообщение',voiceRecording:'Запись',
errMicAccess:'Нет доступа к микрофону',errVoiceTooShort:'Слишком короткая запись',
errVoiceUnsupported:'Запись недоступна. Откройте сайт по HTTPS или в поддерживаемом браузере.',recordingCancel:'Отменить запись',
errMicPerm:'Разрешите доступ к микрофону в настройках сайта',
errMicNotFound:'Микрофон не найден',errMicBusy:'Микрофон занят другим приложением',
lastSeenJustNow:'был(а) в сети только что',
lastSeenMinAgo:'был(а) в сети {n} мин назад',
lastSeenHourAgo:'был(а) в сети {n} ч назад',
lastSeenToday:'был(а) в сети в {time}',
lastSeenYesterday:'был(а) в сети вчера в {time}',
lastSeenDate:'был(а) в сети {date}'
},
en:{
welcome:'Welcome',createAccount:'Create account',subtitle:'Sign in or create an account',
subtitleRegister:'Create a new account',login:'Sign in',register:'Sign up',nickname:'Nickname',
password:'Password (min. 6 chars)',passwordConfirm:'Repeat password',signIn:'Sign in',signUp:'Sign up',
authHint:'Nickname: letters, digits, _. Password: at least 6 characters.',searchChats:'Search chats',
findUser:'Find user',newGroup:'Create group',newChannel:'Create channel',online:'online',
selectChat:'Select a chat to start messaging',writeMessage:'Write a message...',
channelOnlyAdmins:'Only admins can post in the channel',myStory:'My story',settings:'Settings',
myProfile:'My profile',language:'Language',logout:'Sign out',
theme:'Theme',themeDark:'Dark',themeLight:'Light',themeChanged:'Theme changed',
close:'Close',cancel:'Cancel',save:'Save',
loginLabel:'Login:',displayName:'Display name',aboutMe:'About me',aboutPlaceholder:'Tell about yourself...',
musicLabel:'Music',musicNotSelected:'No file selected',musicUpload:'Upload music',
myChannelLabel:'My channel',channelLabel:'Channel',noChannel:'— None —',
errNotSubscribed:'You are not subscribed to this channel',profileTitle:'Profile',
messageUser:'Go to chat',findUserTitle:'Find user',loginFieldLabel:'Login',find:'Find',
findInputPlaceholder:'Enter login',newGroupTitle:'New group',newChannelTitle:'New channel',
nameLabel:'Name',namePlaceholderGroup:'E.g.: Team',namePlaceholderChannel:'E.g.: News',
membersLabel:'Members',subscribersLabel:'Subscribers',
createAsChannel:'Create as channel (only admins can post)',create:'Create',
description:'Description',descriptionPlaceholder:'About...',addMember:'Add member',
addSubscriber:'Add subscriber',addMembersTitle:'Add members',addSubscribersTitle:'Add subscribers',
contactsNotInGroup:'Contacts (not in group)',contactsNotSubscribed:'Contacts (not subscribed)',
add:'Add',newStory:'New story',storyCaptionLabel:'Caption (optional)',
storyCaptionPlaceholder:'What is happening?',publish:'Publish',
storyPreviewEmpty:'Choose photo or video',
emptyChatList:'Nobody here yet.<br><br>Tap <b>➕</b> above — find a user, create a group or channel.',
nothingFound:'Nothing found',noMessages:'No messages',youPrefix:'You: ',
startDialog:'Start the dialog 👋',inChat:'in chat',channelStatusPrefix:'📢 channel · ',
errEnterNickname:'Enter a nickname',errEnterPassword:'Enter a password',
errInvalidCredentials:'Invalid nickname or password',errNoInternet:'No internet',
errServerConnecting:'Connecting to server, please wait',errNicknameTaken:'This nickname is already taken',
errWeakPassword:'Password is too weak',errPasswordMin:'Password must be at least 6 characters',
errPasswordsDontMatch:'Passwords do not match',errNicknameShort:'Nickname too short (min. 2 chars)',
errNicknameLong:'Nickname too long (max. 20)',errNicknameChars:'Letters, digits and _ only',
errNameEmpty:'Name cannot be empty',errFileTooBig:'File too large',errFileRead:'Failed to read file',
errSendFailed:'Failed to send',errSendFileFailed:'Failed to send file',
errAddContact:'Failed to add contact',errSearch:'Search error',errCreateGroup:'Failed to create',
errSaveGroup:'Failed to save',errAddMembers:'Failed to add',errDeleteMsg:'Failed to delete',
errReaction:'Failed to react',errPublishStory:'Failed to publish',errDeleteStory:'Failed to delete',
errProfileLoad:'Failed to load profile',okContactAdded:'Contact added',okGroupCreated:'Group created',
okChannelCreated:'Channel created',okProfileSaved:'Profile saved',okStoryPublished:'Story published',
okStoryDeleted:'Story deleted',okSaved:'Saved',okMusicUploaded:'Music uploaded',
okMusicRemoved:'Music removed',errMusicRead:'Failed to read music',
errProfileSync:'Profile saved, but data not synced',errBanned:'Account blocked by administrator',
musicFileLabel:'Audio file',confirmLogout:'Sign out?',confirmDeleteMsg:'Delete message?',
confirmDeleteStory:'Delete this story?',confirmRemoveMember:'Remove from group?',
confirmRemoveFromChannel:'Remove from channel?',tagPrompt:'Tag for {name} (empty = no tag):',
roleAdminAssigned:'Promoted to admin',roleRemoved:'Rights removed',memberRemoved:'Removed from group',
tagUpdated:'Tag updated',addedCount:'Added: {n}',onlyAdminCanEdit:'Only admin can change settings',
onlyAdminCanAdd:'Only admin can add',selectAtLeastOne:'Select at least one',
contactsAlreadyAdded:'All your contacts already added, or none exist.',
contactsFirst:'First add contacts via "Find user"',userNotFound:'User not found',
itIsYourLogin:'This is your login',alreadyInContacts:'already in contacts',
sub1:'subscriber',sub2:'subscribers',sub5:'subscribers',mem1:'member',mem2:'members',mem5:'members',
timeJustNow:'just now',timeMinAgo:'{n} min ago',timeHourAgo:'{n} h ago',today:'Today',yesterday:'Yesterday',
photo:'📷 Photo',video:'🎬 Video',music:'🎵 Music',file:'📎 File',
photoMenu:'Photo',videoMenu:'Video',musicMenu:'Music',fileMenu:'File',langChanged:'Language changed',
adminBanned:'User banned',adminUnbanned:'Unbanned',adminError:'Error',adminConfirmBan:'Ban @{nick}?',
adminConfirmClearMsgs:'Delete ALL messages of @{nick}?',adminMsgsDeleted:'Deleted messages: {n}',
adminDeleteMsgConfirm:'Delete message?',adminNoUsers:'No users',adminNoMsgs:'No messages',
adminLoadError:'Load error',adminLoading:'Loading...',adminBannedLabel:'banned',
adminBanBtn:'Ban',adminUnbanBtn:'Unban',noS3Big:'File > 700 KB requires S3. Configure Cloud.ru.',
storyReactionErr:'Failed to react',
contactsTitle:'Contacts',contactsInDev:'Section in development',
contactsInDevHint:'The contact list will appear here very soon. For now you can find a user by their login.',
findByLoginBtn:'Find user by login',
chatWallpaper:'Chat wallpaper',wallpaperDefault:'Default',wallpaperCustom:'Custom image',
wallpaperUpload:'Upload',errWallpaperBig:'Image too large',
okWallpaperSaved:'Wallpaper saved',wpPurple:'Purple',wpPink:'Pink',wpBlue:'Blue',
wpGreen:'Green',wpSunset:'Sunset',wpOcean:'Ocean',wpMint:'Mint',
voice:'🎤 Voice',voiceMsg:'🎤 Voice message',voiceRecording:'Recording',
errMicAccess:'No microphone access',errVoiceTooShort:'Recording too short',
errVoiceUnsupported:'Recording unavailable. Open the site via HTTPS or a supported browser.',recordingCancel:'Cancel recording',
errMicPerm:'Allow microphone access in site settings',
errMicNotFound:'Microphone not found',errMicBusy:'Microphone is busy in another app',
lastSeenJustNow:'last seen just now',
lastSeenMinAgo:'last seen {n} min ago',
lastSeenHourAgo:'last seen {n} h ago',
lastSeenToday:'last seen today at {time}',
lastSeenYesterday:'last seen yesterday at {time}',
lastSeenDate:'last seen {date}'
}};
let currentLang='ru';
let currentTheme='dark';
function t(k){const d=TRANSLATIONS[currentLang]||TRANSLATIONS.ru;return d[k]||TRANSLATIONS.ru[k]||k;}
function tpl(k,p){let s=t(k);Object.keys(p||{}).forEach(x=>{s=s.replace(new RegExp('\\{'+x+'\\}','g'),p[x]);});return s;}
function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.getAttribute('data-i18n'));});
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{el.placeholder=t(el.getAttribute('data-i18n-placeholder'));});
  document.documentElement.lang=currentLang;
  const l=$('settings-language-current');if(l)l.textContent=currentLang==='ru'?'Русский':'English';
  applyThemeLabels();
  updateWallpaperLabel();
}
function loadLang(){try{const s=localStorage.getItem('tg-lang');if(s==='ru'||s==='en')currentLang=s;}catch(e){}}
function saveLang(){try{localStorage.setItem('tg-lang',currentLang);}catch(e){}}
function loadTheme(){
  try{
    const s=localStorage.getItem('tg-theme');
    if(s==='light'||s==='dark')currentTheme=s;
    else currentTheme='dark';
  }catch(e){currentTheme='dark';}
}
function saveTheme(){try{localStorage.setItem('tg-theme',currentTheme);}catch(e){}}
function applyTheme(theme){
  if(theme!=='light'&&theme!=='dark')theme='dark';
  currentTheme=theme;
  document.documentElement.setAttribute('data-theme',theme);
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content',theme==='light'?'#f5f7fa':'#08090c');
  applyThemeLabels();
}
function applyThemeLabels(){
  const el=$('settings-theme-current');
  if(el)el.textContent=currentTheme==='light'?t('themeLight'):t('themeDark');
}
function toggleTheme(){
  applyTheme(currentTheme==='light'?'dark':'light');
  saveTheme();
  toast(t('themeChanged'),'success');
}
const MAX_BASE64_SIZE = 700 * 1024;
const state={
  uid:null,nickname:null,pendingNickname:null,
  profile:{displayName:'',bio:'',avatarData:null,music:null,channelId:null,channelName:null},
  users:[],messages:{},groupMessages:{},groups:{},
  currentChat:null,currentChatType:null,
  unread:{},replyTo:null,reactionTarget:null,pendingFileType:null,messagesLoaded:false,
  contactUids:[],profiles:{},contactListeners:{},groupUnsubs:{},profileFetching:new Set(),
  unsubMe:null,unsubMessages:null,unsubGroups:null,
  stories:{},storyGroups:{},unsubStories:null,seenStoryIds:new Set(),
  storyTimer:null,currentStoryGroup:null,currentStoryIndex:0,pendingStoryMedia:null,
  chatWallpaper:null
};
let authMode='login',tempAvatar=null,tempMusic=null,currentGroupSettingsId=null,tempGroupAvatar=null,adminUsersCache=[];
let currentViewedProfileUid=null;
let _lpSuppressNextClick=false;
let _lpTimer=null;
let _lpStartX=0,_lpStartY=0;
let voiceRecorder=null;
let voiceStream=null;
let voiceChunks=[];
let voiceStartTime=0;
let voiceTimerInterval=null;
let isRecordingVoice=false;
let heartbeatInterval=null;
let currentChatProfileUnsub=null;
let heartbeatListenersAttached=false;
const $=id=>document.getElementById(id);
function escapeHtml(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function formatTime(ts){if(!ts)return '';const d=new Date(ts);if(isNaN(d.getTime()))return '';return d.toLocaleTimeString(currentLang==='ru'?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit'});}
function formatDate(ts){
  if(!ts)return '';
  const d=new Date(ts),now=new Date();
  if(isNaN(d.getTime()))return '';
  const today=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  const yest=today-86400000;
  const dayTs=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
  if(dayTs===today)return t('today');
  if(dayTs===yest)return t('yesterday');
  return d.toLocaleDateString(currentLang==='ru'?'ru-RU':'en-US',{day:'numeric',month:'short'});
}
function formatStoryTime(ts){
  const diff=Date.now()-ts,min=Math.floor(diff/60000);
  if(min<1)return t('timeJustNow');
  if(min<60)return tpl('timeMinAgo',{n:min});
  return tpl('timeHourAgo',{n:Math.floor(min/60)});
}
function formatLastSeen(ts){
  if(!ts)return t('inChat');
  const now=Date.now();
  const diff=now-ts;
  const min=Math.floor(diff/60000);
  if(min<1)return t('lastSeenJustNow');
  if(min<60)return tpl('lastSeenMinAgo',{n:min});
  const d=new Date(ts);
  const today=new Date();
  const todayTs=new Date(today.getFullYear(),today.getMonth(),today.getDate()).getTime();
  const yestTs=todayTs-86400000;
  const dayTs=new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
  const timeStr=d.toLocaleTimeString(currentLang==='ru'?'ru-RU':'en-US',{hour:'2-digit',minute:'2-digit'});
  if(dayTs===todayTs){
    return tpl('lastSeenToday',{time:timeStr});
  }
  if(dayTs===yestTs){
    return tpl('lastSeenYesterday',{time:timeStr});
  }
  const dateStr=d.toLocaleDateString(currentLang==='ru'?'ru-RU':'en-US',{day:'numeric',month:'short'});
  return tpl('lastSeenDate',{date:dateStr});
}
function formatVoiceDuration(secs){
  secs=Math.max(0,Math.round(secs)||0);
  const m=Math.floor(secs/60);
  const s=secs%60;
  return m+':'+String(s).padStart(2,'0');
}
function toast(text,type){
  const el=$('toast');el.textContent=text;el.className='toast'+(type?' '+type:'');
  el.classList.add('show');clearTimeout(el._tid);
  el._tid=setTimeout(()=>el.classList.remove('show'),2400);
}
function scrollToBottom(){
  const el=$('messages');if(!el)return;
  requestAnimationFrame(()=>{el.scrollTop=el.scrollHeight;requestAnimationFrame(()=>{el.scrollTop=el.scrollHeight;updateScrollButton();});});
}
function updateScrollButton(){
  const m=$('messages'),b=$('scroll-to-bottom');if(!m||!b)return;
  const d=m.scrollHeight-m.scrollTop-m.clientHeight;
  b.classList.toggle('visible',d>200);
}
function isNearBottom(threshold=120){
  const m=$('messages');if(!m)return true;
  return (m.scrollHeight-m.scrollTop-m.clientHeight)<=threshold;
}
function profileKey(){return 'tg-clone:'+state.uid;}
function storiesSeenKey(){return 'tg-stories-seen:'+state.uid;}
function fileToBase64(f){return new Promise((r,j)=>{const rd=new FileReader();rd.onload=()=>r(rd.result);rd.onerror=j;rd.readAsDataURL(f);});}
function formatSize(b){if(!b)return '';if(b<1024)return b+' B';if(b<1048576)return (b/1024).toFixed(1)+' KB';return (b/1048576).toFixed(1)+' MB';}
function getFileIcon(n){if(!n)return '📎';const e=n.split('.').pop().toLowerCase();
  if(e==='pdf')return '📕';if(['doc','docx'].includes(e))return '📘';
  if(['xls','xlsx'].includes(e))return '📗';if(['zip','rar','7z'].includes(e))return '🗜️';
  if(e==='txt')return '📄';return '📎';}
function nicknameToEmail(n){const l=n.toLowerCase();const h=Array.from(l).map(c=>c.codePointAt(0).toString(16)).join('x');return `u${h}@sendit.local`;}
function validateNickname(n){
  if(n.length<2)return t('errNicknameShort');
  if(n.length>20)return t('errNicknameLong');
  if(!/^[\p{L}0-9_]+$/u.test(n))return t('errNicknameChars');
  return null;
}
function getUserDisplayName(uid){if(uid===state.uid)return currentLang==='ru'?'Вы':'You';const u=state.profiles[uid];return u?u.displayName:'?';}
function plural(n,one,few,many){
  if(currentLang==='en')return n===1?one:few;
  const m10=n%10,m100=n%100;
  if(m10===1&&m100!==11)return one;
  if(m10>=2&&m10<=4&&(m100<10||m100>=20))return few;
  return many;
}
function isChannel(gid){return !!(state.groups[gid]&&state.groups[gid].isChannel);}
function isAdminIn(gid){const g=state.groups[gid];return !!(g&&g.members&&g.members[state.uid]&&g.members[state.uid].role==='admin');}
function canPostInCurrentChat(){
  if(state.currentChatType!=='group')return true;
  if(!isChannel(state.currentChat))return true;
  return isAdminIn(state.currentChat);
}
function isSuperAdmin(){return state.nickname==='llamx';}
async function uploadFileToStorage(file,path,opts){
  opts=opts||{};
  const{s3,s3Ready,S3_CONFIG}=window.fb;
  if(!s3Ready||!s3)throw new Error('S3 не настроен');
  const params={
    Bucket:S3_CONFIG.bucket,
    Key:path,
    Body:file,
    ContentType:file.type||'application/octet-stream'
  };
  const data=await s3.upload(params).promise();
  return data.Location;
}
function saveProfile(){if(!state.uid)return;try{localStorage.setItem(profileKey(),JSON.stringify({profile:state.profile}));}catch(e){toast(t('errFileRead'),'error');}}
function loadProfile(){try{const r=localStorage.getItem(profileKey());if(!r)return;const d=JSON.parse(r);if(d.profile)state.profile={...state.profile,...d.profile};}catch(e){}}
function saveSeenStories(){if(!state.uid)return;try{const a=Array.from(state.seenStoryIds).slice(-500);localStorage.setItem(storiesSeenKey(),JSON.stringify(a));}catch(e){}}
function loadSeenStories(){try{const r=localStorage.getItem(storiesSeenKey());if(!r)return;const a=JSON.parse(r);if(Array.isArray(a))state.seenStoryIds=new Set(a);}catch(e){}}
function startHeartbeat(){
  if(!state.uid||!window.fb)return;
  const{db,doc,updateDoc,serverTimestamp}=window.fb;
  const update=()=>{
    if(!state.uid)return;
    updateDoc(doc(db,'users',state.uid),{
      lastSeen:serverTimestamp(),
      online:true
    }).catch(e=>console.warn('heartbeat failed:',e));
  };
  update();
  if(heartbeatInterval)clearInterval(heartbeatInterval);
  heartbeatInterval=setInterval(update,30000);
  if(!heartbeatListenersAttached){
    heartbeatListenersAttached=true;
    const handleOffline=()=>{
      if(!state.uid||!window.fb)return;
      const{db,doc,updateDoc,serverTimestamp}=window.fb;
      updateDoc(doc(db,'users',state.uid),{
        lastSeen:serverTimestamp(),
        online:false
      }).catch(()=>{});
    };
    window.addEventListener('beforeunload',handleOffline);
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='hidden')handleOffline();
      else {
        if(state.uid&&window.fb){
          const{db,doc,updateDoc,serverTimestamp}=window.fb;
          updateDoc(doc(db,'users',state.uid),{lastSeen:serverTimestamp(),online:true}).catch(()=>{});
        }
      }
    });
  }
}
function stopHeartbeat(){
  if(heartbeatInterval){
    clearInterval(heartbeatInterval);
    heartbeatInterval=null;
  }
  if(state.uid&&window.fb){
    const{db,doc,updateDoc,serverTimestamp}=window.fb;
    updateDoc(doc(db,'users',state.uid),{
      lastSeen:serverTimestamp(),
      online:false
    }).catch(()=>{});
  }
}
const CHAT_WALLPAPERS=[
  {id:'none', type:'none',     labelKey:'wallpaperDefault'},
  {id:'grad1',type:'gradient', labelKey:'wpPurple', value:'linear-gradient(135deg,#667eea 0%,#764ba2 100%)'},
  {id:'grad2',type:'gradient', labelKey:'wpPink',   value:'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)'},
  {id:'grad3',type:'gradient', labelKey:'wpBlue',   value:'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)'},
  {id:'grad4',type:'gradient', labelKey:'wpGreen',  value:'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)'},
  {id:'grad5',type:'gradient', labelKey:'wpSunset', value:'linear-gradient(135deg,#fa709a 0%,#fee140 100%)'},
  {id:'grad6',type:'gradient', labelKey:'wpOcean',  value:'linear-gradient(135deg,#30cfd0 0%,#330867 100%)'},
  {id:'grad7',type:'gradient', labelKey:'wpMint',   value:'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)'}
];
let tempWallpaper=null;
function loadChatWallpaper(){
  try{
    const s=localStorage.getItem('tg-chat-wallpaper');
    if(s){const p=JSON.parse(s);if(p&&p.type){state.chatWallpaper=p;return;}}
  }catch(e){}
  state.chatWallpaper={id:'none',type:'none'};
}
function saveChatWallpaper(){
  try{localStorage.setItem('tg-chat-wallpaper',JSON.stringify(state.chatWallpaper||{id:'none',type:'none'}));}catch(e){}
}
function applyChatWallpaper(){
  const el=$('messages');if(!el)return;
  const wp=state.chatWallpaper||{type:'none'};
  el.style.backgroundImage='';
  el.style.backgroundSize='';
  el.style.backgroundPosition='';
  el.style.backgroundRepeat='';
  if(wp.type==='gradient'&&wp.value){
    el.style.backgroundImage=wp.value;
  }else if(wp.type==='image'&&wp.value){
    el.style.backgroundImage=`url("${wp.value}")`;
    el.style.backgroundSize='cover';
    el.style.backgroundPosition='center';
    el.style.backgroundRepeat='no-repeat';
  }
}
function updateWallpaperLabel(){
  const el=$('settings-wallpaper-current');if(!el)return;
  const wp=state.chatWallpaper||{type:'none'};
  if(wp.type==='none'){el.textContent=t('wallpaperDefault');return;}
  if(wp.type==='image'){el.textContent=t('wallpaperCustom');return;}
  const found=CHAT_WALLPAPERS.find(x=>x.id===wp.id);
  el.textContent=found?t(found.labelKey):t('wallpaperDefault');
}
function openWallpaperModal(){
  tempWallpaper=state.chatWallpaper?{...state.chatWallpaper}:{id:'none',type:'none'};
  renderWallpaperGrid();
  $('wallpaper-modal').classList.add('visible');
}
function renderWallpaperGrid(){
  const grid=$('wallpaper-grid');if(!grid)return;
  let html='';
  CHAT_WALLPAPERS.forEach(wp=>{
    const active=(tempWallpaper&&tempWallpaper.id===wp.id)?'active':'';
    const style=wp.type==='gradient'?`background:${wp.value};`:'';
    const inner=wp.type==='none'?t('wallpaperDefault'):'';
    html+=`<div class="wallpaper-item ${active}" data-id="${wp.id}" data-type="${wp.type}" style="${style}">${inner}</div>`;
  });
  const isCustom=tempWallpaper&&tempWallpaper.type==='image';
  const customActive=isCustom?'active':'';
  const customStyle=isCustom
    ?`background-image:url('${tempWallpaper.value}');background-size:cover;background-position:center;`
    :'';
  html+=`<div class="wallpaper-item upload-item ${customActive}" id="wallpaper-upload" style="${customStyle}">${
    isCustom?'':`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><span>${t('wallpaperUpload')}</span>`
  }</div>`;
  grid.innerHTML=html;
  grid.querySelectorAll('.wallpaper-item').forEach(el=>{
    el.addEventListener('click',()=>{
      if(el.id==='wallpaper-upload'){$('wallpaper-input').value='';$('wallpaper-input').click();return;}
      const wp=CHAT_WALLPAPERS.find(x=>x.id===el.dataset.id);
      if(wp)tempWallpaper={...wp};
      renderWallpaperGrid();
    });
  });
}
async function startVoiceRecording(){
  if(isRecordingVoice)return;
  if(!state.currentChat)return;
  if(!canPostInCurrentChat()){toast(t('channelOnlyAdmins'),'error');return;}
  const diag=[];
  if(!window.isSecureContext)diag.push('insecure-context');
  if(typeof navigator.mediaDevices==='undefined')diag.push('no-mediaDevices');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)diag.push('no-getUserMedia');
  if(typeof window.MediaRecorder==='undefined')diag.push('no-MediaRecorder');
  if(diag.length){
    console.error('[voice] Not supported:',diag.join(', '),{
      url:location.href,
      isSecureContext:window.isSecureContext,
      mediaDevices:typeof navigator.mediaDevices,
      MediaRecorder:typeof window.MediaRecorder,
      inIframe:window.self!==window.top,
      ua:navigator.userAgent
    });
    toast(t('errVoiceUnsupported'),'error');
    return;
  }
  try{
    voiceStream=await navigator.mediaDevices.getUserMedia({audio:true});
  }catch(e){
    console.error('[voice] getUserMedia failed:',e.name,e.message);
    if(e.name==='NotAllowedError'||e.name==='PermissionDeniedError')toast(t('errMicPerm'),'error');
    else if(e.name==='NotFoundError'||e.name==='DevicesNotFoundError')toast(t('errMicNotFound'),'error');
    else if(e.name==='NotReadableError'||e.name==='TrackStartError')toast(t('errMicBusy'),'error');
    else toast(t('errMicAccess'),'error');
    voiceStream=null;
    return;
  }
  voiceChunks=[];
  const mimeTypes=['audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus','audio/mp4','audio/mpeg'];
  let mimeType='';
  for(const m of mimeTypes){
    try{if(MediaRecorder.isTypeSupported(m)){mimeType=m;break;}}catch(e){}
  }
  if(!mimeType){
    console.error('[voice] No supported audio mime type');
    try{voiceStream.getTracks().forEach(tr=>tr.stop());}catch(_){}
    voiceStream=null;
    toast(t('errVoiceUnsupported'),'error');
    return;
  }
  try{
    voiceRecorder=new MediaRecorder(voiceStream,{mimeType});
  }catch(e){
    console.error('[voice] MediaRecorder ctor failed:',e);
    try{voiceStream.getTracks().forEach(tr=>tr.stop());}catch(_){}
    voiceStream=null;voiceRecorder=null;
    toast(t('errVoiceUnsupported'),'error');
    return;
  }
  voiceRecorder.ondataavailable=e=>{if(e.data&&e.data.size>0)voiceChunks.push(e.data);};
  voiceRecorder.onstop=async()=>{
    const rec=voiceRecorder;
    const mType=(rec&&rec.mimeType)||mimeType||'audio/webm';
    if(voiceStream){try{voiceStream.getTracks().forEach(tr=>tr.stop());}catch(e){}voiceStream=null;}
    voiceRecorder=null;
    if(!voiceChunks.length)return;
    const blob=new Blob(voiceChunks,{type:mType});
    voiceChunks=[];
    const duration=(Date.now()-voiceStartTime)/1000;
    if(duration<1){toast(t('errVoiceTooShort'),'error');return;}
    await sendVoiceBlob(blob,duration);
  };
  try{voiceRecorder.start();}
  catch(e){
    console.error('[voice] start() failed:',e);
    try{voiceStream.getTracks().forEach(tr=>tr.stop());}catch(_){}
    voiceStream=null;voiceRecorder=null;
    toast(t('errVoiceUnsupported'),'error');
    return;
  }
  isRecordingVoice=true;
  voiceStartTime=Date.now();
  $('recording-bar').classList.add('visible');
  $('reply-bar').classList.remove('visible');
  $('send-btn').classList.add('recording');
  $('voice-timer').textContent='0:00';
  if(voiceTimerInterval)clearInterval(voiceTimerInterval);
  voiceTimerInterval=setInterval(updateVoiceTimer,100);
  try{if(navigator.vibrate)navigator.vibrate(20);}catch(e){}
}
function updateVoiceTimer(){
  if(!isRecordingVoice)return;
  const secs=(Date.now()-voiceStartTime)/1000;
  const el=$('voice-timer');if(el)el.textContent=formatVoiceDuration(secs);
}
function stopVoiceRecording(send){
  if(!isRecordingVoice||!voiceRecorder)return;
  isRecordingVoice=false;
  if(voiceTimerInterval){clearInterval(voiceTimerInterval);voiceTimerInterval=null;}
  $('recording-bar').classList.remove('visible');
  $('send-btn').classList.remove('recording');
  if(!send){
    voiceChunks=[];
    try{voiceRecorder.onstop=null;voiceRecorder.stop();}catch(e){}
    if(voiceStream){try{voiceStream.getTracks().forEach(tr=>tr.stop());}catch(e){}voiceStream=null;}
    voiceRecorder=null;
    return;
  }
  try{voiceRecorder.stop();}catch(e){}
}
function cancelVoiceRecording(){stopVoiceRecording(false);}
async function sendVoiceBlob(blob,duration){
  if(!state.currentChat)return;
  if(!canPostInCurrentChat()){toast(t('channelOnlyAdmins'),'error');return;}
  const ext=blob.type.includes('mp4')?'m4a':blob.type.includes('ogg')?'ogg':'webm';
  const filename='voice_'+Date.now()+'.'+ext;
  try{
    let dataUrl;
    if(blob.size>MAX_BASE64_SIZE){
      if(!window.fb.s3Ready){toast(t('noS3Big'),'error');return;}
      toast('Загрузка голосового...');
      const file=new File([blob],filename,{type:blob.type});
      dataUrl=await uploadFileToStorage(file,`voice/${state.uid}/${Date.now()}_${filename}`);
    }else{
      dataUrl=await new Promise((res,rej)=>{
        const rd=new FileReader();
        rd.onload=()=>res(rd.result);
        rd.onerror=rej;
        rd.readAsDataURL(blob);
      });
    }
    await sendFileContent({type:'voice',dataUrl,duration:Math.round(duration)});
  }catch(e){
    console.error('sendVoiceBlob:',e);
    toast(t('errSendFileFailed'),'error');
  }
}
function attachVoicePlayer(el){
  const src=el.dataset.src;if(!src)return;
  const audio=new Audio();audio.preload='metadata';audio.src=src;
  const btn=el.querySelector('.voice-btn');
  const fill=el.querySelector('.voice-progress-fill');
  const timeEl=el.querySelector('.voice-time');
  const wrap=el.querySelector('.voice-progress-wrap');
  const initDur=parseFloat(el.dataset.duration)||0;
  function setDuration(d){
    el.dataset.duration=d;
    if(audio.paused)timeEl.textContent=formatVoiceDuration(d);
  }
  audio.addEventListener('loadedmetadata',()=>{
    if(!initDur||initDur<0.5){
      setDuration(isFinite(audio.duration)&&audio.duration>0?audio.duration:initDur);
    }
  });
  audio.addEventListener('timeupdate',()=>{
    const dur=(isFinite(audio.duration)&&audio.duration>0)?audio.duration:(parseFloat(el.dataset.duration)||1);
    const pct=(audio.currentTime/dur)*100;
    fill.style.width=Math.max(0,Math.min(100,pct))+'%';
    const remain=Math.max(0,dur-audio.currentTime);
    timeEl.textContent=formatVoiceDuration(remain);
  });
  audio.addEventListener('ended',()=>{
    btn.textContent='▶';
    fill.style.width='0%';
    const dur=(isFinite(audio.duration)&&audio.duration>0)?audio.duration:(parseFloat(el.dataset.duration)||0);
    timeEl.textContent=formatVoiceDuration(dur);
  });
  audio.addEventListener('pause',()=>{btn.textContent='▶';});
  audio.addEventListener('play',()=>{btn.textContent='⏸';});
  btn.addEventListener('click',(e)=>{
    e.stopPropagation();e.preventDefault();
    if(audio.paused){
      document.querySelectorAll('.voice-msg').forEach(other=>{
        if(other!==el){
          const b=other.querySelector('.voice-btn');
          if(b&&b.textContent==='⏸')b.click();
        }
      });
      audio.play().catch(err=>console.error(err));
    }else{
      audio.pause();
    }
  });
  wrap.addEventListener('click',(e)=>{
    e.stopPropagation();
    const rect=wrap.getBoundingClientRect();
    const x=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    const dur=(isFinite(audio.duration)&&audio.duration>0)?audio.duration:(parseFloat(el.dataset.duration)||0);
    if(dur>0){
      audio.currentTime=x*dur;
      fill.style.width=(x*100)+'%';
    }
  });
}
/* ============ ВХОД ============ */
function setAuthMode(mode){
  authMode=mode;
  $('tab-login').classList.toggle('active',mode==='login');
  $('tab-register').classList.toggle('active',mode==='register');
  $('auth-submit').textContent=mode==='login'?t('signIn'):t('signUp');
  $('auth-submit').setAttribute('data-i18n',mode==='login'?'signIn':'signUp');
  $('password-confirm').style.display=mode==='register'?'block':'none';
  $('login-err').textContent='';
  $('auth-title').textContent=mode==='login'?t('welcome'):t('createAccount');
  $('auth-title').setAttribute('data-i18n',mode==='login'?'welcome':'createAccount');
  $('auth-subtitle').textContent=mode==='login'?t('subtitle'):t('subtitleRegister');
  $('auth-subtitle').setAttribute('data-i18n',mode==='login'?'subtitle':'subtitleRegister');
}
function showErr(m){$('login-err').textContent=m;}
async function handleRegister(){
  const nick=$('username').value.trim(),pass=$('password').value,conf=$('password-confirm').value;
  const err=validateNickname(nick);if(err){showErr(err);return;}
  if(pass.length<6){showErr(t('errPasswordMin'));return;}
  if(pass!==conf){showErr(t('errPasswordsDontMatch'));return;}
  if(!window.fb){showErr(t('errServerConnecting'));return;}
  const{auth,createUserWithEmailAndPassword,db,doc,setDoc,serverTimestamp}=window.fb;
  state.pendingNickname=nick;showErr('');
  try{
    const cred=await createUserWithEmailAndPassword(auth,nicknameToEmail(nick),pass);
    await setDoc(doc(db,'users',cred.user.uid),{uid:cred.user.uid,nickname:nick,nicknameLower:nick.toLowerCase(),displayName:nick,contacts:[],createdAt:serverTimestamp()});
  }catch(e){
    state.pendingNickname=null;
    if(e.code==='auth/email-already-in-use')showErr(t('errNicknameTaken'));
    else if(e.code==='auth/weak-password')showErr(t('errWeakPassword'));
    else if(e.code==='auth/network-request-failed')showErr(t('errNoInternet'));
    else showErr('Error: '+(e.message||e.code));
  }
}
async function handleLogin(){
  const nick=$('username').value.trim(),pass=$('password').value;
  if(!nick){showErr(t('errEnterNickname'));return;}
  if(!pass){showErr(t('errEnterPassword'));return;}
  if(!window.fb){showErr(t('errServerConnecting'));return;}
  const{auth,signInWithEmailAndPassword}=window.fb;showErr('');
  try{await signInWithEmailAndPassword(auth,nicknameToEmail(nick),pass);}
  catch(e){
    if(['auth/user-not-found','auth/wrong-password','auth/invalid-credential','auth/invalid-login-credentials'].includes(e.code))showErr(t('errInvalidCredentials'));
    else if(e.code==='auth/network-request-failed')showErr(t('errNoInternet'));
    else showErr('Error: '+(e.message||e.code));
  }
}/* ============ ПРОФИЛИ ============ */
async function ensureProfile(uid){
  if(state.profiles[uid]||state.profileFetching.has(uid))return;
  state.profileFetching.add(uid);
  try{
    const{db,doc,getDoc}=window.fb;
    const snap=await getDoc(doc(db,'users',uid));
    if(snap.exists()){
      const d=snap.data();
      state.profiles[uid]={uid,nickname:d.nickname,displayName:d.displayName||d.nickname,avatar:(d.displayName||d.nickname||'?')[0].toUpperCase(),avatarData:d.avatarData||null,lastSeen:d.lastSeen&&d.lastSeen.toDate?d.lastSeen.toDate().getTime():(d.lastSeen||0),online:d.online||false};
    }else{state.profiles[uid]={uid,nickname:'?',displayName:'—',avatar:'?',avatarData:null,lastSeen:0,online:false};}
    rebuildUsersList();if(currentGroupSettingsId)renderGroupSettings();
  }catch(e){console.error('ensureProfile:',e);}
  finally{state.profileFetching.delete(uid);}
}
function listenToMyContacts(){
  const{db,doc,onSnapshot}=window.fb;
  if(state.unsubMe)state.unsubMe();
  state.unsubMe=onSnapshot(doc(db,'users',state.uid),(snap)=>{
    if(!snap.exists())return;
    const data=snap.data();
    const newUids=(data.contacts||[]).filter(u=>u!==state.uid);
    Object.keys(state.contactListeners).forEach(uid=>{
      if(!newUids.includes(uid)){state.contactListeners[uid]();delete state.contactListeners[uid];}
    });
    newUids.forEach(uid=>{
      if(!state.contactListeners[uid]){
        state.contactListeners[uid]=onSnapshot(doc(db,'users',uid),(s)=>{
          if(s.exists()){
            const d=s.data();
            state.profiles[uid]={uid,nickname:d.nickname,displayName:d.displayName||d.nickname,avatar:(d.displayName||d.nickname||'?')[0].toUpperCase(),avatarData:d.avatarData||null,lastSeen:d.lastSeen&&d.lastSeen.toDate?d.lastSeen.toDate().getTime():(d.lastSeen||0),online:d.online||false};
          }else{state.profiles[uid]={uid,nickname:'?',displayName:'—',avatar:'?',avatarData:null,lastSeen:0,online:false};}
          rebuildUsersList();if(currentGroupSettingsId)renderGroupSettings();
          if(state.currentChatType==='user'&&state.currentChat===uid)updateChatHeader(uid,'user');
        },err=>console.error('contact listener:',err));
      }
    });
    state.contactUids=newUids;rebuildUsersList();renderStoriesBar();
  },err=>console.error('my user listener:',err));
}
function rebuildUsersList(){
  const uids=new Set();
  state.contactUids.forEach(u=>uids.add(u));
  Object.keys(state.messages).forEach(u=>{if(u&&u!==state.uid)uids.add(u);});
  const list=[];
  uids.forEach(uid=>{if(state.profiles[uid])list.push(state.profiles[uid]);else ensureProfile(uid);});
  state.users=list;renderChatList();
}
async function findUserByNickname(nickname){
  const{db,collection,query,where,getDocs}=window.fb;
  const lower=nickname.trim().toLowerCase();if(!lower)return null;
  try{
    const q=query(collection(db,'users'),where('nicknameLower','==',lower));
    const snap=await getDocs(q);
    if(!snap.empty){const d=snap.docs[0].data();return{uid:d.uid||snap.docs[0].id,nickname:d.nickname,displayName:d.displayName||d.nickname,avatarData:d.avatarData||null};}
  }catch(e){console.error('findUser indexed:',e);}
  try{
    const snap=await getDocs(collection(db,'users'));
    let found=null;
    snap.forEach(d=>{if(found)return;const u=d.data();
      if((u.nickname||'').toLowerCase()===lower)found={uid:u.uid||d.id,nickname:u.nickname,displayName:u.displayName||u.nickname,avatarData:u.avatarData||null};});
    return found;
  }catch(e){console.error('findUser fallback:',e);}
  return null;
}
async function addContactByUid(uid){
  const{db,doc,updateDoc,arrayUnion}=window.fb;
  await updateDoc(doc(db,'users',state.uid),{contacts:arrayUnion(uid)});
}
async function doFind(){
  const nickname=$('find-input').value.trim(),res=$('find-result');
  if(!nickname){res.innerHTML=`<div class="find-error">${t('errEnterNickname')}</div>`;return;}
  res.innerHTML=`<div class="find-empty">${t('searchChats')}...</div>`;
  try{
    const found=await findUserByNickname(nickname);
    if(!found){res.innerHTML=`<div class="find-error">${t('userNotFound')}</div>`;return;}
    if(found.uid===state.uid){res.innerHTML=`<div class="find-error">${t('itIsYourLogin')}</div>`;return;}
    const letter=(found.displayName||found.nickname||'?')[0].toUpperCase();
    const avInner=found.avatarData?`<img src="${escapeHtml(found.avatarData)}" alt="">`:escapeHtml(letter);
    if(state.contactUids.includes(found.uid)){
      res.innerHTML=`<div class="find-user"><div class="avatar">${avInner}</div><div class="info"><div class="name">${escapeHtml(found.displayName)}</div><div class="nick">@${escapeHtml(found.nickname)} · ${t('alreadyInContacts')}</div></div></div>`;
      return;
    }
    res.innerHTML=`<div class="find-user"><div class="avatar">${avInner}</div><div class="info"><div class="name">${escapeHtml(found.displayName)}</div><div class="nick">@${escapeHtml(found.nickname)}</div></div><button id="find-add-btn">${t('add')}</button></div>`;
    const btn=document.getElementById('find-add-btn');
    btn.addEventListener('click',async()=>{
      btn.disabled=true;btn.textContent='...';
      try{
        await addContactByUid(found.uid);toast(t('okContactAdded'),'success');
        $('find-modal').classList.remove('visible');
        setTimeout(()=>{
          if(!state.contactUids.includes(found.uid)){
            state.profiles[found.uid]={uid:found.uid,nickname:found.nickname,displayName:found.displayName,avatar:letter,avatarData:found.avatarData||null,lastSeen:0,online:false};
            rebuildUsersList();renderStoriesBar();
          }
          openChat(found.uid,'user');
        },400);
      }catch(e){console.error(e);btn.disabled=false;btn.textContent=t('add');toast(t('errAddContact'),'error');}
    });
  }catch(e){console.error(e);res.innerHTML=`<div class="find-error">${t('errSearch')}</div>`;}
}
function openFindModal(){$('find-input').value='';$('find-result').innerHTML='';$('find-modal').classList.add('visible');setTimeout(()=>$('find-input').focus(),50);}
/* ============ ИСТОРИИ ============ */
function listenToStories(){
  const{db,collection,onSnapshot}=window.fb;
  if(state.unsubStories)state.unsubStories();
  state.unsubStories=onSnapshot(collection(db,'stories'),(snap)=>{
    const cutoff=Date.now()-24*60*60*1000;const stories={};
    snap.forEach(d=>{
      const s=d.data();
      const created=s.createdAt&&s.createdAt.toDate?s.createdAt.toDate().getTime():0;
      if(created<cutoff)return;
      stories[d.id]={id:d.id,authorUid:s.authorUid,type:s.type,dataUrl:s.dataUrl,caption:s.caption||'',createdAt:created,reactions:s.reactions||{}};
    });
    state.stories=stories;buildStoryGroups();renderStoriesBar();
    if(state.currentStoryGroup)updateStoryReactionsUI();
    if ($('user-profile-modal').classList.contains('visible') && currentViewedProfileUid) {
      renderUserProfileStories(currentViewedProfileUid);
    }
  },err=>console.error('stories listener:',err));
}
function buildStoryGroups(){
  const groups={};
  Object.values(state.stories).forEach(s=>{if(!groups[s.authorUid])groups[s.authorUid]=[];groups[s.authorUid].push(s);});
  Object.keys(groups).forEach(uid=>groups[uid].sort((a,b)=>a.createdAt-b.createdAt));
  state.storyGroups=groups;
}
function getVisibleStoryAuthors(){
  const r=[];
  if(state.storyGroups[state.uid]&&state.storyGroups[state.uid].length)r.push(state.uid);
  state.contactUids.forEach(uid=>{if(state.storyGroups[uid]&&state.storyGroups[uid].length)r.push(uid);});
  return r;
}
function renderStoriesBar(){
  const bar=$('stories-bar');if(!bar)return;
  const myStories=state.storyGroups[state.uid]||[];
  const hasMine=myStories.length>0;
  const myFirst=hasMine?myStories[myStories.length-1]:null;
  const myThumb=myFirst?(myFirst.type==='image'?`<img src="${escapeHtml(myFirst.dataUrl)}" alt="">`:`<video src="${escapeHtml(myFirst.dataUrl)}" muted></video>`):`<span>+</span>`;
  let html=`<div class="story-item my-story" data-author="${escapeHtml(state.uid)}"><div class="story-ring ${hasMine?'seen':'add'}"><div class="story-thumb">${myThumb}</div></div><div class="story-label">${t('myStory')}</div>${hasMine?`<button class="story-add-btn" id="story-add-btn" title="Добавить">＋</button>`:''}</div>`;
  state.contactUids.forEach(uid=>{
    const stories=state.storyGroups[uid];if(!stories||!stories.length)return;
    const p=state.profiles[uid]||{displayName:'?',avatar:'?'};
    const firstUnseen=stories.find(s=>!state.seenStoryIds.has(s.id));
    const isSeen=!firstUnseen;
    const preview=firstUnseen||stories[stories.length-1];
    const thumb=preview.type==='image'?`<img src="${escapeHtml(preview.dataUrl)}" alt="">`:`<video src="${escapeHtml(preview.dataUrl)}" muted></video>`;
    html+=`<div class="story-item" data-author="${escapeHtml(uid)}"><div class="story-ring ${isSeen?'seen':'unseen'}"><div class="story-thumb">${thumb}</div></div><div class="story-label">${escapeHtml(p.displayName)}</div></div>`;
  });
  bar.innerHTML=html;
  bar.querySelectorAll('.story-item').forEach(el=>{
    el.addEventListener('click',e=>{
      if(e.target.id==='story-add-btn'){e.stopPropagation();triggerStoryFileInput();return;}
      const uid=el.dataset.author;
      if(uid===state.uid&&!state.storyGroups[state.uid]){triggerStoryFileInput();return;}
      openStoryViewer(uid);
    });
  });
}
function triggerStoryFileInput(){$('story-file-input').value='';$('story-file-input').click();}
function openStoryViewer(authorUid, startIndex = -1){
  const stories=state.storyGroups[authorUid];if(!stories||!stories.length)return;
  state.currentStoryGroup=authorUid;
  if(startIndex>=0 && startIndex<stories.length){
    state.currentStoryIndex=startIndex;
  }else{
    let idx=stories.findIndex(s=>!state.seenStoryIds.has(s.id));
    if(idx===-1)idx=0;
    state.currentStoryIndex=idx;
  }
  $('story-viewer').classList.add('visible');
  showStory();
}
function showStory(){
  const authorUid=state.currentStoryGroup;
  const stories=state.storyGroups[authorUid];
  if(!stories||!stories.length){closeStoryViewer();return;}
  if(state.currentStoryIndex<0)state.currentStoryIndex=0;
  if(state.currentStoryIndex>=stories.length){closeStoryViewer();return;}
  const story=stories[state.currentStoryIndex];
  const p=state.profiles[authorUid]||{displayName:'?',avatar:'?',avatarData:null};
  if(p.avatarData)$('story-viewer-avatar').innerHTML=`<img src="${escapeHtml(p.avatarData)}" alt="">`;
  else $('story-viewer-avatar').textContent=p.avatar;
  $('story-viewer-author').textContent=authorUid===state.uid?t('myStory'):p.displayName;
  $('story-viewer-time').textContent=formatStoryTime(story.createdAt);
  $('story-viewer-delete').style.display=authorUid===state.uid?'':'none';
  $('story-progress').innerHTML=stories.map((_,i)=>{
    const cls=i<state.currentStoryIndex?'filled':i===state.currentStoryIndex?'active':'';
    return `<div class="story-progress-seg ${cls}"><div class="story-progress-fill"></div></div>`;
  }).join('');
  const cont=$('story-viewer-content');
  if(story.type==='image')cont.innerHTML=`<img src="${escapeHtml(story.dataUrl)}" alt="">`;
  else cont.innerHTML=`<video src="${escapeHtml(story.dataUrl)}" autoplay playsinline></video>`;
  $('story-viewer-caption').textContent=story.caption||'';
  $('story-viewer-caption').style.display=story.caption?'':'none';
  if(!state.seenStoryIds.has(story.id)){state.seenStoryIds.add(story.id);saveSeenStories();}
  if(state.storyTimer)clearTimeout(state.storyTimer);
  const activeSeg=$('story-progress').children[state.currentStoryIndex];
  const fill=activeSeg?activeSeg.querySelector('.story-progress-fill'):null;
  if(story.type==='image'){
    if(fill){fill.style.transition='none';fill.style.width='0%';void fill.offsetWidth;fill.style.transition='width 5s linear';fill.style.width='100%';}
    state.storyTimer=setTimeout(()=>nextStory(),5000);
  }else{
    const video=cont.querySelector('video');
    if(video){
      const onMeta=()=>{
        const dur=isFinite(video.duration)&&video.duration>0?video.duration*1000:5000;
        if(fill){fill.style.transition='none';fill.style.width='0%';void fill.offsetWidth;fill.style.transition=`width ${dur}ms linear`;fill.style.width='100%';}
        state.storyTimer=setTimeout(()=>nextStory(),dur+200);
      };
      video.addEventListener('loadedmetadata',onMeta,{once:true});
      state.storyTimer=setTimeout(()=>nextStory(),15000);
      video.addEventListener('ended',()=>{if(state.storyTimer)clearTimeout(state.storyTimer);nextStory();},{once:true});
    }
  }
  updateStoryReactionsUI();
}
function nextStory(){
  const stories=state.storyGroups[state.currentStoryGroup]||[];
  if(state.currentStoryIndex<stories.length-1){state.currentStoryIndex++;showStory();}
  else{
    const authors=getVisibleStoryAuthors();
    const idx=authors.indexOf(state.currentStoryGroup);
    if(idx!==-1&&idx<authors.length-1){state.currentStoryGroup=authors[idx+1];state.currentStoryIndex=0;showStory();}
    else closeStoryViewer();
  }
}
function prevStory(){
  if(state.currentStoryIndex>0){state.currentStoryIndex--;showStory();}
  else{
    const authors=getVisibleStoryAuthors();
    const idx=authors.indexOf(state.currentStoryGroup);
    if(idx>0){
      const prevAuthor=authors[idx-1];
      const prevStories=state.storyGroups[prevAuthor]||[];
      state.currentStoryGroup=prevAuthor;
      state.currentStoryIndex=Math.max(0,prevStories.length-1);
      showStory();
    }
  }
}
function closeStoryViewer(){
  if(state.storyTimer){clearTimeout(state.storyTimer);state.storyTimer=null;}
  $('story-viewer').classList.remove('visible');
  $('story-viewer-content').innerHTML='';
  $('story-progress').innerHTML='';
  $('story-viewer-caption').textContent='';
  $('story-reactions').innerHTML='';
  $('story-reactions').classList.add('hidden');
  $('story-reactions-count').innerHTML='';
  state.currentStoryGroup=null;
  state.currentStoryIndex=0;
  renderStoriesBar();
}
async function deleteCurrentStory(){
  if(!state.currentStoryGroup||state.currentStoryGroup!==state.uid)return;
  if(!confirm(t('confirmDeleteStory')))return;
  const stories=state.storyGroups[state.uid];
  const story=stories[state.currentStoryIndex];if(!story)return;
  const{db,doc,deleteDoc}=window.fb;
  try{
    await deleteDoc(doc(db,'stories',story.id));
    toast(t('okStoryDeleted'),'success');
    if(stories.length<=1)closeStoryViewer();
    else{
      state.storyGroups[state.uid]=stories.filter(s=>s.id!==story.id);
      if(state.currentStoryIndex>=state.storyGroups[state.uid].length)state.currentStoryIndex=state.storyGroups[state.uid].length-1;
      showStory();
    }
  }catch(e){console.error(e);toast(t('errDeleteStory'),'error');}
}
const STORY_REACTIONS=['❤️','🔥','😂','😮','😢','👍'];
function updateStoryReactionsUI(){
  const btnsCont=$('story-reactions');
  const countCont=$('story-reactions-count');
  if(!btnsCont||!countCont)return;
  const authorUid=state.currentStoryGroup;
  const stories=authorUid?state.storyGroups[authorUid]:null;
  const story=(stories&&stories[state.currentStoryIndex])?stories[state.currentStoryIndex]:null;
  if(!story){btnsCont.innerHTML='';btnsCont.classList.add('hidden');countCont.innerHTML='';return;}
  const isMine=authorUid===state.uid;
  const reactions=story.reactions||{};
  const countHtml=Object.keys(reactions).map(emoji=>{
    const users=reactions[emoji];
    if(!users.length)return '';
    const mine=users.includes(state.uid)?'mine':'';
    return `<span class="rc ${mine}">${emoji} ${users.length}</span>`;
  }).join('');
  countCont.innerHTML=countHtml;
  if(isMine){
    btnsCont.innerHTML='';
    btnsCont.classList.add('hidden');
  }else{
    btnsCont.classList.remove('hidden');
    btnsCont.innerHTML=STORY_REACTIONS.map(emoji=>{
      const users=reactions[emoji]||[];
      const active=users.includes(state.uid)?'active':'';
      return `<button class="story-reaction-btn ${active}" data-emoji="${emoji}">${emoji}</button>`;
    }).join('');
    btnsCont.querySelectorAll('.story-reaction-btn').forEach(btn=>{
      btn.addEventListener('click',(e)=>{e.stopPropagation();toggleStoryReaction(story.id,btn.dataset.emoji);});
    });
  }
}
async function toggleStoryReaction(storyId,emoji){
  if(!window.fb)return;
  const story=state.stories[storyId];if(!story)return;
  if(story.authorUid===state.uid)return;
  const{db,doc,updateDoc}=window.fb;
  const reactions=JSON.parse(JSON.stringify(story.reactions||{}));
  if(!reactions[emoji])reactions[emoji]=[];
  const arr=reactions[emoji];
  const idx=arr.indexOf(state.uid);
  if(idx===-1)arr.push(state.uid);else arr.splice(idx,1);
  if(!arr.length)delete reactions[emoji];
  try{
    await updateDoc(doc(db,'stories',storyId),{reactions});
    story.reactions=reactions;
    updateStoryReactionsUI();
  }catch(e){console.error(e);toast(t('storyReactionErr'),'error');}
}
function listenToMyGroups(){
  const{db,collection,onSnapshot,query,where}=window.fb;
  if(state.unsubGroups)state.unsubGroups();
  const q=query(collection(db,'groups'),where('memberUids','array-contains',state.uid));
  state.unsubGroups=onSnapshot(q,snap=>{
    const groups={};snap.forEach(d=>{groups[d.id]={...d.data(),groupId:d.id};});
    state.groups=groups;
    Object.values(groups).forEach(g=>{Object.keys(g.members||{}).forEach(uid=>{if(uid!==state.uid&&!state.profiles[uid])ensureProfile(uid);});});
    listenToGroupMessages(groups);
    if(state.currentChatType==='group'&&state.currentChat){
      const g=state.groups[state.currentChat];
      if(!g){state.currentChat=null;state.currentChatType=null;$('chat-area').style.display='none';$('empty-chat').style.display='flex';}
      else{updateChatHeader(state.currentChat,'group');updateChannelUIPermissions();}
    }
    if(currentGroupSettingsId&&!state.groups[currentGroupSettingsId]){$('group-settings-modal').classList.remove('visible');currentGroupSettingsId=null;}
    else if(currentGroupSettingsId)renderGroupSettings();
    renderChatList();
  },err=>console.error('groups listener:',err));
}
function listenToGroupMessages(groups){
  const{db,collection,onSnapshot,query,where}=window.fb;
  Object.keys(state.groupUnsubs).forEach(gid=>{
    if(!groups[gid]){state.groupUnsubs[gid]();delete state.groupUnsubs[gid];delete state.groupMessages[gid];}
  });
  Object.keys(groups).forEach(gid=>{
    if(state.groupUnsubs[gid])return;
    const q=query(collection(db,'messages'),where('toGroupId','==',gid));
    let groupInitialized=false;
    state.groupUnsubs[gid]=onSnapshot(q,snap=>{
      const arr=[];
      snap.forEach(d=>{const m=d.data();
        arr.push({id:d.id,fromUid:m.fromUid,toGroupId:gid,content:m.content,time:m.time&&m.time.toDate?m.time.toDate().getTime():Date.now(),reactions:m.reactions||{},replyTo:m.replyTo||null});});
      arr.sort((a,b)=>a.time-b.time);
      if(groupInitialized){
        const old=state.groupMessages[gid]||[];
        const oldIds=new Set(old.map(m=>m.id));
        arr.forEach(m=>{
          if(!oldIds.has(m.id)&&m.fromUid!==state.uid&&!(state.currentChatType==='group'&&state.currentChat===gid))state.unread[gid]=(state.unread[gid]||0)+1;
        });
      }
      groupInitialized=true;
      state.groupMessages[gid]=arr;renderChatList();
      if(state.currentChatType==='group'&&state.currentChat===gid){renderMessages();}
    },err=>console.error('group messages listener:',err));
  });
}
async function createGroup(name,memberUids,asChannel){
  const{db,collection,doc,setDoc,serverTimestamp}=window.fb;
  const groupId=doc(collection(db,'groups')).id;
  const members={[state.uid]:{role:'admin',tag:''}};
  memberUids.forEach(uid=>{members[uid]={role:'member',tag:''};});
  await setDoc(doc(db,'groups',groupId),{groupId,name,description:'',avatarData:null,createdBy:state.uid,createdAt:serverTimestamp(),memberUids:[state.uid,...memberUids],members,isChannel:!!asChannel});
  return groupId;
}
function openCreateGroupModal(asChannel){
  const isCh=!!asChannel;
  $('cg-name').value='';$('cg-is-channel').checked=isCh;
  $('cg-title').textContent=isCh?t('newChannelTitle'):t('newGroupTitle');
  $('cg-name').placeholder=isCh?t('namePlaceholderChannel'):t('namePlaceholderGroup');
  $('cg-members-label').textContent=isCh?t('subscribersLabel'):t('membersLabel');
  const cont=$('cg-contacts');
  if(!state.users.length)cont.innerHTML=`<div class="find-empty">${t('contactsFirst')}</div>`;
  else cont.innerHTML=state.users.map(u=>{
    const letter=(u.displayName||u.nickname||'?')[0].toUpperCase();
    const avInner=u.avatarData?`<img src="${escapeHtml(u.avatarData)}" alt="">`:escapeHtml(letter);
    return `<label class="cg-contact"><input type="checkbox" value="${escapeHtml(u.uid)}"><div class="avatar">${avInner}</div><div class="info"><div class="name">${escapeHtml(u.displayName)}</div><div class="nick">@${escapeHtml(u.nickname)}</div></div></label>`;
  }).join('');
  $('create-group-modal').classList.add('visible');
}
async function handleCreateGroup(){
  const name=$('cg-name').value.trim();
  if(!name){toast(t('errNameEmpty'),'error');return;}
  const isCh=$('cg-is-channel').checked;
  const selected=Array.from($('cg-contacts').querySelectorAll('input:checked')).map(i=>i.value);
  const btn=$('cg-create');btn.disabled=true;btn.textContent='...';
  try{
    const gid=await createGroup(name,selected,isCh);
    $('create-group-modal').classList.remove('visible');
    toast(isCh?t('okChannelCreated'):t('okGroupCreated'),'success');
    setTimeout(()=>openChat(gid,'group'),500);
  }catch(e){console.error(e);toast(t('errCreateGroup'),'error');}
  finally{btn.disabled=false;btn.textContent=t('create');}
}
function openGroupSettings(gid){
  currentGroupSettingsId=gid;
  tempGroupAvatar=state.groups[gid]?.avatarData||null;
  renderGroupSettings();
  $('group-settings-modal').classList.add('visible');
}
function renderGroupSettings(){
  const gid=currentGroupSettingsId,g=state.groups[gid];
  if(!g){$('group-settings-modal').classList.remove('visible');return;}
  const isCh=!!g.isChannel,isAdmin=g.members?.[state.uid]?.role==='admin';
  $('gs-title').textContent=(isCh?'📢 ':'')+(g.name||t('newGroupTitle'));
  $('gs-members-label').textContent=isCh?t('subscribersLabel'):t('membersLabel');
  $('gs-name').value=g.name||'';$('gs-desc').value=g.description||'';
  const av=$('gs-avatar');
  const camSvg=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  if(tempGroupAvatar)av.innerHTML=`<img src="${escapeHtml(tempGroupAvatar)}" alt=""><div class="edit-ov" id="gs-avatar-edit" style="${isAdmin?'':'display:none'}">${camSvg}</div>`;
  else av.innerHTML=`<span>${escapeHtml((g.name||'?')[0].toUpperCase())}</span><div class="edit-ov" id="gs-avatar-edit" style="${isAdmin?'':'display:none'}">${camSvg}</div>`;
  $('gs-name').disabled=!isAdmin;$('gs-desc').disabled=!isAdmin;
  $('gs-save').style.display=isAdmin?'':'none';
  av.style.cursor=isAdmin?'pointer':'default';
  $('gs-add-members').style.display=isAdmin?'':'none';
  $('gs-add-members').querySelector('span').textContent=isCh?t('addSubscriber'):t('addMember');
  const memberUids=g.memberUids||[];
  $('gs-members').innerHTML=memberUids.map(uid=>{
    const m=g.members?.[uid]||{role:'member',tag:''};
    const p=state.profiles[uid]||{displayName:'?',nickname:'?',avatar:'?',avatarData:null};
    const isSelf=uid===state.uid,isAdminRole=m.role==='admin';
    const showActions=isAdmin&&!isSelf;
    const actions=showActions?`<div class="member-actions"><button data-action="toggle-role" data-uid="${escapeHtml(uid)}">${isAdminRole?'👤':'👑'}</button><button data-action="edit-tag" data-uid="${escapeHtml(uid)}">🏷️</button><button data-action="remove" data-uid="${escapeHtml(uid)}">✕</button></div>`:'';
    const avInner=p.avatarData?`<img src="${escapeHtml(p.avatarData)}" alt="">`:escapeHtml(p.avatar);
    return `<div class="member-row" data-uid="${escapeHtml(uid)}"><div class="avatar">${avInner}</div><div class="info"><div class="name">${escapeHtml(p.displayName)}${isSelf?' (вы)':''}${isAdminRole?`<span class="role-badge">${currentLang==='ru'?'админ':'admin'}</span>`:''}</div><div class="tag">@${escapeHtml(p.nickname)}${m.tag?` · <em>${escapeHtml(m.tag)}</em>`:''}</div></div>${actions}</div>`;
  }).join('');
  $('gs-members').querySelectorAll('[data-action]').forEach(btn=>{
    btn.addEventListener('click',e=>{e.stopPropagation();handleMemberAction(btn.dataset.action,btn.dataset.uid);});
  });
}
async function handleMemberAction(action,uid){
  const gid=currentGroupSettingsId;if(!gid)return;
  const g=state.groups[gid];if(!g)return;
  if(action==='remove'){
    if(!confirm(g.isChannel?t('confirmRemoveFromChannel'):t('confirmRemoveMember')))return;
    const newMembers={...g.members};delete newMembers[uid];
    const newMemberUids=(g.memberUids||[]).filter(u=>u!==uid);
    const{db,doc,updateDoc}=window.fb;
    try{await updateDoc(doc(db,'groups',gid),{members:newMembers,memberUids:newMemberUids});toast(t('memberRemoved'),'success');}
    catch(e){console.error(e);toast(t('errSaveGroup'),'error');}
  }else if(action==='toggle-role'){
    const cur=g.members?.[uid]?.role||'member';
    const newRole=cur==='admin'?'member':'admin';
    const{db,doc,updateDoc}=window.fb;
    try{await updateDoc(doc(db,'groups',gid),{[`members.${uid}.role`]:newRole});toast(newRole==='admin'?t('roleAdminAssigned'):t('roleRemoved'),'success');}
    catch(e){console.error(e);toast(t('errSaveGroup'),'error');}
  }else if(action==='edit-tag'){
    const cur=g.members?.[uid]?.tag||'';
    const p=state.profiles[uid];
    const tag=prompt(tpl('tagPrompt',{name:p?p.displayName:'—'}),cur);
    if(tag===null)return;
    const{db,doc,updateDoc}=window.fb;
    try{await updateDoc(doc(db,'groups',gid),{[`members.${uid}.tag`]:tag.trim()});toast(t('tagUpdated'),'success');}
    catch(e){console.error(e);toast(t('errSaveGroup'),'error');}
  }
}
async function saveGroupSettings(){
  const gid=currentGroupSettingsId;if(!gid)return;
  const g=state.groups[gid];if(!g)return;
  if(g.members?.[state.uid]?.role!=='admin'){toast(t('onlyAdminCanEdit'),'error');return;}
  const name=$('gs-name').value.trim();
  if(!name){toast(t('errNameEmpty'),'error');return;}
  const updates={name,description:$('gs-desc').value.trim()};
  if(tempGroupAvatar!==g.avatarData)updates.avatarData=tempGroupAvatar;
  const{db,doc,updateDoc}=window.fb;
  try{await updateDoc(doc(db,'groups',gid),updates);toast(t('okSaved'),'success');$('group-settings-modal').classList.remove('visible');}
  catch(e){console.error(e);toast(t('errSaveGroup'),'error');}
}
function openAddMembersModal(){
  const gid=currentGroupSettingsId,g=state.groups[gid];
  if(!g)return;
  if(g.members?.[state.uid]?.role!=='admin'){toast(t('onlyAdminCanAdd'),'error');return;}
  const isCh=!!g.isChannel;
  $('am-title').textContent=isCh?t('addSubscribersTitle'):t('addMembersTitle');
  $('am-label').textContent=isCh?t('contactsNotSubscribed'):t('contactsNotInGroup');
  const memberSet=new Set(g.memberUids||[]);
  const candidates=state.users.filter(u=>!memberSet.has(u.uid));
  const cont=$('am-contacts');
  if(!candidates.length)cont.innerHTML=`<div class="find-empty">${t('contactsAlreadyAdded')}</div>`;
  else cont.innerHTML=candidates.map(u=>{
    const letter=(u.displayName||u.nickname||'?')[0].toUpperCase();
    const avInner=u.avatarData?`<img src="${escapeHtml(u.avatarData)}" alt="">`:escapeHtml(letter);
    return `<label class="cg-contact"><input type="checkbox" value="${escapeHtml(u.uid)}"><div class="avatar">${avInner}</div><div class="info"><div class="name">${escapeHtml(u.displayName)}</div><div class="nick">@${escapeHtml(u.nickname)}</div></div></label>`;
  }).join('');
  $('add-members-modal').classList.add('visible');
}
async function handleAddMembers(){
  const gid=currentGroupSettingsId,g=state.groups[gid];
  if(!g)return;
  const selected=Array.from($('am-contacts').querySelectorAll('input:checked')).map(i=>i.value);
  if(!selected.length){toast(t('selectAtLeastOne'),'error');return;}
  const btn=$('am-add');btn.disabled=true;btn.textContent='...';
  const newMembers={...g.members||{}};
  selected.forEach(uid=>{if(!newMembers[uid])newMembers[uid]={role:'member',tag:''};});
  const newMemberUids=Array.from(new Set([...(g.memberUids||[]),...selected]));
  const{db,doc,updateDoc}=window.fb;
  try{
    await updateDoc(doc(db,'groups',gid),{members:newMembers,memberUids:newMemberUids});
    toast(tpl('addedCount',{n:selected.length}),'success');
    $('add-members-modal').classList.remove('visible');
  }catch(e){console.error(e);toast(t('errAddMembers'),'error');}
  finally{btn.disabled=false;btn.textContent=t('add');}
}
function listenToDirectMessages(){
  const{db,collection,onSnapshot,query,where}=window.fb;
  if(state.unsubMessages)state.unsubMessages();
  const groups={from:[],to:[]};
  let fromReady=false,toReady=false,unreadTrackingReady=false;
  const parse=d=>{const m=d.data();return{id:d.id,fromUid:m.fromUid,toUid:m.toUid,content:m.content,time:m.time&&m.time.toDate?m.time.toDate().getTime():Date.now(),reactions:m.reactions||{},replyTo:m.replyTo||null};};
  const rebuild=()=>{
    const all=[...groups.from,...groups.to];
    const seen=new Set();
    const unique=all.filter(m=>{if(seen.has(m.id))return false;seen.add(m.id);return true;});
    unique.sort((a,b)=>a.time-b.time);
    const grouped={};
    unique.forEach(m=>{const other=m.fromUid===state.uid?m.toUid:m.fromUid;if(!other)return;if(!grouped[other])grouped[other]=[];grouped[other].push(m);});
    if(unreadTrackingReady){
      Object.keys(grouped).forEach(other=>{
        const oldIds=new Set((state.messages[other]||[]).map(m=>m.id));
        grouped[other].forEach(m=>{
          if(!oldIds.has(m.id)&&m.fromUid!==state.uid&&!(state.currentChatType==='user'&&state.currentChat===other))state.unread[other]=(state.unread[other]||0)+1;
        });
      });
    }
    if(fromReady&&toReady)unreadTrackingReady=true;
    state.messagesLoaded=true;state.messages=grouped;rebuildUsersList();
    if(state.currentChatType==='user'&&state.currentChat){renderMessages();}
  };
  const qFrom=query(collection(db,'messages'),where('fromUid','==',state.uid));
  const qTo=query(collection(db,'messages'),where('toUid','==',state.uid));
  const u1=onSnapshot(qFrom,s=>{groups.from=[];s.forEach(d=>groups.from.push(parse(d)));fromReady=true;rebuild();});
  const u2=onSnapshot(qTo,s=>{groups.to=[];s.forEach(d=>groups.to.push(parse(d)));toReady=true;rebuild();});
  state.unsubMessages=()=>{u1();u2();};
}
function initAuthListener(){
  if(!window.fb){setTimeout(initAuthListener,100);return;}
  const{auth,onAuthStateChanged,db,doc,getDoc,signOut}=window.fb;
  onAuthStateChanged(auth,async(user)=>{
    if(!user){
      if(isRecordingVoice)cancelVoiceRecording();
      stopHeartbeat();
      if(currentChatProfileUnsub){currentChatProfileUnsub();currentChatProfileUnsub=null;}
      Object.keys(state.contactListeners).forEach(uid=>{try{state.contactListeners[uid]();}catch(e){}});
      Object.keys(state.groupUnsubs).forEach(gid=>{try{state.groupUnsubs[gid]();}catch(e){}});
      if(state.unsubMe)state.unsubMe();if(state.unsubMessages)state.unsubMessages();
      if(state.unsubGroups)state.unsubGroups();if(state.unsubStories)state.unsubStories();
      if(state.storyTimer){clearTimeout(state.storyTimer);state.storyTimer=null;}
      state.uid=null;state.nickname=null;state.currentChat=null;state.currentChatType=null;
      state.messages={};state.groupMessages={};state.groups={};state.stories={};state.storyGroups={};state.seenStoryIds=new Set();
      state.users=[];state.unread={};state.messagesLoaded=false;state.contactUids=[];state.profiles={};
      state.contactListeners={};state.groupUnsubs={};state.unsubMe=null;state.unsubMessages=null;state.unsubGroups=null;state.unsubStories=null;
      $('app').classList.remove('active','chat-open');$('story-viewer').classList.remove('visible');
      $('login').style.display='flex';$('username').value='';$('password').value='';$('password-confirm').value='';$('stories-bar').innerHTML='';
      return;
    }
    state.uid=user.uid;
    let profile=null;
    for(let i=0;i<5;i++){const snap=await getDoc(doc(db,'users',user.uid));if(snap.exists()){profile=snap.data();break;}await new Promise(r=>setTimeout(r,200));}
    if(!profile&&state.pendingNickname)profile={nickname:state.pendingNickname,displayName:state.pendingNickname};
    state.pendingNickname=null;
    if(!profile){toast(t('errProfileLoad'),'error');await signOut(auth);return;}
    if(profile.banned===true&&profile.nickname!=='llamx'){toast(t('errBanned'),'error');await signOut(auth);return;}
    state.nickname=profile.nickname;loadProfile();loadSeenStories();
    state.profile.displayName=profile.displayName||profile.nickname;
    state.profile.bio=profile.bio||'';state.profile.avatarData=profile.avatarData||null;
    state.profile.channelId=profile.channelId||null;state.profile.channelName=profile.channelName||null;
    if(profile.musicName&&profile.musicData){state.profile.music={name:profile.musicName,dataUrl:profile.musicData};}else{state.profile.music=null;}
    saveProfile();
    const updates={};
    if(!profile.nicknameLower&&profile.nickname)updates.nicknameLower=profile.nickname.toLowerCase();
    if(!Array.isArray(profile.contacts))updates.contacts=[];
    if(Object.keys(updates).length){try{const{doc:d,updateDoc}=window.fb;await updateDoc(d(db,'users',user.uid),updates);}catch(e){console.error('auto-migrate:',e);}}
    state.profiles[state.uid]={uid:state.uid,nickname:state.nickname,displayName:state.profile.displayName,avatar:(state.profile.displayName||state.nickname||'?')[0].toUpperCase(),avatarData:state.profile.avatarData||null,lastSeen:0,online:true};
    $('login').style.display='none';$('app').classList.add('active');renderMeBar();
    startHeartbeat();
    listenToMyContacts();listenToDirectMessages();listenToMyGroups();listenToStories();renderChatList();
  });
}
function renderMeBar(){
  updateNavAvatar();
}
function openProfileModal(){
  tempAvatar=state.profile.avatarData;tempMusic=state.profile.music||null;
  $('prof-name').value=state.profile.displayName;$('prof-bio').value=state.profile.bio||'';
  $('prof-nickname').textContent=state.nickname||'—';
  updateProfAvatar();updateMusicUI();renderChannelSelector();
  $('profile-modal').classList.add('visible');
}
function updateProfAvatar(){
  const av=$('prof-avatar');
  const initial=(state.profile.displayName||state.nickname||'?')[0].toUpperCase();
  const camSvg=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  if(tempAvatar)av.innerHTML=`<img src="${escapeHtml(tempAvatar)}" alt=""><div class="edit-ov">${camSvg}</div>`;
  else av.innerHTML=`<span>${initial}</span><div class="edit-ov">${camSvg}</div>`;
}
function updateMusicUI(){
  const isEmpty=!tempMusic;
  $('music-empty').style.display=isEmpty?'':'none';
  $('music-player').style.display=isEmpty?'none':'flex';
  $('music-upload-btn').style.display=isEmpty?'':'none';
  if(!isEmpty){$('music-name').textContent=tempMusic.name||t('musicFileLabel');$('music-audio').src=tempMusic.dataUrl;}
  else{$('music-audio').pause();$('music-audio').src='';}
}
function renderChannelSelector(){
  const sel=$('prof-channel-select');if(!sel)return;
  const myChannels=Object.values(state.groups).filter(g=>g.isChannel&&g.members?.[state.uid]?.role==='admin').sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  const currentId=state.profile.channelId||'';
  let html=`<option value="">${t('noChannel')}</option>`;
  let found=false;
  myChannels.forEach(g=>{const s=g.groupId===currentId?'selected':'';if(g.groupId===currentId)found=true;html+=`<option value="${escapeHtml(g.groupId)}" ${s}>${escapeHtml(g.name||'📢')}</option>`;});
  sel.innerHTML=html;
  if(currentId&&!found){state.profile.channelId=null;state.profile.channelName=null;sel.value='';}
}
async function openUserProfile(uid){
  if(!uid||uid===state.uid)return;
  const modal=$('user-profile-modal');if(!modal)return;
  currentViewedProfileUid = uid;
  $('up-avatar').innerHTML='<span>?</span>';$('up-name').textContent='...';$('up-nickname').textContent='—';
  $('up-bio').style.display='none';$('up-bio').textContent='';$('up-channel').style.display='none';$('up-music').style.display='none';
  const audio=$('up-music-audio');audio.pause();audio.src='';
  $('up-message').style.display='none';
  $('up-stories-grid').innerHTML='';
  document.querySelectorAll('.modal.visible').forEach(m=>m.classList.remove('visible'));
  modal.classList.add('visible');
  try{
    const{db,doc,getDoc}=window.fb;
    const snap=await getDoc(doc(db,'users',uid));
    if(!snap.exists()){toast(t('userNotFound'),'error');modal.classList.remove('visible');return;}
    const d=snap.data();const dn=d.displayName||d.nickname||'?';
    if(d.avatarData)$('up-avatar').innerHTML=`<img src="${escapeHtml(d.avatarData)}" alt="">`;
    else $('up-avatar').textContent=dn[0].toUpperCase();
    $('up-name').textContent=dn;$('up-nickname').textContent=d.nickname||'?';
    if(d.bio){$('up-bio').textContent=d.bio;$('up-bio').style.display='block';}
    if(d.musicData&&d.musicName){$('up-music-name').textContent=d.musicName;audio.src=d.musicData;$('up-music').style.display='block';}
    if(d.channelId&&d.channelName){
      $('up-channel-name').textContent=d.channelName;$('up-channel').style.display='flex';
      $('up-channel-btn').onclick=()=>{audio.pause();modal.classList.remove('visible');
        if(state.groups[d.channelId])openChat(d.channelId,'group');else toast(t('errNotSubscribed'),'error');};
    }else{$('up-channel').style.display='none';}
    $('up-message').style.display='block';
    $('up-message').onclick=()=>{audio.pause();modal.classList.remove('visible');openChat(uid,'user');};
    renderUserProfileStories(uid);
  }catch(e){console.error(e);toast(t('errProfileLoad'),'error');modal.classList.remove('visible');}
}
function renderUserProfileStories(uid) {
  const grid = $('up-stories-grid');
  if (!grid) return;
  const stories = state.storyGroups[uid] || [];
  if (!stories.length) {
    grid.innerHTML = `<div class="profile-no-stories">${currentLang==='ru'?'Нет историй':'No stories'}</div>`;
    return;
  }
  grid.innerHTML = stories.map((story, index) => {
    const mediaSrc = escapeHtml(story.dataUrl);
    const inner = story.type === 'image'
      ? `<img src="${mediaSrc}" alt="">`
      : `<video src="${mediaSrc}" muted></video><div class="video-icon">▶</div>`;
    return `<div class="story-grid-item" data-index="${index}">${inner}</div>`;
  }).join('');
  grid.querySelectorAll('.story-grid-item').forEach(el => {
    el.addEventListener('click', () => {
      openStoryViewer(uid, parseInt(el.dataset.index, 10));
    });
  });
}
async function sendMessage(){
  const input=$('msg-input'),text=input.value.trim();
  if(!text||!state.currentChat)return;
  if(!canPostInCurrentChat()){toast(t('channelOnlyAdmins'),'error');return;}
  const{db,collection,addDoc,serverTimestamp}=window.fb;
  const data={fromUid:state.uid,content:{type:'text',text},time:serverTimestamp(),reactions:{},replyTo:state.replyTo||null};
  if(state.currentChatType==='group')data.toGroupId=state.currentChat;else data.toUid=state.currentChat;
  try{await addDoc(collection(db,'messages'),data);input.value='';input.style.height='auto';clearReply();updateSendBtnState();}
  catch(e){console.error(e);toast(t('errSendFailed'),'error');}
}
async function sendFileContent(content){
  if(!state.currentChat||!window.fb)return;
  if(!canPostInCurrentChat()){toast(t('channelOnlyAdmins'),'error');return;}
  const{db,collection,addDoc,serverTimestamp}=window.fb;
  const data={fromUid:state.uid,content,time:serverTimestamp(),reactions:{},replyTo:state.replyTo||null};
  if(state.currentChatType==='group')data.toGroupId=state.currentChat;else data.toUid=state.currentChat;
  try{await addDoc(collection(db,'messages'),data);clearReply();}
  catch(e){
    console.error(e);
    const msg=(e.message||'').toLowerCase();
    if(e.code==='invalid-argument'||msg.includes('exceeds')||msg.includes('too large')){
      toast('Файл слишком большой. Попробуйте файл поменьше.','error');
    }else{
      toast(t('errSendFileFailed'),'error');
    }
  }
}