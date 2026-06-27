/* ─────────────────────────────────────────
   現象化OS v0.2 — script.js
   ───────────────────────────────────────── */

'use strict';

/* ══════════════════════════════════════════
   辞書データ
══════════════════════════════════════════ */

const phenomenonDictionary = [
  {
    id: "eat",
    emoji: "🍚",
    category: "食べる",
    role: "身体リソース補給",
    keywords: ["食べる", "ご飯", "朝ご飯", "飯", "空腹", "腹減った", "食事"],
    I: "空腹感、食べ物の有無、所持金、食べられるもの、身体燃料の不足",
    M: "食べ物、口、胃、皿、台所、コンビニ、店",
    S: "選ぶ → 用意する → 食べる → 胃に入る → 終える",
    F: "空腹、手を伸ばす、立つ、温める、噛む、飲み込む",
    E: "立てるか、作れるか、買いに行けるか、噛む余力があるか",
    T: "今、10分以内、朝のうち、空腹が強くなる前",
    before: "空腹、身体燃料が少ない、判断が荒くなりやすい",
    after: "胃に燃料が入り、判断と身体状態が少し安定する",
    delta: "空腹 → 身体燃料が入る",
    next: "食べ物を1つだけ目の前に出す"
  },
  {
    id: "sleep",
    emoji: "💤",
    category: "寝る",
    role: "睡眠移行・回復",
    keywords: ["寝る", "眠い", "睡眠", "布団", "横になる", "寝たい", "眠気"],
    I: "眠気、疲労、薬の状態、明日の予定、現在の覚醒レベル",
    M: "布団、枕、部屋、照明、スマホ、充電場所",
    S: "画面を閉じる → 光を落とす → 横になる → 入眠する",
    F: "眠気、重力、スマホを置く、照明を消す、身体を横にする",
    E: "起き続ける余力が下がっている、回復に回す身体リソース",
    T: "夜、消灯後、今から30分以内、眠気が来ている間",
    before: "覚醒している、脳が動き続けている、身体が回復待ち",
    after: "睡眠に入り、身体修復フェーズへ移行する",
    delta: "覚醒 → 睡眠",
    next: "スマホを充電位置に置き、画面を閉じる"
  },
  {
    id: "rest",
    emoji: "🛋️",
    category: "休む／怠ける",
    role: "稼働率調整・省エネ制御",
    keywords: ["休む", "怠ける", "サボる", "何もしない", "だるい", "疲れた", "停止"],
    I: "疲労感、飽和感、処理過多、身体の停止信号",
    M: "椅子、床、布団以外の休憩場所、スマホ、静かな場所",
    S: "止まる → 負荷を下げる → 回復を待つ → 再開可能性を見る",
    F: "作業圧を下げる、選択肢を減らす、身体を固定する",
    E: "残エネルギーを温存する、回復に回す",
    T: "今、数分、一区切り、疲労が強い間",
    before: "稼働率が高すぎる、処理が詰まっている",
    after: "負荷が下がり、再起動の余地が生まれる",
    delta: "過稼働 → 省エネ状態",
    next: "やることを増やさず、まず停止状態を許可する"
  },
  {
    id: "tidy",
    emoji: "🧹",
    category: "片付ける",
    role: "空間の検索性改善",
    keywords: ["片付け", "掃除", "部屋", "整理", "散らかってる", "ゴミ", "探せない"],
    I: "物の位置、必要な物、不要な物、探している物",
    M: "床、机、棚、ゴミ袋、箱、収納場所",
    S: "一箇所だけ見る → 分ける → 捨てる／置く → 通路を作る",
    F: "手で拾う、袋に入れる、移動する、視界から減らす",
    E: "立てるか、しゃがめるか、5分だけ動けるか",
    T: "今から5分、訪看前、出かける前、寝る前ではない時間",
    before: "物理アセットが散らばり、探索コストが高い",
    after: "必要な物へアクセスしやすくなり、行動の詰まりが減る",
    delta: "検索しにくい空間 → 探しやすい空間",
    next: "床か机のどちらか一箇所だけ選ぶ"
  },
  {
    id: "go_out",
    emoji: "🚶",
    category: "外に出る／移動する",
    role: "環境変更・移動",
    keywords: ["外", "外出", "散歩", "買い物", "Uber", "ロードー", "出る", "歩く", "電車", "自転車"],
    I: "目的地、天気、所持金、体力、移動手段、必要物",
    M: "靴、鍵、スマホ、財布、道、駅、自転車、バッグ",
    S: "持ち物確認 → 靴を履く → ドアを出る → 移動する",
    F: "立つ、歩く、ドアを開ける、乗る、運ぶ",
    E: "外気に耐える体力、移動する余力、帰ってくる余力",
    T: "今、昼、夕方、天気が崩れる前、暑さが強くなる前",
    before: "室内に固定され、環境入力が閉じている",
    after: "外部環境に接続され、移動と入力が発生する",
    delta: "室内固定 → 外部接続",
    next: "鍵・スマホ・財布の3点だけ確認する"
  },
  {
    id: "body_care",
    emoji: "💧",
    category: "体を整える",
    role: "身体条件の基礎調整",
    keywords: ["水", "飲む", "薬", "風呂", "シャワー", "ストレッチ", "体調", "整える", "歯磨き"],
    I: "喉の渇き、薬の時間、汗、こわばり、口内状態、身体の違和感",
    M: "水、薬、洗面所、風呂場、タオル、歯ブラシ、身体",
    S: "気づく → 道具を取る → 実行する → 身体状態を戻す",
    F: "飲む、洗う、伸ばす、磨く、薬を口に入れる",
    E: "立つ余力、洗う余力、短時間だけ動ける余力",
    T: "今、薬の時間、外出前、寝る前、汗をかいた後",
    before: "身体条件が荒れており、判断や行動にノイズがある",
    after: "身体条件が少し整い、次の判断がしやすくなる",
    delta: "身体ノイズあり → 基礎条件の安定",
    next: "水・薬・歯ブラシのうち、一番近いものを使う"
  },
  {
    id: "contact",
    emoji: "📞",
    category: "連絡する／話す",
    role: "外部との情報交換",
    keywords: ["連絡", "LINE", "電話", "メール", "返信", "話す", "相談", "訪看", "友人", "ラウンジ"],
    I: "伝えたい内容、相手、用件、返答待ちの情報",
    M: "LINE、電話、メール、会話、メモ、ラウンジ、訪看の場",
    S: "相手を選ぶ → 用件を短くする → 送る／話す → 反応を受け取る",
    F: "文字を打つ、声を出す、送信する、話しかける",
    E: "対人エネルギー、文章を書く余力、声を出す余力",
    T: "今、相手が見やすい時間、訪看時、食堂やラウンジにいる時",
    before: "情報が自分の中だけに留まっている",
    after: "外部へ情報が渡り、反応や入力が返ってくる可能性が生まれる",
    delta: "内側の情報 → 外部との情報交換",
    next: "用件を一文だけにする"
  },
  {
    id: "make",
    emoji: "🛠️",
    category: "作る／作業する",
    role: "創作・制作・労働",
    keywords: ["作る", "作業", "アプリ", "GitHub", "コード", "AI", "Pages", "記事", "note", "書く", "制作"],
    I: "アイデア、仕様、素材、コード、文章、改善点",
    M: "iPhone、GitHub Pages、ChatGPT、Gemini、Copilot、HTML/CSS/JS、note",
    S: "アイデア → 仕様 → 形にする → 確認する → 修正する",
    F: "入力する、コピーする、貼る、アップロードする、公開する",
    E: "集中力、通信、バッテリー、姿勢、画面を見る余力",
    T: "今、30分単位、煮詰まる前、食事や休憩で区切れる時間",
    before: "アイデアや素材が頭の中・会話内にある",
    after: "URL、記事、画面、コードなど触れる形になる",
    delta: "構想 → 触れる成果物",
    next: "アプリ名か1画面の目的を決める"
  },
  {
    id: "manage",
    emoji: "💴",
    category: "管理する",
    role: "お金・予定・手続きの可視化",
    keywords: ["財布", "銀行", "残高", "支払い", "お金", "予定", "手続き", "役所", "請求", "家賃"],
    I: "残高、支払い予定、期限、必要書類、所持金、使える範囲",
    M: "財布、銀行アプリ、メモ、カレンダー、書類、役所窓口",
    S: "確認する → 分ける → 優先順をつける → 次の期限を見る",
    F: "アプリを開く、数字を見る、メモする、支払う、提出する",
    E: "数字を見る余力、手続きに耐える余力、外出できる余力",
    T: "今日、月初、期限前、入金後、窓口が開いている時間",
    before: "制約条件が見えず、行動範囲がぼやけている",
    after: "使える範囲・期限・次の処理が見える",
    delta: "不明な制約 → 見える制約",
    next: "財布か残高のどちらか一つだけ確認する"
  }
];

/* ── チップの代表テキストマップ ────────────── */

const chipRepresentatives = {
  eat:       "朝ご飯食べる",
  sleep:     "寝る",
  rest:      "休む",
  tidy:      "部屋を片付ける",
  go_out:    "外に出る",
  body_care: "体を整える",
  contact:   "連絡する",
  make:      "アプリ作る",
  manage:    "お金を管理する"
};

/* ── localStorageキー ─────────────────────── */

const STORAGE_KEY_V2 = 'genshouka_os_v02';
const STORAGE_KEY_V1 = 'genshouka_os_v01';
const LAYERS_V1 = ['I', 'M', 'S', 'F', 'E', 'T'];

/* ══════════════════════════════════════════
   DOM refs
══════════════════════════════════════════ */

const $v2Input        = document.getElementById('v2-input');
const $btnV2Analyze   = document.getElementById('btn-v2-analyze');
const $v2Result       = document.getElementById('v2-result');
const $v2CategoryHeader = document.getElementById('v2-category-header');
const $v2LayerGrid    = document.getElementById('v2-layer-grid');
const $v2Before       = document.getElementById('v2-before');
const $v2After        = document.getElementById('v2-after');
const $v2Delta        = document.getElementById('v2-delta');
const $v2Next         = document.getElementById('v2-next');
const $v2NotFound     = document.getElementById('v2-not-found');
const $v2Candidates   = document.getElementById('v2-candidates');
const $btnV2Copy      = document.getElementById('btn-v2-copy');

const $btnOpenManual  = document.getElementById('btn-open-manual');
const $v1Section      = document.getElementById('v1-section');
const $btnCloseV1     = document.getElementById('btn-close-v1');

// v0.1 DOM
const $target         = document.getElementById('target');
const $before         = document.getElementById('before');
const $after          = document.getElementById('after');
const $btnV1Analyze   = document.getElementById('btn-v1-analyze');
const $btnV1Reset     = document.getElementById('btn-v1-reset');
const $btnV1Copy      = document.getElementById('btn-v1-copy');
const $v1ResultSection = document.getElementById('v1-result-section');
const $gaugeFill      = document.getElementById('gauge-fill');
const $gaugeText      = document.getElementById('gauge-text');
const $missingLayers  = document.getElementById('missing-layers');
const $currentState   = document.getElementById('current-state');
const $deltaRead      = document.getElementById('delta-read');
const $phenomenonRead = document.getElementById('phenomenon-read');
const $nextStep       = document.getElementById('next-step');

/* ══════════════════════════════════════════
   v0.2 — キーワード判定
══════════════════════════════════════════ */

function matchDictionary(input) {
  const normalized = input.replace(/\s/g, '');
  const matches = [];
  for (const entry of phenomenonDictionary) {
    for (const kw of entry.keywords) {
      if (normalized.includes(kw)) {
        matches.push(entry);
        break;
      }
    }
  }
  return matches;
}

/* ══════════════════════════════════════════
   v0.2 — 結果表示
══════════════════════════════════════════ */

function renderV2Result(entry, inputText, allMatches) {
  // Category header
  $v2CategoryHeader.innerHTML =
    '<div class="v2-cat-emoji">' + entry.emoji + '</div>' +
    '<div class="v2-cat-name">' + entry.category + '</div>' +
    '<div class="v2-cat-role">' + entry.role + '</div>' +
    '<div class="v2-input-echo">入力：' + escapeHtml(inputText) + '</div>';

  // Layer grid
  const layerDefs = [
    { key: 'I', name: '情報' },
    { key: 'M', name: '媒体' },
    { key: 'S', name: '構造' },
    { key: 'F', name: '力' },
    { key: 'E', name: 'エネルギー' },
    { key: 'T', name: '時間' },
  ];
  $v2LayerGrid.innerHTML = layerDefs.map(function(ld) {
    return (
      '<div class="v2-layer-card">' +
        '<div class="v2-layer-tag">' + ld.key + '</div>' +
        '<div class="v2-layer-name">' + ld.name + '</div>' +
        '<div class="v2-layer-body">' + escapeHtml(entry[ld.key]) + '</div>' +
      '</div>'
    );
  }).join('');

  // Before / After / ΔI
  $v2Before.textContent = entry.before;
  $v2After.textContent  = entry.after;
  $v2Delta.textContent  = entry.delta;

  // Next
  $v2Next.textContent = entry.next;

  // Candidates (複数一致)
  if (allMatches.length > 1) {
    const others = allMatches.filter(function(e) { return e.id !== entry.id; });
    $v2Candidates.innerHTML =
      '<p class="v2-candidates-label">近いカテゴリ：</p>' +
      '<div class="v2-candidate-chips">' +
        others.map(function(e) {
          return '<button class="v2-candidate-chip" data-id="' + e.id + '">' + e.emoji + ' ' + e.category + '</button>';
        }).join('') +
      '</div>';
    $v2Candidates.classList.remove('hidden');

    // candidate chip click
    $v2Candidates.querySelectorAll('.v2-candidate-chip').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-id');
        var found = phenomenonDictionary.find(function(e) { return e.id === id; });
        if (found) renderV2Result(found, inputText, allMatches);
      });
    });
  } else {
    $v2Candidates.classList.add('hidden');
  }

  // Show result, hide not-found
  $v2Result.classList.remove('hidden');
  $v2NotFound.classList.add('hidden');
  $v2Result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showV2NotFound() {
  $v2Result.classList.add('hidden');
  $v2NotFound.classList.remove('hidden');
  $v2NotFound.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── main analyze ── */

function v2Analyze() {
  var input = ($v2Input.value || '').trim();
  if (!input) {
    $v2Input.focus();
    return;
  }
  saveV2ToStorage(input);

  var matches = matchDictionary(input);
  if (matches.length === 0) {
    showV2NotFound();
  } else {
    renderV2Result(matches[0], input, matches);
  }
}

/* ══════════════════════════════════════════
   v0.2 — コピー
══════════════════════════════════════════ */

function buildV2CopyText() {
  var input = ($v2Input.value || '').trim();
  var catName = $v2CategoryHeader.querySelector('.v2-cat-name');
  var catRole = $v2CategoryHeader.querySelector('.v2-cat-role');
  var catEmoji = $v2CategoryHeader.querySelector('.v2-cat-emoji');

  if (!catName) return '';

  var layers = ['I', 'M', 'S', 'F', 'E', 'T'];
  var layerNames = { I: '情報', M: '媒体', S: '構造', F: '力', E: 'エネルギー', T: '時間' };
  var layerCards = $v2LayerGrid.querySelectorAll('.v2-layer-card');
  var layerLines = [];
  layerCards.forEach(function(card, i) {
    var key = layers[i];
    var body = card.querySelector('.v2-layer-body');
    if (key && body) {
      layerLines.push(key + ' ' + layerNames[key] + '：\n' + body.textContent);
    }
  });

  return [
    '── 現象化OS v0.2 ──',
    '入力：',
    input,
    'カテゴリ：',
    (catEmoji ? catEmoji.textContent : '') + ' ' + catName.textContent,
    (catRole ? catRole.textContent : ''),
    '',
    layerLines.join('\n\n'),
    '',
    'ΔI：',
    $v2Delta.textContent,
    'Before：',
    $v2Before.textContent,
    'After：',
    $v2After.textContent,
    '次に見る場所：',
    $v2Next.textContent,
    '',
    '情報は、媒体・構造・力・エネルギー・時間を通って現象になる。'
  ].join('\n');
}

/* ══════════════════════════════════════════
   v0.1 — 分析
══════════════════════════════════════════ */

function getLayerValue(layer) {
  var el = document.getElementById('layer-' + layer);
  return el ? el.value.trim() : '';
}

function getV1Value(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function v1Analyze() {
  var target = getV1Value('target');
  var beforeVal = getV1Value('before');
  var afterVal  = getV1Value('after');

  var layerValues = {};
  LAYERS_V1.forEach(function(l) { layerValues[l] = getLayerValue(l); });

  var presentLayers = LAYERS_V1.filter(function(l) { return layerValues[l].length > 0; });
  var missingLayersList = LAYERS_V1.filter(function(l) { return !layerValues[l].length; });
  var count = presentLayers.length;

  // Gauge
  var pct = Math.round((count / 6) * 100);
  $gaugeFill.style.width = pct + '%';
  $gaugeFill.style.background = pct <= 33 ? '#E84040' : pct <= 66 ? '#F4A72A' : '#1DB87A';
  $gaugeText.textContent = count + ' / 6';

  if (missingLayersList.length > 0) {
    $missingLayers.textContent = '不足レイヤー：' + missingLayersList.join('、');
    $missingLayers.style.color = '#E84040';
  } else {
    $missingLayers.textContent = 'すべてのレイヤーが入力されています';
    $missingLayers.style.color = '#1DB87A';
  }

  // Current state
  var states = [];
  if (!layerValues['I']) states.push('これはまだ情報の段階です');
  if (!layerValues['M']) states.push('媒体が未設定です');
  if (!layerValues['S']) states.push('構造が未設定です');
  if (!layerValues['F']) states.push('押す力／動かす力が未設定です');
  if (!layerValues['E']) states.push('エネルギーが未設定です');
  if (!layerValues['T']) states.push('時間が未設定です');
  $currentState.textContent = states.length === 0 ? '現象化に近いです' : states.join('\n');

  // ΔI
  if (!beforeVal || !afterVal) {
    $deltaRead.textContent = 'ΔI はまだ未設定です。変化前と変化後を書くと、情報の変化が見えます。';
  } else {
    $deltaRead.textContent = '「' + beforeVal + '」から\n「' + afterVal + '」への変化を現象にしようとしています。';
  }

  // Phenomenon reading
  var tLabel = target ? '「' + target + '」' : '〔対象未設定〕';
  var lines = [tLabel + 'を現象にするために、'];
  var lDefs = [
    ['I', '情報'], ['M', '媒体'], ['S', '構造'], ['F', '力'], ['E', 'エネルギー'], ['T', '時間']
  ];
  var suffixes = ['を、', 'に乗せ、', 'として並べ、', 'で動かし、', 'のもとで、', 'に変化させようとしています。'];
  lDefs.forEach(function(pair, i) {
    var key = pair[0];
    var name = pair[1];
    var val = layerValues[key];
    lines.push(name + (val ? '「' + val + '」' : '〔未設定〕') + suffixes[i]);
  });
  $phenomenonRead.textContent = lines.join('\n');

  // Next step
  var hints = {
    I: '情報とは何か。どんな記録・感情・知識がこの現象に関わっているか。',
    M: '情報をどの媒体に乗せるか。言葉か、身体か、空間か。',
    S: '情報がどう並ぶと意味になるか。順序、対比、階層を考える。',
    F: '何がこの情報を動かすか。何が押すか、何が重いか。',
    E: '動かす余力はあるか。時間・体力・集中力・リソースを確認する。',
    T: 'いつ変化するか。タイミング・期限・継続性を設定する。'
  };
  var layerNameMap = { I: '情報', M: '媒体', S: '構造', F: '力', E: 'エネルギー', T: '時間' };
  if (missingLayersList.length === 0) {
    $nextStep.textContent = '不足レイヤー：なし\n次に見る場所：ΔI（変化前・変化後）の精度を上げる。';
  } else {
    var next = missingLayersList[0];
    $nextStep.textContent = '不足レイヤー：' + next + '（' + layerNameMap[next] + '）\n次に見る場所：' + hints[next];
  }

  // Save & show
  saveV1ToStorage();
  $v1ResultSection.classList.remove('hidden');
  $v1ResultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══════════════════════════════════════════
   v0.1 — コピー
══════════════════════════════════════════ */

function buildV1CopyText() {
  var target = getV1Value('target') || '〔未設定〕';
  var beforeVal = getV1Value('before') || '〔未設定〕';
  var afterVal  = getV1Value('after')  || '〔未設定〕';
  var layerValues = {};
  LAYERS_V1.forEach(function(l) { layerValues[l] = getLayerValue(l) || '〔未設定〕'; });

  var presentCount = LAYERS_V1.filter(function(l) { return getLayerValue(l).length > 0; }).length;
  var missingList  = LAYERS_V1.filter(function(l) { return !getLayerValue(l).length; });
  var layerNameMap = { I: '情報', M: '媒体', S: '構造', F: '力', E: 'エネルギー', T: '時間' };

  return [
    '── 現象化OS v0.1（手動分解）──',
    '現象にしたいもの：' + target,
    '',
    '【現象化度】',
    presentCount + ' / 6',
    missingList.length > 0 ? '不足レイヤー：' + missingList.join('、') : 'すべてのレイヤーが入力されています',
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
    '情報は、媒体・構造・力・エネルギー・時間を通って現象になる。'
  ].join('\n');
}

/* ══════════════════════════════════════════
   localStorage
══════════════════════════════════════════ */

function saveV2ToStorage(input) {
  try {
    localStorage.setItem(STORAGE_KEY_V2, JSON.stringify({ lastInput: input }));
  } catch (_) {}
}

function loadV2FromStorage() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY_V2);
    if (!raw) return;
    var data = JSON.parse(raw);
    if (data.lastInput && $v2Input) $v2Input.value = data.lastInput;
  } catch (_) {}
}

function saveV1ToStorage() {
  try {
    var data = {
      target: getV1Value('target'),
      before: getV1Value('before'),
      after:  getV1Value('after')
    };
    LAYERS_V1.forEach(function(l) { data['layer_' + l] = getLayerValue(l); });
    localStorage.setItem(STORAGE_KEY_V1, JSON.stringify(data));
  } catch (_) {}
}

function loadV1FromStorage() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) return;
    var data = JSON.parse(raw);
    if (data.target && $target) $target.value = data.target;
    if (data.before && $before) $before.value = data.before;
    if (data.after  && $after)  $after.value  = data.after;
    LAYERS_V1.forEach(function(l) {
      var el = document.getElementById('layer-' + l);
      if (el && data['layer_' + l]) el.value = data['layer_' + l];
    });
  } catch (_) {}
}

/* ══════════════════════════════════════════
   コピーユーティリティ
══════════════════════════════════════════ */

function copyText(text, btn) {
  var orig = btn.textContent;
  function onDone() {
    btn.textContent = 'コピー済み ✓';
    setTimeout(function() { btn.textContent = orig; }, 1800);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(function() { fallbackCopy(text, onDone); });
  } else {
    fallbackCopy(text, onDone);
  }
}

function fallbackCopy(text, onDone) {
  var el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); if (onDone) onDone(); } catch (_) {}
  document.body.removeChild(el);
}

/* ══════════════════════════════════════════
   HTMLエスケープ
══════════════════════════════════════════ */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ══════════════════════════════════════════
   v0.1 — リセット
══════════════════════════════════════════ */

function v1Reset() {
  var ok = window.confirm('手動フォームの入力をリセットしますか？');
  if (!ok) return;
  if ($target) $target.value = '';
  if ($before) $before.value = '';
  if ($after)  $after.value  = '';
  LAYERS_V1.forEach(function(l) {
    var el = document.getElementById('layer-' + l);
    if (el) el.value = '';
  });
  try { localStorage.removeItem(STORAGE_KEY_V1); } catch (_) {}
  if ($v1ResultSection) $v1ResultSection.classList.add('hidden');
  if ($gaugeFill) { $gaugeFill.style.width = '0%'; }
  if ($missingLayers) { $missingLayers.style.color = ''; }
}

/* ══════════════════════════════════════════
   イベントバインド
══════════════════════════════════════════ */

// v0.2 analyze
if ($btnV2Analyze) {
  $btnV2Analyze.addEventListener('click', v2Analyze);
}

if ($v2Input) {
  $v2Input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      v2Analyze();
    }
  });
}

// chips
document.querySelectorAll('.chip').forEach(function(chip) {
  chip.addEventListener('click', function() {
    var id = chip.getAttribute('data-id');
    var text = chipRepresentatives[id];
    if (!text || !$v2Input) return;
    $v2Input.value = text;

    // visual feedback
    document.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('chip--active'); });
    chip.classList.add('chip--active');
    setTimeout(function() { chip.classList.remove('chip--active'); }, 600);

    // find entry by id directly
    var entry = phenomenonDictionary.find(function(e) { return e.id === id; });
    if (entry) {
      saveV2ToStorage(text);
      renderV2Result(entry, text, [entry]);
    }
  });
});

// v0.2 copy
if ($btnV2Copy) {
  $btnV2Copy.addEventListener('click', function() {
    copyText(buildV2CopyText(), $btnV2Copy);
  });
}

// open manual form
if ($btnOpenManual) {
  $btnOpenManual.addEventListener('click', function() {
    if ($v1Section) {
      $v1Section.classList.remove('hidden');
      $v1Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// close v1
if ($btnCloseV1) {
  $btnCloseV1.addEventListener('click', function() {
    if ($v1Section) $v1Section.classList.add('hidden');
  });
}

// v0.1 analyze
if ($btnV1Analyze) {
  $btnV1Analyze.addEventListener('click', v1Analyze);
}

// v0.1 reset
if ($btnV1Reset) {
  $btnV1Reset.addEventListener('click', v1Reset);
}

// v0.1 copy
if ($btnV1Copy) {
  $btnV1Copy.addEventListener('click', function() {
    copyText(buildV1CopyText(), $btnV1Copy);
  });
}

// v0.1 auto-save on input
document.querySelectorAll('#v1-section textarea').forEach(function(el) {
  el.addEventListener('input', saveV1ToStorage);
});

/* ══════════════════════════════════════════
   初期化
══════════════════════════════════════════ */

loadV2FromStorage();
loadV1FromStorage();
