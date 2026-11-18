import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import '../css/site.css';
import { gsap } from 'gsap';
import {
  institution,
  team,
  history,
  steps,
  roles,
  benefits,
  stack,
  questions,
  prompts,
  periods,
} from './content.js';
import { startMotion } from './motion.js';
import entry from '../assets/videos/entrada.mp4';
import alternate from '../assets/videos/entrada-alternativa.mp4';
import entryPoster from '../assets/images/entrada.webp';
import alternatePoster from '../assets/images/entrada-alternativa.webp';
import entryScene from '../assets/images/visao-computacional.webp';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const format = new Intl.NumberFormat('pt-BR');
const paths = {
  scan: 'M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3M7 12h10',
  plate: 'M4 15a8 8 0 0 1 16 0M2 15h20M5 19h14M12 4v3',
  chart: 'M4 4v16h16M8 16v-4m4 4V8m4 8v-6m4 6V5',
  spark: 'M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5zM20 2v4m-2-2h4',
  leaf: 'M20 4C8 3 4 8 5 15s15 6 15-11ZM3 21 15 9',
  book: 'M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15',
  school: 'M2 21h20M5 21V10h14v11M3 10l9-7 9 7m-11 11v-6h4v6',
  shield: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-3-11 2 2 4-4',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const safe = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

function externalUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch {
    return '';
  }
}

function link(label, value) {
  const href = externalUrl(value);
  return href ? `<a href="${safe(href)}" rel="noopener noreferrer">${safe(label)}</a>` : '';
}

function photo(src, alt) {
  if (!src || (!externalUrl(src) && !/^\.?\/?assets\/[\w/.-]+$/i.test(src))) return '';
  return `<img src="${safe(src)}" alt="${safe(alt)}" loading="lazy" decoding="async">`;
}

const registration = externalUrl(institution.INSTITUTION_REGISTRATION_URL);
if (registration) {
  $$('[data-registration]').forEach((item) => {
    item.href = registration;
    item.rel = 'noopener noreferrer';
  });
  ['role', 'aria-disabled', 'aria-describedby'].forEach((attribute) =>
    $('#registration-link').removeAttribute(attribute),
  );
  $('#registration-status').hidden = true;
}

const contact = /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(institution.email)
  ? `<a href="mailto:${safe(institution.email)}">${safe(institution.email)}</a>`
  : '';
$('#institutional-links').insertAdjacentHTML(
  'beforeend',
  [
    contact || '<span>Contato institucional a divulgar.</span>',
    link('Política de Privacidade', institution.privacyUrl),
    link('Termos de Uso', institution.termsUrl),
    ...institution.socials.map(({ label, url }) => link(label, url)),
  ].join(''),
);

const menu = $('#menu');
const toggle = $('.menu-toggle');
function closeMenu(restoreFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  menu.classList.remove('is-open');
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', String(menu.classList.toggle('is-open')));
});
menu.addEventListener('click', (event) => {
  const anchor = event.target.closest('a');
  if (!anchor || !menu.classList.contains('is-open')) return;
  closeMenu();
  const target = document.getElementById(anchor.hash.slice(1));
  if (target) {
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
});
matchMedia('(max-width: 900px)').addEventListener('change', () => closeMenu());

const flowText = ['Contagem de entradas', 'Contagem de refeições', 'Indicadores para gestão'];
$('#flow').innerHTML =
  '<span class="flow-path" aria-hidden="true"></span>' +
  steps
    .slice(0, 3)
    .map(
      ([glyph, , , title], index) =>
        `<article class="flow-item"><i data-icon="${glyph}"></i><h3>${index === 2 ? 'Gestão' : title}</h3><p>${flowText[index]}</p></article>`,
    )
    .join('');

const entryIllustration = `<img class="entry-illustration" src="${entryScene}" width="1200" height="670" alt="Cena ilustrativa da portaria escolar com marcações de visão computacional" loading="lazy" decoding="async">`;
$('#steps').innerHTML = steps
  .map(
    ([glyph, title, copy], index) =>
      `<article class="step"><p class="step-index">Etapa ${index + 1} de ${steps.length}</p>${index === 0 ? entryIllustration : `<i class="step-icon" data-icon="${glyph}"></i>`}<h3>${title}</h3><p>${copy}</p></article>`,
  )
  .join('');
const scenes = [
  entryIllustration,
  '<div class="mini-plates"><span></span><span></span><span></span></div>',
  '<div class="mini-bars"><span></span><span></span><span></span><span></span></div>',
  '<div class="mini-chat"><span></span><span></span><span></span></div>',
];
$('#story-visual').innerHTML = steps
  .map(
    ([glyph, , , title, note], index) =>
      `<div class="story-card" ${index ? 'hidden' : ''}>${index ? `<i data-icon="${glyph}"></i>` : ''}${scenes[index]}<h3>${title}</h3><p>${note}</p></div>`,
  )
  .join('');

const video = $('#entry-video');
const canteenVideo = $('#canteen-video');
let entryVisible = false;
const entryObserver = new IntersectionObserver(
  ([record]) => {
    entryVisible = record.isIntersecting && record.intersectionRatio >= 0.5;
    if (entryVisible && !motion.matches && video.paused && !video.ended && video.currentTime === 0) {
      playPreview(video);
    }
  },
  { threshold: 0.5 },
);
entryObserver.observe(video);

function playPreview(player) {
  player.muted = true;
  player.play().catch(() => {
    // Native controls remain available if the browser blocks autoplay.
  });
}

video.addEventListener('ended', () => {
  if (!motion.matches && canteenVideo.paused && canteenVideo.currentTime === 0) {
    playPreview(canteenVideo);
  }
});

const angles = [
  [entry, entryPoster],
  [alternate, alternatePoster],
];
function videoStatus(player) {
  return player.closest('.demo').querySelector('.video-error');
}
$$('.demo video').forEach((player) => {
  function showError() {
    videoStatus(player).hidden = false;
  }
  player.addEventListener('error', showError);
  player.querySelector('source').addEventListener('error', showError);
});
$('#angles').addEventListener('click', (event) => {
  const button = event.target.closest('[data-angle]');
  if (!button || button.getAttribute('aria-pressed') === 'true') return;
  $$('#angles button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  const [src, poster] = angles[Number(button.dataset.angle)];
  videoStatus(video).hidden = true;
  video.pause();
  video.poster = poster;
  video.src = src;
  video.load();
  if (entryVisible && !motion.matches) playPreview(video);
});

function renderDashboard(index, animate = false) {
  const { entry: entries, meals, labels, values } = periods[index];
  const max = Math.max(...values);
  const metrics = [
    [entries, 'Entradas registradas'],
    [meals, 'Refeições servidas'],
  ];
  $('#dash-content').innerHTML = `<div class="metrics">${metrics
    .map(
      ([value, label]) =>
        `<div class="metric"><b data-total="${value}">${format.format(value)}</b><span>${label}</span></div>`,
    )
    .join('')}</div>
    <p class="chart-label">${index ? 'Refeições por dia' : 'Refeições por horário'}</p>
    <ol class="bar-chart">${labels.map((label, i) => `<li aria-label="${label}, ${values[i]} refeições"><span class="bar-track" aria-hidden="true"><span class="bar-fill" style="--value:${(values[i] / max) * 100}%"></span></span><span aria-hidden="true">${label} · ${values[i]}</span></li>`).join('')}</ol>`;
  if (animate && !motion.matches) gsap.from('.bar-fill', { scaleY: 0, duration: 0.38, stagger: 0.045 });
}

$('#dash-controls').addEventListener('click', (event) => {
  const button = event.target.closest('[data-period]');
  if (!button || button.getAttribute('aria-pressed') === 'true') return;
  $$('#dash-controls button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderDashboard(Number(button.dataset.period), true);
});
renderDashboard(0);

let chatTimer;
function renderChat(index, animate = false) {
  clearTimeout(chatTimer);
  const [question, answer, indicator] = prompts[index];
  const chat = $('#chat-log');
  chat.innerHTML = `<p class="chat-user">${question}</p>`;
  function respond() {
    chat.querySelector('.typing')?.remove();
    chat.insertAdjacentHTML(
      'beforeend',
      `<p>${answer}</p><p class="chat-indicator">${indicator} · dados ilustrativos</p>`,
    );
    if (animate && !motion.matches)
      gsap.from([...chat.children].slice(1), { opacity: 0, y: 7, duration: 0.24, stagger: 0.06 });
  }
  if (animate && !motion.matches) {
    chat.insertAdjacentHTML('beforeend', '<p class="typing">Preparando exemplo…</p>');
    chatTimer = setTimeout(respond, 450);
  } else respond();
}
$('#chat-prompts').innerHTML = prompts
  .map(
    ([question], index) =>
      `<button type="button" data-prompt="${index}" aria-pressed="${index === 0}">${question}</button>`,
  )
  .join('');
$('#chat-prompts').addEventListener('click', (event) => {
  const button = event.target.closest('[data-prompt]');
  if (!button) return;
  $$('#chat-prompts button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderChat(Number(button.dataset.prompt), true);
});
renderChat(0);

$('#roles').innerHTML = `<div class="role-buttons" aria-label="Perfis">${roles
  .map(
    ([, title], index) =>
      `<button type="button" data-role="${index}" aria-controls="role-panel" aria-pressed="${index === 0}">${title}</button>`,
  )
  .join('')}</div><article class="role-panel" id="role-panel" aria-live="polite"></article>`;
function renderRole(index, animate = false) {
  const [glyph, title, copy] = roles[index];
  $('#role-panel').innerHTML = `<i>${icon(glyph)}</i><h3>${title}</h3><p>${copy}</p>`;
  if (animate && !motion.matches)
    gsap.from('#role-panel > *', { opacity: 0, rotationY: -7, y: 7, stagger: 0.035, duration: 0.28 });
}
$('.role-buttons').addEventListener('click', (event) => {
  const button = event.target.closest('[data-role]');
  if (!button || button.getAttribute('aria-pressed') === 'true') return;
  $$('.role-buttons button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  renderRole(Number(button.dataset.role), true);
});
renderRole(0);

$('#benefit-grid').innerHTML = benefits
  .map(
    ([glyph, title, copy]) =>
      `<article><i data-icon="${glyph}"></i><h3>${title}</h3><p>${copy}</p></article>`,
  )
  .join('');
$('#timeline').innerHTML = history
  .map(
    ({ title, text, date, photo: src, photoAlt }, index) =>
      `<li><details ${index === 0 ? 'open' : ''}><summary>${safe(title)}${date ? ` · ${safe(date)}` : ''}</summary><p>${safe(text)}</p>${src ? `<figure>${photo(src, photoAlt || title)}</figure>` : ''}</details></li>`,
  )
  .join('');
$('#team').innerHTML = team.length
  ? `<div class="team-grid">${team
      .map(
        ({ name, role, bio, responsibilities = [], photo: src, linkedin, github }) =>
          `<article class="team-card">${photo(src, name)}<h3>${safe(name)}</h3><p>${safe(role)}</p><details><summary>Sobre ${safe(name)}</summary><p>${safe(bio)}</p>${responsibilities.length ? `<ul>${responsibilities.map((item) => `<li>${safe(item)}</li>`).join('')}</ul>` : ''}<div class="selectors">${link('LinkedIn', linkedin)}${link('GitHub', github)}</div></details></article>`,
      )
      .join('')}</div>`
  : '';
$('#stack').innerHTML = stack
  .map(([title, copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`)
  .join('');
$('#questions').innerHTML = questions
  .map(([question, answer]) => `<details name="faq"><summary>${question}</summary><p>${answer}</p></details>`)
  .join('');
$$('[data-icon]').forEach((item) => {
  item.innerHTML = icon(item.dataset.icon);
});

const navLinks = $$('#menu a');
const targets = [...navLinks.map((item) => document.querySelector(item.hash)), $('#problema')];
let frame = 0;
function updateNav() {
  frame = 0;
  const top = $('.header').offsetHeight + 45;
  const visible = [...targets]
    .sort((a, b) => b.offsetTop - a.offsetTop)
    .find((item) => item.getBoundingClientRect().top <= top);
  const active = visible?.id === 'problema' ? 'inicio' : visible?.id;
  navLinks.forEach((item) => {
    if (item.hash === '#' + active) item.setAttribute('aria-current', 'location');
    else item.removeAttribute('aria-current');
  });
}
window.addEventListener(
  'scroll',
  () => {
    if (!frame) frame = requestAnimationFrame(updateNav);
  },
  { passive: true },
);
window.addEventListener('resize', updateNav);
updateNav();

startMotion();
