/* ─────────────────────────────────────────
   現象化OS v0.1 — script.js
   ───────────────────────────────────────── */

const STORAGE_KEY = 'genshouka_os_v01';

const LAYERS = ['I', 'M', 'S', 'F', 'E', 'T'];
const LAYER_NAMES = {
  I: '情報',
  M: '媒体',
  S: '構造',
  F: '力',
  E: 'エネルギー',
  T: '時間',
};

// ── DOM refs ─────────────────────────────

const $target   = document.getElementById('target');
const $before   = document.getElementById('before');
const $after    = document.getElementById('after');
const $btnAnalyze = document.getElementById('btn-analyze');
const $btnReset   = document.getElementById('btn-reset');
const $btnCopy    = document.getElementById('btn-copy');
const $resultSection = document.getElementById('result-section');

const $gaugeFill  = document.getElementById('gauge-fill');
const $gaugeText  = document.getElementById('gauge-text');
const $missingLayers  = document.getElementById('missing-layers');
const $currentState   = document.getElementById('current-state');
const $deltaRead      = document.getElementById('delta-read');
const $phenomenonRead = document.getElementById('phenomenon-read');
const $nextStep       = document.getElementById('next-step');

// ── Helpers ───────────────────────────────

function getLayerValue(layer) {
  return (document.getElementById('layer-' + layer)?.value || '').trim();
}

function getValue(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function filled(str) {
  return str.length > 0;
}

// ── Persist ───────────────────────────────

function saveToStorage() {
  const data = {
    target: getValue('target'),
    before: getValue('before'),
    after:  getValue('after'),
  };
  LAYERS.forEach(l => { data['layer_' + l] = getLayerValue(l); });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {}
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.target) $target.value = data.target;
    if (data.before) $before.value = data.before;
    if (data.after)  $after.value  = data.after;
    LAYERS.forEach(l => {
      const el = document.getElementById('layer-' + l);
      if (el && data['layer_' + l]) el.value = data['layer_' + l];
    });
  } catch (_) {}
}

// ── Analysis ──────────────────────────────

function analyze() {
  const target = getValue('target');
  const before = getValue('before');
  const after  = getValue('after');

  const layerValues = {};
  LAYERS.forEach(l => { layerValues[l] = getLayerValue(l); });

  const presentLayers = LAYERS.filter(l => filled(layerValues[l]));
  const missingLayers = LAYERS.filter(l => !filled(layerValues[l]));
  const count = presentLayers.length;

  // ── 1. Gauge
  const pct = Math.round((count / 6) * 100);
  $gaugeFill.style.width = pct + '%';
  $gaugeFill.style.background = pct <= 33 ? '#E84040' : pct <= 66 ? '#F4A72A' : '#1DB87A';
  $gaugeText.textContent = count + ' / 6';

  if (missingLayers.length > 0) {
    $missingLayers.textContent = '不足レイヤー：' + missingLayers.join('、');
  } else {
    $missingLayers.textContent = 'すべてのレイヤーが入力されています';
    $missingLayers.style.color = '#1DB87A';
  }

  // ── 2. Current state
  const states = [];
  if (!filled(layerValues['I'])) states.push('これはまだ情報の段階です');
  if (!filled(layerValues['M'])) states.push('媒体が未設定です');
  if (!filled(layerValues['S'])) states.push('構造が未設定です');
  if (!filled(layerValues['F'])) states.push('押す力／動かす力が未設定です');
  if (!filled(layerValues['E'])) states.push('エネルギーが未設定です');
  if (!filled(layerValues['T'])) states.push('時間が未設定です');

  if (states.length === 0) {
    $currentState.textContent = '現象化に近いです';
  } else {
    $currentState.textContent = states.join('\n');
  }

  // ── 3. ΔI reading
  if (!filled(before) || !filled(after)) {
    $deltaRead.textContent = 'ΔI はまだ未設定です。変化前と変化後を書くと、情報の変化が見えます。';
  } else {
    $deltaRead.textContent = '「' + before + '」から\n「' + after + '」への変化を現象にしようとしています。';
  }

  // ── 4. Phenomenon reading
  const targetLabel = filled(target) ? '「' + target + '」' : '〔対象未設定〕';
  const lines = [];

  lines.push(targetLabel + 'を現象にするために、');

  if (filled(layerValues['I'])) {
    lines.push('情報「' + layerValues['I'] + '」を、');
  } else {
    lines.push('情報〔未設定〕を、');
  }

  if (filled(layerValues['M'])) {
    lines.push('媒体「' + layerValues['M'] + '」に乗せ、');
  } else {
    lines.push('媒体〔未設定〕に乗せ、');
  }

  if (filled(layerValues['S'])) {
    lines.push('構造「' + layerValues['S'] + '」として並べ、');
  } else {
    lines.push('構造〔未設定〕として並べ、');
  }

  if (filled(layerValues['F'])) {
    lines.push('力「' + layerValues['F'] + '」で動かし、');
  } else {
    lines.push('力〔未設定〕で動かし、');
  }

  if (filled(layerValues['E'])) {
    lines.push('エネルギー「' + layerValues['E'] + '」のもとで、');
  } else {
    lines.push('エネルギー〔未設定〕のもとで、');
  }

  if (filled(layerValues['T'])) {
    lines.push('時間「' + layerValues['T'] + '」に変化させようとしています。');
  } else {
    lines.push('時間〔未設定〕に変化させようとしています。');
  }

  $phenomenonRead.textContent = lines.join('\n');

  // ── 5. Next step
  if (missingLayers.length === 0) {
    $nextStep.textContent = '不足レイヤー：なし\n次に見る場所：ΔI（変化前・変化後）の精度を上げる。';
  } else {
    const next = missingLayers[0];
    const hints = {
      I: '情報とは何か。どんな記録・感情・知識がこの現象に関わっているか。',
      M: '情報をどの媒体に乗せるか。言葉か、身体か、空間か。',
      S: '情報がどう並ぶと意味になるか。順序、対比、階層を考える。',
      F: '何がこの情報を動かすか。何が押すか、何が重いか。',
      E: '動かす余力はあるか。時間・体力・集中力・リソースを確認する。',
      T: 'いつ変化するか。タイミング・期限・継続性を設定する。',
    };
    $nextStep.textContent = '不足レイヤー：' + next + '（' + LAYER_NAMES[next] + '）\n次に見る場所：' + hints[next];
  }

  // ── Show result
  $resultSection.classList.remove('hidden');
  $resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Copy ─────────────────────────────────

function buildCopyText() {
  const target = getValue('target') || '〔未設定〕';
  const before = getValue('before') || '〔未設定〕';
  const after  = getValue('after') || '〔未設定〕';

  const layerValues = {};
  LAYERS.forEach(l => { layerValues[l] = getLayerValue(l) || '〔未設定〕'; });

  const presentLayers = LAYERS.filter(l => getLayerValue(l).length > 0);
  const missingLayers = LAYERS.filter(l => !getLayerValue(l).length);
  const count = presentLayers.length;

  return [
    '── 現象化OS v0.1 ──',
    '',
    '現象にしたいもの：' + target,
    '',
    '【現象化度】',
    count + ' / 6',
    missingLayers.length > 0 ? '不足レイヤー：' + missingLayers.join('、') : 'すべてのレイヤーが入力されています',
    '',
    '【現在の状態】',
    $currentState.textContent,
    '',
    '【ΔI の読み】',
    $deltaRead.textContent,
    '',
    '【現象化の読み】',
    $phenomenonRead.textContent,
    '',
    '【次の一手】',
    $nextStep.textContent,
    '',
    '──────────────────',
    '情報は、媒体・構造・力・エネルギー・時間を通って現象になる。',
  ].join('\n');
}

function copyResult() {
  const text = buildCopyText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = $btnCopy.textContent;
      $btnCopy.textContent = 'コピー済み ✓';
      setTimeout(() => { $btnCopy.textContent = orig; }, 1800);
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
    const orig = $btnCopy.textContent;
    $btnCopy.textContent = 'コピー済み ✓';
    setTimeout(() => { $btnCopy.textContent = orig; }, 1800);
  } catch (_) {}
  document.body.removeChild(el);
}

// ── Reset ─────────────────────────────────

function resetAll() {
  const ok = window.confirm('入力内容をすべてリセットしますか？\nこの操作は元に戻せません。');
  if (!ok) return;

  $target.value = '';
  $before.value = '';
  $after.value  = '';
  LAYERS.forEach(l => {
    const el = document.getElementById('layer-' + l);
    if (el) el.value = '';
  });

  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}

  $resultSection.classList.add('hidden');
  $gaugeFill.style.width = '0%';
  $missingLayers.style.color = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Auto-save on input ────────────────────

function bindAutoSave() {
  const allTextareas = document.querySelectorAll('textarea');
  allTextareas.forEach(el => {
    el.addEventListener('input', saveToStorage);
  });
}

// ── Init ──────────────────────────────────

loadFromStorage();
bindAutoSave();

$btnAnalyze.addEventListener('click', () => {
  analyze();
  saveToStorage();
});

$btnReset.addEventListener('click', resetAll);
$btnCopy.addEventListener('click', copyResult);
