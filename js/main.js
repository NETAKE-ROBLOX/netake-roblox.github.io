(() => {
// The page is rebuilt from js/site-data.js on every render. Edit that file to change the content.
const LANGS = ['ja', 'en', 'ko'];
const FONTS = {
  round: { label: '丸ゴシック太字（M PLUS Rounded 1c）', q: 'family=M+PLUS+Rounded+1c:wght@500;700;800;900' },
  pop:   { label: 'ポップ（Mochiy Pop One）', q: 'family=Mochiy+Pop+One&family=M+PLUS+Rounded+1c:wght@500;700;800' },
  maru:  { label: 'まるゴシック（Zen Maru Gothic）', q: 'family=Zen+Maru+Gothic:wght@500;700;900' },
  bold:  { label: '太ゴシック（Dela Gothic One）', q: 'family=Dela+Gothic+One&family=Zen+Kaku+Gothic+New:wght@500;700' },
  hand:  { label: '手書き風（Hachi Maru Pop）', q: 'family=Hachi+Maru+Pop&family=Kosugi+Maru' }
};
const DEF_DESIGN = { accent: '#f7559a', bg: '#fff8fa', ink: '#1f1a24', c1: '#6fe3c8', c2: '#ffd84d', c3: '#8ec9ff', font: 'round', pattern: 'dots', radius: 18, swing: true };
const ARTS = { '': 'なし（色だけ）', tomb: 'ピラミッド', wolf: 'オオカミ', sign: '道路標識', virus: 'ウイルス', train: '列車' };
const fontHref = f => 'https://fonts.googleapis.com/css2?' + (FONTS[f] || FONTS.round).q + '&family=Caveat:wght@600&family=Jua&family=Gowun+Dodum&display=swap';
const ICONS = {
  gamepad: '<rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6.5 12h4M8.5 10v4"/><circle cx="15.5" cy="11" r=".9" fill="currentColor"/><circle cx="18" cy="13.2" r=".9" fill="currentColor"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17.5h2"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/><path d="M9 12h1.6l1-2 1.6 4 1-2H16"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M10 17h4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5.5 5"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  ticket: '<path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M14 6v12" stroke-dasharray="2 2.2"/>',
  news: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 8h10M7 12h10M7 16h6"/>',
  medal: '<circle cx="12" cy="14.5" r="5.5"/><path d="M8.5 9.5 6 3h4l2 4.5L14 3h4l-2.5 6.5"/><path d="m12 12 .9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3Z"/>',
  play: '<path d="M7 4.5v15l12-7.5Z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
};
const AWARD_KINDS = { award: 'trophy', event: 'ticket', talk: 'mic', media: 'news', other: 'medal' };
const ICON_NAMES = { calendar: 'カレンダー', gamepad: 'ゲーム', heart: 'ハート', star: '星', trophy: 'トロフィー', users: '人', code: 'コード' };
const svg = n => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.star}</svg>`;

const UI = {
  ja: { home: 'ホーム', games: 'ゲーム', news: 'お知らせ', contact: '連絡', seeGames: 'ゲームを見る', talk: 'お問い合わせ', newsAll: 'すべてのお知らせ', newsEmpty: 'まだお知らせはありません。', gamesH: '制作ゲーム', gamesSub: 'さまざまなジャンルのゲームを制作しています', gamesAll: 'すべてのゲームを見る', client: '受託案件', personal: '個人案件', with: 'クライアント', gamesEmpty: 'このカテゴリーにはまだゲームがありません。', back: '← ホームへ', copy: 'コピー', copied: 'コピーした！', more: '詳しく', iconAlt: 'アイコン', play: 'プレイする', groupsH: '運営グループ', groupsSub: 'ニタケが運営している Roblox グループ', owner: 'オーナー', members: 'メンバー', viewGroup: 'グループを見る', awards: '実績', awardsSub: 'コンテスト受賞、イベント招待・参加など', awardsAll: 'すべての実績を見る', groupsAll: 'すべてのグループを見る', k_award: '受賞', k_event: '招待', k_talk: '登壇', k_media: '掲載', k_other: 'その他' },
  en: { home: 'Home', games: 'Games', news: 'News', contact: 'Contact', seeGames: 'See my games', talk: 'Contact me', newsAll: 'All news', newsEmpty: 'No news yet.', gamesH: 'Games', gamesSub: 'Games across all kinds of genres', gamesAll: 'See all games', client: 'Client work', personal: 'Personal', with: 'Client', gamesEmpty: 'No games in this category yet.', back: '← Back home', copy: 'Copy', copied: 'Copied!', more: 'More', iconAlt: 'Icon', play: 'Play', groupsH: 'Groups I Run', groupsSub: 'Roblox groups run by NETAKE', owner: 'Owner', members: 'members', viewGroup: 'View group', awards: 'Achievements', awardsSub: 'Contest awards, event invitations and more', awardsAll: 'See all achievements', groupsAll: 'See all groups', k_award: 'Award', k_event: 'Invited', k_talk: 'Speaker', k_media: 'Featured', k_other: 'Other' },
  ko: { home: '홈', games: '게임', news: '소식', contact: '연락', seeGames: '게임 보기', talk: '문의하기', newsAll: '모든 소식', newsEmpty: '아직 소식이 없습니다.', gamesH: '제작 게임', gamesSub: '다양한 장르의 게임을 만들고 있습니다', gamesAll: '모든 게임 보기', client: '의뢰 작업', personal: '개인 작업', with: '클라이언트', gamesEmpty: '이 카테고리에는 아직 게임이 없습니다.', back: '← 홈으로', copy: '복사', copied: '복사했어요!', more: '자세히', iconAlt: '아이콘', play: '플레이하기', groupsH: '운영 그룹', groupsSub: '니타케가 운영하는 Roblox 그룹', owner: '오너', members: '멤버', viewGroup: '그룹 보기', awards: '실적', awardsSub: '콘테스트 수상, 이벤트 초대·참가 등', awardsAll: '모든 실적 보기', groupsAll: '모든 그룹 보기', k_award: '수상', k_event: '초대', k_talk: '강연', k_media: '게재', k_other: '기타' }
};

// ---------- data ----------
const published = window.SITE_DATA;
let data = normalize(JSON.parse(JSON.stringify(published)));
function normalize(d) {
  const i18n = o => Object.assign({ ja: '', en: '', ko: '' }, o || {});
  d.design = Object.assign({}, DEF_DESIGN, d.design || {});
  for (const k of ['name', 'role', 'catch', 'lead', 'badge', 'contactTitle', 'contactText']) d[k] = i18n(d[k]);
  d.contacts = d.contacts || []; d.news = d.news || []; d.games = d.games || [];
  d.about = Object.assign({ note: '', items: [] }, d.about || {}); d.about.title = i18n(d.about.title);
  d.about.items.forEach(a => { a.head = i18n(a.head); a.text = i18n(a.text); });
  d.games.forEach(g => { for (const k of ['title', 'status', 'desc']) g[k] = i18n(g[k]); delete g.tags; });
  d.news.forEach(n => { n.text = i18n(n.text); });
  d.groups = d.groups || [];
  d.groups.forEach(g => { g.desc = i18n(g.desc); });
  d.awards = d.awards || [];
  d.awards.forEach(a => { a.title = i18n(a.title); a.desc = i18n(a.desc); delete a.kind; });
  return d;
}

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => /^https?:\/\//i.test(u || '') ? u : '';
const safeImg = u => (/^\/_blob\/[A-Za-z0-9]+$/.test(u || '') || /^(images\/)?[\w.-]+\.(png|jpe?g|gif|webp|svg)$/i.test(u || '') || /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=]+$/.test(u || '')) ? u : '';
// Accepts a full link, a link without https://, or just the place id.
const gameUrl = u => { u = String(u || '').trim(); if (/^\d{4,}$/.test(u)) return 'https://www.roblox.com/games/' + u; if (u && !/^https?:\/\//i.test(u) && /^[\w-]+(\.[\w-]+)+/.test(u)) u = 'https://' + u; return safeUrl(u); };
// Same idea for groups: a full link, a link without https://, or just the group id.
const groupUrl = u => { u = String(u || '').trim(); if (/^\d{3,}$/.test(u)) return 'https://www.roblox.com/groups/' + u; if (u && !/^https?:\/\//i.test(u) && /^[\w-]+(\.[\w-]+)+/.test(u)) u = 'https://' + u; return safeUrl(u); };
const ym = s => { const m = /^(\d{4})-(\d{2})/.exec(s || ''); return m ? `${m[1]}.${m[2]}` : esc(s); };
let lang = 'ja', view = 'home', tab = null;
const t = k => (UI[lang] || UI.ja)[k];
const tx = o => (o && (o[lang] || o.ja)) || '';
const rich = s => esc(s).replace(/\*([^*\n]+)\*/g, '<span class="pk">$1</span>').replace(/\n/g, '<br>');
const lines = s => esc(s).replace(/\n/g, '<br>');
const fmtDate = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? `${m[1]}.${m[2]}.${m[3]}` : esc(s); };
const sortedNews = () => data.news.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));

// ---------- views ----------
function header() {
  const icon = safeImg(data.icon);
  const nav = [['home', '#top'], ['games', '#games'], ...(data.awards.length ? [['awards', '#awards']] : []), ['news', '#news'], ['contact', '#contact']]
    .map(([k, h]) => `<a href="${h}"${(view === k) ? ' aria-current="page"' : ''}>${esc(t(k))}</a>`).join('');
  const langs = [['ja', '日本語'], ['en', 'EN'], ['ko', '한국어']]
    .map(([l, n]) => `<button type="button" data-lang="${l}" lang="${l}" aria-pressed="${lang === l}">${n}</button>`).join('');
  return `<header class="top"><div class="wrap top-in"><a class="brand" href="#top">${icon ? `<img src="${esc(icon)}" alt="">` : ''}${esc(data.brand)}</a>
  <nav class="nav" aria-label="Menu">${nav}</nav><div class="langs" role="group" aria-label="Language">${langs}</div></div></header>`;
}
function gameCard(g) {
  const img = safeImg(g.image), url = gameUrl(g.url);
  const status = tx(g.status);
  const tag = url ? `a href="${esc(url)}" target="_blank" rel="noopener" title="${esc(t('play'))}"` : 'article';
  return `<${tag} class="work">
    <div class="cover"${!img && g.art ? ` data-art="${esc(g.art)}"` : ''}>
      ${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : (g.art ? '<canvas aria-hidden="true"></canvas>' : '')}
      <span class="cat">${esc(t(g.cat === 'client' ? 'client' : 'personal'))}${status ? ' · ' + esc(status) : ''}</span>
      ${img ? '' : `<span class="glyph">${esc(tx(g.title))}</span>`}
    </div>
    <div class="work-body">
      <div class="work-title"><h3>${esc(tx(g.title))}</h3></div>
      ${url ? `<span class="go">${svg('arrow')}</span>` : ''}
      ${g.cat === 'client' && g.client ? `<div class="with">${esc(t('with'))}: ${esc(g.client)}</div>` : ''}
      ${tx(g.desc) ? `<p>${esc(tx(g.desc))}</p>` : ''}
      ${url ? `<span class="play">${svg('play')}${esc(t('play'))}<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></span>` : ''}
    </div></${url ? 'a' : 'article'}>`;
}
function newsList(items) {
  if (!items.length) return `<div class="empty">${esc(t('newsEmpty'))}</div>`;
  return `<ul class="news">${items.map(n => {
    const url = safeUrl(n.url);
    return `<li><time datetime="${esc(n.date)}">${fmtDate(n.date)}</time><div class="nt">${esc(tx(n.text))}${url ? `<a class="more" href="${esc(url)}" target="_blank" rel="noopener">${esc(t('more'))} ${svg('arrow')}</a>` : ''}</div></li>`;
  }).join('')}</ul>`;
}
function aboutBlock() {
  const a = data.about; if (!a.items.length && !tx(a.title)) return '';
  return `<section class="blk" aria-labelledby="about-h"><div class="about">
    <div class="about-h"><small>ABOUT</small><h2 id="about-h">${esc(tx(a.title))}</h2></div>
    <ol class="tl">${a.items.map(it => `<li class="ai"><h3>${lines(tx(it.head))}</h3><p>${esc(tx(it.text))}</p></li>`).join('')}</ol>
  </div></section>`;
}
// Section heading: English eyebrow, heading, optional subline and "see all" link.
function secHead(id, eye, title, sub, more) {
  return `<div class="sec-head"><div><div class="eye" aria-hidden="true">${eye}</div><h2 id="${id}">${esc(title)}</h2></div>${sub ? `<span class="sub">${esc(sub)}</span>` : ''}${more ? `<a class="more" href="${more[0]}">${esc(more[1])} ${svg('arrow')}</a>` : ''}</div>`;
}
const HOME_MAX = 3;
const sortedAwards = () => data.awards.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
function groupsList(list) {
  return `<div class="groups">${list.map(g => {
      const url = groupUrl(g.url), icon = safeImg(g.icon);
      const tag = url ? `a href="${esc(url)}" target="_blank" rel="noopener"` : 'div';
      return `<${tag} class="grp">
        <span class="grp-ic">${icon ? `<img src="${esc(icon)}" alt="" loading="lazy">` : `<span>${esc(String(g.name || '?').trim().slice(0, 1))}</span>`}</span>
        <div class="grp-body">${g.members ? `<div class="grp-meta"><span class="grp-mem">${esc(g.members)} ${esc(t('members'))}</span></div>` : ''}
          <h3>${esc(g.name)}</h3>${tx(g.desc) ? `<p>${esc(tx(g.desc))}</p>` : ''}
          ${url ? `<span class="more">${esc(t('viewGroup'))} ${svg('arrow')}</span>` : ''}</div>
      </${url ? 'a' : 'div'}>`;
    }).join('')}</div>`;
}
function groupsBlock() {
  if (!data.groups.length) return '';
  const more = data.groups.length > HOME_MAX ? ['#groups', `${t('groupsAll')} (${data.groups.length})`] : null;
  return `<section class="blk" aria-labelledby="groups-h">${secHead('groups-h', 'GROUPS', t('groupsH'), t('groupsSub'), more)}${groupsList(data.groups.slice(0, HOME_MAX))}</section>`;
}
function awardsList(list) {
  return `<ol class="awards">${list.map(a => {
    const url = safeUrl(a.url), m = /^(\d{4})-(\d{2})/.exec(a.date || '');
    return `<li class="aw">${m ? `<time class="aw-date" datetime="${esc(a.date)}"><b>${m[1]}</b><span>${Number(m[2])}${lang === 'en' ? '' : lang === 'ko' ? '월' : '月'}</span></time>` : '<span class="aw-date" aria-hidden="true"></span>'}
      <div class="aw-body"><h3>${esc(tx(a.title))}</h3>${tx(a.desc) ? `<p>${esc(tx(a.desc))}</p>` : ''}
      ${url ? `<a class="more" href="${esc(url)}" target="_blank" rel="noopener">${esc(t('more'))} ${svg('arrow')}</a>` : ''}</div></li>`;
  }).join('')}</ol>`;
}
function awardsBlock() {
  if (!data.awards.length) return '';
  const more = data.awards.length > HOME_MAX ? ['#awards', `${t('awardsAll')} (${data.awards.length})`] : null;
  return `<section class="blk" aria-labelledby="awards-h">${secHead('awards-h', 'ACHIEVEMENTS', t('awards'), t('awardsSub'), more)}${awardsList(sortedAwards().slice(0, HOME_MAX))}</section>`;
}
// Brand marks for common services, picked from the service name or the link; anything else shows its name as text.
const SNS = {
  roblox: { c: '#1f1f1f', p: '<path fill-rule="evenodd" d="M6.3 1.6 1.6 17.7l16.1 4.7 4.7-16.1ZM10.5 9.4l-1.1 4 4 1.1 1.1-4Z"/>' },
  x: { c: '#000000', p: '<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12Z"/>' },
  discord: { c: '#5865f2', p: '<path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04A19.7 19.7 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .09.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z"/>' },
  youtube: { c: '#ff0000', p: '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6Z"/>' }
};
function snsOf(c) {
  const s = (String(c.label || '') + ' ' + String(c.url || '')).toLowerCase();
  if (s.includes('roblox')) return 'roblox';
  if (s.includes('discord')) return 'discord';
  if (s.includes('youtu')) return 'youtube';
  if (/^\s*(x|twitter)\b/.test(String(c.label || '').toLowerCase()) || /\/\/(www\.)?(x|twitter)\.com/.test(s)) return 'x';
  return '';
}
function contactKey(c) {
  const k = snsOf(c);
  return k ? `<span class="sns" style="background:${SNS[k].c}" role="img" aria-label="${esc(c.label || k)}" title="${esc(c.label || k)}"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">${SNS[k].p}</svg></span>`
    : `<span class="k">${esc(c.label)}</span>`;
}
function contactBlock() {
  const rows = data.contacts.map((c, i) => {
    const url = safeUrl(c.url);
    return url
      ? `<a href="${esc(url)}" target="_blank" rel="noopener">${contactKey(c)}<span class="v">${esc(c.value)}</span><span class="go">${svg('arrow')}</span></a>`
      : `<div class="row">${contactKey(c)}<span class="v" id="cv-${i}">${esc(c.value)}</span><button class="copy" type="button" data-copy="${i}">${esc(t('copy'))}</button></div>`;
  }).join('');
  return `<section class="blk" id="contact" aria-labelledby="contact-h"><div class="contact">
    <div><div class="eye" aria-hidden="true">CONTACT</div><h2 id="contact-h">${lines(tx(data.contactTitle))}</h2>${tx(data.contactText) ? `<p>${esc(tx(data.contactText))}</p>` : ''}</div>
    <div class="links">${rows}</div></div></section>`;
}
function homeView() {
  const icon = safeImg(data.icon);
  const pinned = data.games.filter(g => g.pin);
  const shown = (pinned.length ? pinned : data.games).slice(0, 6);
  const role = tx(data.role), name = tx(data.name);
  const band = data.games.map(g => `<span>${esc(tx(g.title))}</span>`).join('');
  return `<main id="top">
    <section class="hero"><span class="dots d1" aria-hidden="true"></span><span class="dots d2" aria-hidden="true"></span>
      <div class="wrap hero-in"><div class="hero-copy">
        <span class="label">${esc([role, name].filter(Boolean).join(' '))}</span>
        <h1>${rich(tx(data.catch))}</h1>
        ${tx(data.lead) ? `<p class="lead">${esc(tx(data.lead))}</p>` : ''}
        <div class="cta"><a class="btn main" href="#games">${esc(t('seeGames'))} ${svg('arrow')}</a><a class="btn" href="#contact">${esc(t('talk'))}</a></div>
      </div>
      <div class="stage"><div class="disc" aria-hidden="true"></div>
        ${icon ? `<img class="charm" src="${esc(icon)}" alt="${esc(data.brand + ' ' + t('iconAlt'))}">` : ''}
        ${tx(data.badge) ? `<span class="bubble">${lines(tx(data.badge))}</span>` : ''}
        <span class="spark s1" aria-hidden="true"></span><span class="spark s2" aria-hidden="true"></span><span class="spark s3" aria-hidden="true"></span><span class="zip" aria-hidden="true"></span>
      </div></div>
    </section>
    ${data.games.length ? `<div class="band"><div class="wrap band-in"><a class="band-label" href="#games">GAMES</a><div class="band-scroll" aria-hidden="true"><div class="band-track">${band}${band}</div></div><a class="band-arrow" href="#games" aria-label="${esc(t('gamesAll'))}">${svg('arrow')}</a></div></div>` : ''}
    <div class="wrap">
      ${aboutBlock()}
      <section class="blk" aria-labelledby="games-h">${secHead('games-h', 'GAMES', t('gamesH'), t('gamesSub'), ['#games', `${t('gamesAll')} (${data.games.length})`])}
        ${shown.length ? `<div class="works">${shown.map(gameCard).join('')}</div>` : `<div class="empty">${esc(t('gamesEmpty'))}</div>`}</section>
      ${groupsBlock()}
      ${awardsBlock()}
      <section class="blk" aria-labelledby="news-h">${secHead('news-h', 'NEWS', t('news'), '', data.news.length > HOME_MAX ? ['#news', `${t('newsAll')} (${data.news.length})`] : null)}${newsList(sortedNews().slice(0, HOME_MAX))}</section>
      ${contactBlock()}
    </div>
  </main>`;
}
function gamesView() {
  const counts = { client: data.games.filter(g => g.cat === 'client').length, personal: data.games.filter(g => g.cat !== 'client').length };
  if (!tab) tab = counts.client ? 'client' : 'personal';
  const list = data.games.filter(g => (g.cat === 'client') === (tab === 'client'));
  const tabs = ['client', 'personal'].map(k => `<button type="button" data-tab="${k}" aria-pressed="${tab === k}">${esc(t(k))}<span class="n">${counts[k]}</span></button>`).join('');
  return `<main id="top" class="wrap">${pageHead('GAMES', t('gamesH'))}
    <div class="tabs" role="group" aria-label="${esc(t('games'))}">${tabs}</div>
    ${list.length ? `<div class="works full">${list.map(gameCard).join('')}</div>` : `<div class="empty">${esc(t('gamesEmpty'))}</div>`}
  </main>`;
}
const pageHead = (eye, title) => `<div class="page-head"><a class="back" href="#top">${esc(t('back'))}</a><div><div class="eye" aria-hidden="true">${eye}</div><h1>${esc(title)}</h1></div></div>`;
function newsView() {
  return `<main id="top" class="wrap">${pageHead('NEWS', t('news'))}<section class="blk" style="padding-top:20px">${newsList(sortedNews())}</section></main>`;
}
function groupsView() {
  return `<main id="top" class="wrap">${pageHead('GROUPS', t('groupsH'))}<section class="blk" style="padding-top:20px">${data.groups.length ? groupsList(data.groups) : `<div class="empty">—</div>`}</section></main>`;
}
function awardsView() {
  return `<main id="top" class="wrap">${pageHead('ACHIEVEMENTS', t('awards'))}<section class="blk" style="padding-top:20px">${data.awards.length ? awardsList(sortedAwards()) : `<div class="empty">—</div>`}</section></main>`;
}
const VIEWS = { games: () => gamesView(), news: () => newsView(), groups: () => groupsView(), awards: () => awardsView() };

// ---------- render ----------
const app = document.getElementById('app');
function applyDesign() {
  const d = data.design, root = document.documentElement;
  for (const k of ['accent', 'bg', 'ink', 'c1', 'c2', 'c3']) root.style.setProperty('--' + k, d[k]);
  root.style.setProperty('--r', (Number(d.radius) || 0) + 'px');
  root.dataset.font = FONTS[d.font] ? d.font : 'round';
  root.dataset.pattern = d.pattern || 'none';
  root.dataset.swing = d.swing ? '1' : '0';
  root.lang = lang;
  const link = document.getElementById('font-link'), href = fontHref(d.font);
  if (link && link.getAttribute('href') !== href) link.setAttribute('href', href);
}
function render() {
  applyDesign();
  const icon = safeImg(data.icon);
  app.innerHTML = `${header()}${(VIEWS[view] || homeView)()}<footer class="wrap">${icon ? `<img src="${esc(icon)}" alt="">` : ''}© ${new Date().getFullYear()} ${esc(data.brand)}</footer>`;
  paint();
}
let rq = 0;
const renderSoon = () => { clearTimeout(rq); rq = setTimeout(render, 30); };

function route() {
  const parts = location.hash.slice(1).split('-');
  const l = parts.find(p => LANGS.includes(p)); if (l) setLangVar(l);
  const v = parts.find(p => VIEWS[p]);
  const prev = view; view = v || 'home';
  render();
  if (parts.includes('contact')) document.getElementById('contact')?.scrollIntoView();
  else if (prev !== view || parts[0] === 'top') scrollTo(0, 0);
}
function setLangVar(l) { lang = LANGS.includes(l) ? l : 'ja'; try { localStorage.setItem('lang', lang); } catch {} }

document.addEventListener('click', e => {
  const lb = e.target.closest('[data-lang]');
  if (lb) { setLangVar(lb.dataset.lang); render(); return; }
  const tb = e.target.closest('[data-tab]');
  if (tb) { tab = tb.dataset.tab; render(); return; }
  const cb = e.target.closest('[data-copy]');
  if (cb) {
    const el = document.getElementById('cv-' + cb.dataset.copy);
    const done = () => { cb.textContent = t('copied'); setTimeout(() => { cb.textContent = t('copy'); }, 1600); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    try { navigator.clipboard.writeText(el.textContent).then(done, sel); } catch { sel(); }
  }
});
addEventListener('hashchange', route);

// ---------- cover illustrations ----------
const INK = '#1d1420';
function stroke(g, w) { g.lineWidth = w; g.strokeStyle = INK; g.lineJoin = 'round'; g.stroke(); }
const arts = {
  tomb(g, w, h, u) {
    g.fillStyle = '#ffcf5c'; g.fillRect(0, 0, w, h); g.fillStyle = '#ffb347';
    for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(w * .5, h * .55); const a = i / 12 * Math.PI * 2; g.arc(w * .5, h * .55, w, a, a + .26); g.fill(); }
    g.fillStyle = '#e8a25a'; g.beginPath(); g.moveTo(w * .14, h); g.lineTo(w * .5, h * .12); g.lineTo(w * .86, h); g.closePath(); g.fill(); stroke(g, 3 * u);
    g.fillStyle = '#4a2c5a'; g.beginPath(); g.moveTo(w * .42, h); g.lineTo(w * .42, h * .62); g.arc(w * .5, h * .62, w * .08, Math.PI, 0); g.lineTo(w * .58, h); g.fill(); stroke(g, 3 * u);
  },
  wolf(g, w, h, u) {
    g.fillStyle = '#ff8a7a'; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16 * u) for (let x = (y / (16 * u)) % 2 ? -14 * u : 0; x < w; x += 30 * u) { g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(x + 2 * u, y + 2 * u, 26 * u, 12 * u); }
    g.fillStyle = '#5b4a6b'; g.beginPath(); g.moveTo(w * .3, h); g.lineTo(w * .32, h * .5); g.lineTo(w * .38, h * .3); g.lineTo(w * .44, h * .44); g.lineTo(w * .56, h * .44); g.lineTo(w * .62, h * .3); g.lineTo(w * .68, h * .5); g.lineTo(w * .7, h); g.fill(); stroke(g, 3 * u);
    [[.44, .56], [.56, .56]].forEach(([x, y]) => { g.fillStyle = '#ffe14d'; g.beginPath(); g.arc(w * x, h * y, 9 * u, 0, 7); g.fill(); stroke(g, 2 * u); });
  },
  sign(g, w, h, u) {
    g.fillStyle = '#8ec9ff'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#b6f0c8'; g.fillRect(0, h * .8, w, h * .2); g.beginPath(); g.moveTo(0, h * .8); g.lineTo(w, h * .8); stroke(g, 3 * u);
    [[.18, '#ffd84d', 'd'], [.4, '#ff5f7a', 'c'], [.62, '#5b8cff', 'c'], [.84, '#ffd84d', 'd']].forEach(([x, col, s], i) => {
      const cx = w * x, top = h * (.34 + (i % 2) * .06), r = h * .11;
      g.fillStyle = '#fff'; g.fillRect(cx - 3 * u, top, 6 * u, h * .8 - top); g.strokeStyle = INK; g.lineWidth = 2 * u; g.strokeRect(cx - 3 * u, top, 6 * u, h * .8 - top);
      g.fillStyle = col; g.beginPath();
      if (s === 'c') g.arc(cx, top, r, 0, 7); else { g.moveTo(cx, top - r); g.lineTo(cx + r, top); g.lineTo(cx, top + r); g.lineTo(cx - r, top); g.closePath(); }
      g.fill(); stroke(g, 3 * u);
      if (i === 2) { g.fillStyle = INK; [-.35, .35].forEach(d => { g.beginPath(); g.arc(cx + r * d, top - r * .1, 3 * u, 0, 7); g.fill(); }); }
    });
  },
  virus(g, w, h, u) {
    g.fillStyle = '#c8a6ff'; g.fillRect(0, 0, w, h);
    let s = 7; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 14; i++) { g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.arc(r() * w, r() * h, (8 + r() * 22) * u, 0, 7); g.fill(); }
    const cx = w * .5, cy = h * .52, R = h * .2;
    for (let a = 0; a < 10; a++) {
      const q = a / 10 * Math.PI * 2;
      g.beginPath(); g.moveTo(cx + Math.cos(q) * R, cy + Math.sin(q) * R); g.lineTo(cx + Math.cos(q) * R * 1.45, cy + Math.sin(q) * R * 1.45); stroke(g, 3 * u);
      g.fillStyle = '#ff5fa2'; g.beginPath(); g.arc(cx + Math.cos(q) * R * 1.5, cy + Math.sin(q) * R * 1.5, 7 * u, 0, 7); g.fill(); stroke(g, 2.5 * u);
    }
    g.fillStyle = '#6fe3c8'; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); stroke(g, 3 * u);
    g.fillStyle = INK; [-.35, .35].forEach(d => { g.beginPath(); g.arc(cx + R * d, cy - R * .1, 5 * u, 0, 7); g.fill(); });
  },
  train(g, w, h, u) {
    g.fillStyle = '#2b2d5c'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(i * w / 6 + w / 24, h * .12, w / 12, h * .2); }
    g.strokeStyle = '#6fe3c8'; g.lineWidth = 4 * u; [.86, .93].forEach(y => { g.beginPath(); g.moveTo(0, h * y); g.lineTo(w, h * y); g.stroke(); });
    g.fillStyle = '#ffffff'; g.beginPath(); g.moveTo(w * 1.05, h * .44); g.lineTo(w * .32, h * .44); g.quadraticCurveTo(w * .06, h * .5, w * .05, h * .8); g.lineTo(w * 1.05, h * .8); g.closePath(); g.fill(); stroke(g, 3 * u);
    g.fillStyle = '#5b8cff'; g.fillRect(w * .3, h * .52, w * .75, h * .09);
    g.fillStyle = '#ff5fa2'; g.fillRect(w * .1, h * .7, w * .95, 5 * u);
  }
};
function paint() {
  document.querySelectorAll('.cover[data-art]').forEach(el => {
    const c = el.querySelector('canvas'), fn = arts[el.dataset.art]; if (!c || !fn) return;
    const b = el.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    c.width = Math.max(1, b.width * d); c.height = Math.max(1, b.height * d);
    fn(c.getContext('2d'), c.width, c.height, d);
  });
}
let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(paint, 150); });

// ---------- start ----------
{
  let saved = null; try { saved = localStorage.getItem('lang'); } catch {}
  const nav = (navigator.language || '').slice(0, 2);
  lang = LANGS.includes(saved) ? saved : LANGS.includes(nav) ? nav : 'ja';
}
route();
})();
