'use strict';

/* ─── 辞書データ ──────────────────────────────────── */
const phenomenonCoreDictionary = [
  {
    id: "eat",
    emoji: "🍚",
    word: "食べる",
    phenomenonName: "取り込み・変換現象",
    keywords: ["食べる", "食う", "摂取", "取り込む", "食事", "ご飯", "栄養"],
    definition: "外部対象が境界を越えて内部へ入り、分解・同化され、内部状態を変化させる現象。",
    primitives: ["差分", "境界", "流入", "変換", "同化", "内部更新"],
    layers: {
      I: "外部対象の存在、内部の不足、取り込み可能性の識別、内外差分の情報",
      M: "境界面、通路、身体、細胞膜、口、根、入力装置、取り込みの場",
      S: "識別 → 接触 → 境界通過 → 分解 → 同化 → 内部状態更新",
      F: "不足差分、代謝圧、生存圧、濃度差、欲求、取り込みへ向かう勾配",
      E: "取り込み・分解・吸収・変換に使えるエネルギー",
      T: "取り込み前、取り込み中、分解中、吸収後、内部状態が変わるまでの時間幅"
    },
    deltaI: "外部対象 → 内部状態の変化情報",
    scales: [
      "人間なら：ご飯を食べる",
      "動物なら：餌を食べる",
      "植物なら：光・水・養分を取り込む",
      "細胞なら：分子を膜の内側へ取り込む",
      "AIなら：入力データによって内部状態や出力傾向が更新される"
    ],
    hypothesisCheck: "食べるという現象は、外部と内部の差分、境界、通路、変換エネルギー、時間幅によって観測できるため、IMSFETで比較的説明しやすい。"
  },

  {
    id: "sleep",
    emoji: "💤",
    word: "寝る",
    phenomenonName: "外部応答低下・内部処理移行現象",
    keywords: ["寝る", "眠る", "睡眠", "眠い", "休眠", "休止"],
    definition: "外部への応答を低下させ、内部の修復・整理・再構成へ処理配分を切り替える状態遷移現象。",
    primitives: ["周期", "応答低下", "遮断", "内部処理", "回復", "再編"],
    layers: {
      I: "疲労、処理過多、修復要求、外部応答を下げる必要、周期情報",
      M: "身体、神経系、脳、休止空間、暗さ、環境、休眠可能な媒体",
      S: "活動状態 → 外部応答低下 → 入力遮断 → 内部処理優先 → 修復・整理",
      F: "疲労圧、眠気、概日リズム、外部刺激の低下、内部回復への勾配",
      E: "外部活動へ使っていたエネルギーを、内部修復・再編へ再配分するエネルギー",
      T: "活動相から休止相へ移る周期時間、睡眠中の処理時間、再起動までの時間幅"
    },
    deltaI: "外部応答モード → 内部修復・再編モード",
    scales: [
      "人間なら：眠る",
      "動物なら：睡眠や休眠を行う",
      "植物なら：夜間に活動相が変わる",
      "機械なら：スリープモードへ入る",
      "AIなら：処理を止め、次の入力まで待機状態になる"
    ],
    hypothesisCheck: "寝るという現象は、周期・エネルギー再配分・応答低下・内部処理への切替として見ると、IMSFETで観測しやすい。"
  },

  {
    id: "anger",
    emoji: "🌋",
    word: "怒る",
    phenomenonName: "境界侵害検知・反発圧上昇現象",
    keywords: ["怒る", "怒り", "腹立つ", "キレる", "不満", "イライラ", "反発"],
    definition: "境界・期待・ルール・身体状態に対する侵害やズレが検知され、反発する圧が上昇する現象。",
    primitives: ["差分", "境界", "検知", "反発", "圧力上昇", "表出"],
    layers: {
      I: "侵害、ズレ、不一致、不公平、期待との差分、境界が乱されたという情報",
      M: "身体、神経系、記憶、言葉、関係性、社会的文脈",
      S: "期待 → ズレ検知 → 境界反応 → 内部圧上昇 → 表情・言葉・行動への表出",
      F: "境界を守る圧、防衛圧、反発圧、過去記憶の引力、身体反応の勢い",
      E: "反応に使われる身体エネルギー、声・表情・行動に変換されるエネルギー",
      T: "瞬間的検知、反応の立ち上がり、持続、鎮静までの時間"
    },
    deltaI: "ズレの検知情報 → 境界を守るための反発情報",
    scales: [
      "人間なら：怒る、反論する、黙る、距離を取る",
      "動物なら：威嚇する、縄張りを守る",
      "細胞なら：異物を検知して防御反応を起こす",
      "社会なら：抗議や炎上が起きる",
      "システムなら：異常入力に対してアラートを出す"
    ],
    hypothesisCheck: "怒るという現象は、感情ではなく境界・差分・反発圧の上昇として見ると、IMSFETで扱いやすくなる。"
  },

  {
    id: "transmit",
    emoji: "📡",
    word: "伝わる",
    phenomenonName: "情報媒体間の構造転写現象",
    keywords: ["伝わる", "伝える", "通信", "共有", "説明", "理解", "届く"],
    definition: "ある媒体上の情報構造が、別の媒体へ移り、相手側の内部状態や配置を変化させる現象。",
    primitives: ["情報", "媒体", "転写", "変換", "受信", "内部更新"],
    layers: {
      I: "伝達される情報、意味、パターン、差分、符号、意図",
      M: "言葉、音、文字、表情、電波、紙、画面、神経系、通信路",
      S: "符号化 → 媒体通過 → 受信 → 解釈 → 内部構造の更新",
      F: "伝えたい圧、注意を引く力、関係性、文脈、媒体の伝達力",
      E: "発話・記録・送信・受信・解釈に使われるエネルギー",
      T: "発信から受信までの遅延、理解までの時間、記憶に残る時間"
    },
    deltaI: "発信側の情報構造 → 受信側の内部状態変化",
    scales: [
      "人間なら：話が伝わる",
      "生物なら：鳴き声やフェロモンで情報が伝わる",
      "機械なら：信号が送受信される",
      "社会なら：噂やニュースが広がる",
      "AIなら：プロンプトが出力構造に反映される"
    ],
    hypothesisCheck: "伝わるという現象は、情報・媒体・構造転写・受信側の変化として見ると、IMSFETとの相性がかなり高い。"
  },

  {
    id: "gather",
    emoji: "🧲",
    word: "集まる",
    phenomenonName: "勾配・目的・場による密度上昇現象",
    keywords: ["集まる", "集合", "集結", "寄る", "群れる", "集まり", "密集"],
    definition: "分散していた要素が、引力・目的・場・条件によって特定の領域へ近づき、密度が上がる現象。",
    primitives: ["勾配", "引力", "場", "接近", "密度上昇", "配置変化"],
    layers: {
      I: "集まる理由、目的、位置情報、共通性、引き寄せ条件",
      M: "空間、場、ネットワーク、場所、重力場、コミュニティ、容器",
      S: "分散 → 方向づけ → 接近 → 密度上昇 → 集合状態",
      F: "引力、目的圧、興味、必要性、重力、社会的吸引、場の力",
      E: "移動・接近・接続に必要なエネルギー",
      T: "集まり始める時間、密度が上がる時間、解散までの時間"
    },
    deltaI: "分散配置 → 集合配置",
    scales: [
      "人間なら：人が集まる、会合ができる",
      "動物なら：群れを作る",
      "物理なら：重力で物質が集まる",
      "情報なら：似たデータがクラスタ化される",
      "社会なら：目的や不安によって集団が形成される"
    ],
    hypothesisCheck: "集まるという現象は、分散状態から集合状態への配置変化として観測できるため、IMSFETで扱いやすい。"
  },

  {
    id: "collapse",
    emoji: "🏚️",
    word: "崩れる",
    phenomenonName: "構造保持力低下現象",
    keywords: ["崩れる", "壊れる", "倒れる", "破綻", "散らかる", "崩壊", "ほどける"],
    definition: "構造を保っていた関係・配置・力の均衡が失われ、形や秩序が維持できなくなる現象。",
    primitives: ["構造", "保持", "不均衡", "崩壊", "散逸", "再配置"],
    layers: {
      I: "構造の弱点、負荷、ズレ、劣化、保持条件の不足情報",
      M: "物体、空間、関係性、制度、身体、記憶、構造が乗っている場",
      S: "保持状態 → 負荷蓄積 → 均衡喪失 → 崩壊 → 再配置",
      F: "重力、負荷、圧力、摩耗、矛盾、支える力の低下",
      E: "構造を保つエネルギー、または崩壊時に放出・散逸するエネルギー",
      T: "ゆっくり劣化する時間、臨界点を越える瞬間、崩れた後の再配置時間"
    },
    deltaI: "保持された構造情報 → ほどけた配置情報",
    scales: [
      "物理なら：建物や山が崩れる",
      "生活なら：部屋の秩序が崩れる",
      "身体なら：姿勢や体調が崩れる",
      "関係なら：信頼構造が崩れる",
      "情報なら：記憶や分類が保てなくなる"
    ],
    hypothesisCheck: "崩れるという現象は、構造保持力と負荷の関係で観測できるため、IMSFETのSとFが特に見えやすい。"
  },

  {
    id: "burn",
    emoji: "🔥",
    word: "燃える",
    phenomenonName: "酸化・エネルギー放出現象",
    keywords: ["燃える", "燃焼", "火", "発火", "炎", "燃やす", "熱"],
    definition: "物質が酸素などと反応し、保持していた化学エネルギーを熱や光として放出しながら構造を変える現象。",
    primitives: ["接触", "反応", "変換", "放出", "熱", "構造変化"],
    layers: {
      I: "燃える物質、酸素、温度、発火条件、反応可能性の情報",
      M: "空気、物質表面、炎、反応場、熱が伝わる媒体",
      S: "接触 → 発火 → 酸化反応 → 熱・光の放出 → 灰・煙・別物質への変化",
      F: "化学反応の進行、温度差、酸素との結合、反応が連鎖する力",
      E: "物質に保持されていた化学エネルギー、発火に必要なエネルギー、放出される熱と光",
      T: "発火前、燃焼中、燃え広がる時間、燃え尽きるまでの時間"
    },
    deltaI: "燃える前の物質情報 → 熱・光・煙・灰として再配置された情報",
    scales: [
      "物理なら：火が燃える",
      "身体なら：代謝でエネルギーが取り出される",
      "感情なら：熱が上がるように反応が強まる",
      "社会なら：炎上として情報反応が連鎖する",
      "星なら：核融合により光と熱が放出される"
    ],
    hypothesisCheck: "燃えるという現象は、エネルギー変換と構造変化が見えやすいため、IMSFETのEとTを検証する代表例になる。"
  },

  {
    id: "bloom",
    emoji: "🌱",
    word: "咲く",
    phenomenonName: "内部構造展開現象",
    keywords: ["咲く", "開花", "開く", "芽吹く", "展開", "育つ", "花"],
    definition: "内部に準備されていた構造が、条件の成立によって外側へ展開され、見える形になる現象。",
    primitives: ["蓄積", "条件成立", "展開", "形態変化", "表出", "成長"],
    layers: {
      I: "内部に保持された設計情報、成長段階、外部条件、展開可能性",
      M: "種、茎、細胞、身体、環境、土、水、光、表出の場",
      S: "準備 → 蓄積 → 条件成立 → 展開 → 形として現れる",
      F: "成長圧、光や温度への反応、内部から外へ開く力",
      E: "成長・細胞分裂・形態変化に使われるエネルギー",
      T: "発芽から開花までの時間、条件がそろう季節、展開に必要な時間幅"
    },
    deltaI: "内部に潜在していた構造情報 → 外部に見える形の情報",
    scales: [
      "植物なら：花が咲く",
      "人間なら：才能や考えが表に出る",
      "創作なら：アイデアが作品として開く",
      "社会なら：運動や文化が可視化される",
      "情報なら：圧縮されていた構造が展開される"
    ],
    hypothesisCheck: "咲くという現象は、内部情報の蓄積と条件成立による外部展開として観測できるため、IMSFETで広く応用できる。"
  },

  {
    id: "forget",
    emoji: "🫥",
    word: "忘れる",
    phenomenonName: "情報アクセス経路弱化現象",
    keywords: ["忘れる", "忘却", "思い出せない", "抜ける", "記憶", "消える"],
    definition: "情報そのもの、またはその情報へ到達する経路が弱まり、必要な時に取り出しにくくなる現象。",
    primitives: ["保持", "経路", "減衰", "アクセス低下", "ノイズ", "再構成"],
    layers: {
      I: "記憶された情報、手がかり、関連情報、アクセス経路の状態",
      M: "脳、神経回路、メモ、記録媒体、文脈、検索経路",
      S: "記録 → 保持 → 手がかり低下 → アクセス困難 → 再検索または再構成",
      F: "時間経過、干渉、注意の移動、ノイズ、経路を使わないことによる弱化",
      E: "思い出すために使う認知エネルギー、検索に必要な集中力",
      T: "記録から時間が経つ過程、使わない期間、思い出すまでの探索時間"
    },
    deltaI: "アクセス可能な情報 → アクセスしにくい情報",
    scales: [
      "人間なら：名前や用事を忘れる",
      "身体なら：使わない動作がぎこちなくなる",
      "社会なら：文化や記録が失われる",
      "コンピュータなら：リンク切れやインデックス消失が起きる",
      "AIなら：現在の文脈から外れた情報を参照できなくなる"
    ],
    hypothesisCheck: "忘れるという現象は、情報の消滅というよりアクセス経路の弱化として見ると、IMSFETでかなり整理しやすい。"
  },

  {
    id: "make",
    emoji: "🛠️",
    word: "作る",
    phenomenonName: "内部情報の外部構造化現象",
    keywords: ["作る", "創る", "制作", "生成", "書く", "組み立てる", "形にする"],
    definition: "内部にある情報・意図・構想が、媒体上に構造として配置され、外部から観測可能な形になる現象。",
    primitives: ["内部情報", "媒体化", "構造化", "変換", "外部化", "保持"],
    layers: {
      I: "構想、意図、設計、記憶、素材、完成イメージ、差分情報",
      M: "手、道具、言葉、紙、画面、コード、素材、空間",
      S: "構想 → 素材選択 → 配置 → 加工 → 形として固定 → 観測可能になる",
      F: "作りたい圧、必要性、好奇心、締切、手を動かす力、構造をまとめる力",
      E: "集中力、身体エネルギー、道具を動かすエネルギー、媒体を変形させるエネルギー",
      T: "構想から完成までの時間、試行錯誤の時間、形が保たれる時間"
    },
    deltaI: "内部にあった情報 → 外部に配置された構造情報",
    scales: [
      "人間なら：料理、文章、アプリ、道具を作る",
      "生物なら：巣や殻や身体構造を作る",
      "社会なら：制度や文化を作る",
      "物理なら：力と条件によって形が形成される",
      "AIなら：入力情報から文章やコードを生成する"
    ],
    hypothesisCheck: "作るという現象は、内部情報が媒体に乗り、構造として固定される過程なので、IMSFETの全要素を観察しやすい。"
  }
];

/* ─── レイヤー定義 ───────────────────────────────── */
const LAYER_META = {
  I: { label: "情報",       cls: "layer-card--I" },
  M: { label: "媒体",       cls: "layer-card--M" },
  S: { label: "構造",       cls: "layer-card--S" },
  F: { label: "力",         cls: "layer-card--F" },
  E: { label: "エネルギー", cls: "layer-card--E" },
  T: { label: "時間",       cls: "layer-card--T" }
};

/* ─── 状態 ────────────────────────────────────────── */
let currentEntry = null;
let currentCompareData = null;

/* ─── localStorage ───────────────────────────────── */
const LS_KEY = 'phenCore_lastWord';

function saveLastWord(word) {
  try { localStorage.setItem(LS_KEY, word); } catch (_) {}
}

function loadLastWord() {
  try { return localStorage.getItem(LS_KEY) || ''; } catch (_) { return ''; }
}

/* ─── 検索ロジック ───────────────────────────────── */
function findEntry(query) {
  const q = query.trim();
  if (!q) return null;

  // 完全一致
  let hit = phenomenonCoreDictionary.find(e => e.word === q);
  if (hit) return hit;

  // キーワード部分一致
  hit = phenomenonCoreDictionary.find(e =>
    e.keywords.some(kw => kw === q)
  );
  if (hit) return hit;

  // キーワードに含む
  hit = phenomenonCoreDictionary.find(e =>
    e.keywords.some(kw => kw.includes(q) || q.includes(kw))
  );
  if (hit) return hit;

  return null;
}

/* ─── メイン観測関数 ─────────────────────────────── */
function observe() {
  const input = document.getElementById('wordInput');
  const query = (input ? input.value : '').trim();
  if (!query) {
    if (input) input.focus();
    return;
  }
  saveLastWord(query);
  const entry = findEntry(query);
  currentEntry = entry;
  renderResult(query, entry);
}

function quickObserve(word) {
  const input = document.getElementById('wordInput');
  if (input) input.value = word;
  observe();
}

/* ─── HTML描画 ───────────────────────────────────── */
function renderResult(query, entry) {
  const section = document.getElementById('resultSection');
  if (!section) return;

  // スキャンバー
  const scanDiv = document.createElement('div');
  scanDiv.className = 'scan-bar';
  section.innerHTML = '';
  section.appendChild(scanDiv);

  if (!entry) {
    renderNotFound(section, query);
    return;
  }

  const panel = document.createElement('div');
  panel.className = 'result-panel';
  panel.innerHTML = buildResultHTML(entry);
  section.appendChild(panel);

  // コピーボタン
  const copyBtn = panel.querySelector('#copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      copyResult(entry, copyBtn);
    });
  }

  // スムーズスクロール
  setTimeout(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function buildResultHTML(entry) {
  const layerKeys = ['I', 'M', 'S', 'F', 'E', 'T'];

  const layerCardsHTML = layerKeys.map(key => {
    const meta = LAYER_META[key];
    return `
      <div class="layer-card ${meta.cls}">
        <div class="layer-key">${key}<span class="layer-key-label">${meta.label}</span></div>
        <div class="layer-val">${escHtml(entry.layers[key])}</div>
      </div>
    `;
  }).join('');

  const primTagsHTML = entry.primitives.map(p =>
    `<span class="prim-tag">${escHtml(p)}</span>`
  ).join('');

  const scaleItemsHTML = entry.scales.map(s =>
    `<li>${escHtml(s)}</li>`
  ).join('');

  return `
    <!-- ヘッド -->
    <div class="result-head">
      <div class="result-word-row">
        <span class="result-emoji">${entry.emoji}</span>
        <span class="result-word">${escHtml(entry.word)}</span>
      </div>
      <div class="result-phenomenon-name">◈ ${escHtml(entry.phenomenonName)}</div>
      <div class="result-definition">${escHtml(entry.definition)}</div>
    </div>

    <!-- 現象素 -->
    <div class="primitives-row">
      <div class="primitives-label">現象素 primitives</div>
      ${primTagsHTML}
    </div>

    <!-- レイヤーカード -->
    <div class="layers-grid">
      ${layerCardsHTML}
    </div>

    <!-- ΔI -->
    <div class="delta-block">
      <div class="delta-label">ΔI — 差分情報</div>
      <div class="delta-val">${escHtml(entry.deltaI)}</div>
    </div>

    <!-- スケール変換 -->
    <div class="scale-block">
      <div class="scale-label">スケール変換</div>
      <ul class="scale-list">${scaleItemsHTML}</ul>
    </div>

    <!-- 仮説チェック -->
    <div class="hyp-block">
      <div class="hyp-label">仮説チェック</div>
      <div class="hyp-val">${escHtml(entry.hypothesisCheck)}</div>
    </div>

    <!-- コピー -->
    <div class="copy-row">
      <button class="copy-btn" id="copyBtn" type="button">
        <span>⎘</span><span>コピー</span>
      </button>
    </div>

    <!-- 締め -->
    <p class="result-footer-note">情報は、媒体・構造・力・エネルギー・時間を通って現象になる。</p>
  `;
}

function renderNotFound(section, query) {
  const panel = document.createElement('div');
  panel.className = 'not-found-panel';
  panel.innerHTML = `
    <div class="not-found-icon">◌</div>
    <div class="not-found-title">辞書にまだない現象です</div>
    <div class="not-found-sub">
      「${escHtml(query)}」はまだCore辞書に登録されていません。
    </div>
  `;
  section.appendChild(panel);
}

/* ─── コピー機能 ─────────────────────────────────── */
function buildCopyText(entry) {
  const layerKeys = ['I', 'M', 'S', 'F', 'E', 'T'];
  const layerLines = layerKeys.map(key =>
    `${key} ${LAYER_META[key].label}：\n${entry.layers[key]}`
  ).join('\n\n');

  const scaleLines = entry.scales.map(s => `  → ${s}`).join('\n');

  return `── 現象化OS Core β ──

日常語：
${entry.word}

現象名：
${entry.phenomenonName}

現象定義：
${entry.definition}

使われている現象素：
${entry.primitives.join(' / ')}

${layerLines}

ΔI：
${entry.deltaI}

スケール変換：
${scaleLines}

仮説チェック：
${entry.hypothesisCheck}

情報は、媒体・構造・力・エネルギー・時間を通って現象になる。`;
}

function copyResult(entry, btn) {
  const text = buildCopyText(entry);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopied(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}

function fallbackCopy(text, btn) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  ta.style.top = '0';
  ta.style.left = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopied(btn);
  } catch (_) {}
  document.body.removeChild(ta);
}

function showCopied(btn) {
  if (!btn) return;
  btn.classList.add('copied');
  const spanEl = btn.querySelectorAll('span')[1];
  if (spanEl) {
    spanEl.textContent = 'コピーしました';
    setTimeout(() => {
      spanEl.textContent = 'コピー';
      btn.classList.remove('copied');
    }, 2000);
  }
}

/* ─── ユーティリティ ─────────────────────────────── */
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─── 初期化 ─────────────────────────────────────── */
function init() {
  const input = document.getElementById('wordInput');
  if (!input) return;

  // 前回の入力を復元
  const last = loadLastWord();
  if (last) input.value = last;

  // Enter キー
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      observe();
    }
  });

  // 比較モードのセレクトを初期化
  populateCompareOptions();
}

// DOM読み込み後に初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ══════════════════════════════════════════════════
   v0.3 比較モード（既存機能には触れず、追加のみ）
   ══════════════════════════════════════════════════ */

/* ─── セレクト初期化 ──────────────────────────────── */
function populateCompareOptions() {
  const selA = document.getElementById('compareSelectA');
  const selB = document.getElementById('compareSelectB');
  if (!selA || !selB) return;

  const optionsHTML = phenomenonCoreDictionary.map(e =>
    `<option value="${e.id}">${e.emoji} ${escHtml(e.word)}</option>`
  ).join('');

  selA.innerHTML = optionsHTML;
  selB.innerHTML = optionsHTML;

  // デフォルトは異なる2項目（辞書に2件以上ある場合）
  selA.value = phenomenonCoreDictionary[0] ? phenomenonCoreDictionary[0].id : '';
  selB.value = phenomenonCoreDictionary[1] ? phenomenonCoreDictionary[1].id : selA.value;
}

/* ─── 現象素の比較ロジック ────────────────────────── */
function findCommonPrimitives(entryA, entryB) {
  return entryA.primitives.filter(p => entryB.primitives.includes(p));
}

function findOnlyPrimitives(entryA, entryB) {
  return entryA.primitives.filter(p => !entryB.primitives.includes(p));
}

/* ─── 比較コメント（テンプレート文、外部AIなし） ──── */
function buildCompareComment(entryA, entryB, common) {
  const totalUnique = new Set([...entryA.primitives, ...entryB.primitives]).size;
  const ratio = totalUnique > 0 ? common.length / totalUnique : 0;

  if (common.length === 0) {
    return `「${entryA.word}」と「${entryB.word}」は、共通する現象素を持たず、構造的にかなり異なる現象として観測される。`;
  }
  if (ratio >= 0.4) {
    return `「${entryA.word}」と「${entryB.word}」は、${common.length}個の現象素（${common.join('・')}）を共有しており、構造的に近い現象として観測される。`;
  }
  return `「${entryA.word}」と「${entryB.word}」は、一部の現象素（${common.join('・')}）を共有しつつも、それぞれ固有の構造を持つ現象として観測される。`;
}

/* ─── 比較メイン関数 ──────────────────────────────── */
function compareEntries() {
  const selA = document.getElementById('compareSelectA');
  const selB = document.getElementById('compareSelectB');
  if (!selA || !selB) return;

  const entryA = phenomenonCoreDictionary.find(e => e.id === selA.value);
  const entryB = phenomenonCoreDictionary.find(e => e.id === selB.value);
  if (!entryA || !entryB) return;

  renderComparison(entryA, entryB);
}

/* ─── 比較結果HTML描画 ────────────────────────────── */
function renderComparison(entryA, entryB) {
  const section = document.getElementById('compareResultSection');
  if (!section) return;

  const common = findCommonPrimitives(entryA, entryB);
  const onlyA = findOnlyPrimitives(entryA, entryB);
  const onlyB = findOnlyPrimitives(entryB, entryA);
  const comment = buildCompareComment(entryA, entryB, common);

  currentCompareData = { entryA, entryB, common, onlyA, onlyB, comment };

  const layerKeys = ['I', 'M', 'S', 'F', 'E', 'T'];
  const layerRowsHTML = layerKeys.map(key => {
    const meta = LAYER_META[key];
    return `
      <div class="compare-layer-row">
        <div class="compare-layer-label">${key}<span class="compare-layer-label-sub">${meta.label}</span></div>
        <div class="compare-layer-cols">
          <div class="compare-layer-col compare-layer-col--a">
            <span class="compare-layer-tag compare-layer-tag--a">A</span>
            <span class="compare-layer-text">${escHtml(entryA.layers[key])}</span>
          </div>
          <div class="compare-layer-col compare-layer-col--b">
            <span class="compare-layer-tag compare-layer-tag--b">B</span>
            <span class="compare-layer-text">${escHtml(entryB.layers[key])}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const commonTagsHTML = common.length
    ? common.map(p => `<span class="prim-tag prim-tag--common">${escHtml(p)}</span>`).join('')
    : `<span class="compare-empty-note">なし</span>`;

  const onlyATagsHTML = onlyA.length
    ? onlyA.map(p => `<span class="prim-tag prim-tag--a">${escHtml(p)}</span>`).join('')
    : `<span class="compare-empty-note">なし</span>`;

  const onlyBTagsHTML = onlyB.length
    ? onlyB.map(p => `<span class="prim-tag prim-tag--b">${escHtml(p)}</span>`).join('')
    : `<span class="compare-empty-note">なし</span>`;

  section.innerHTML = `
    <div class="scan-bar"></div>
    <div class="compare-result-panel">
      <div class="result-head compare-result-head">
        <div class="compare-result-label">比較結果</div>
        <div class="compare-title">
          <span class="result-emoji">${entryA.emoji}</span>
          <span class="result-word">${escHtml(entryA.word)}</span>
          <span class="compare-vs-inline">×</span>
          <span class="result-emoji">${entryB.emoji}</span>
          <span class="result-word">${escHtml(entryB.word)}</span>
        </div>
        <p class="compare-result-intro">「${escHtml(entryA.word)}」と「${escHtml(entryB.word)}」を、現象素とIMSFETの6レイヤーで比較します。</p>
      </div>

      <div class="compare-primitives-row">
        <div class="primitives-label">共通する現象素</div>
        ${commonTagsHTML}
      </div>
      <div class="compare-primitives-row">
        <div class="primitives-label">Aだけの現象素（${escHtml(entryA.word)}）</div>
        ${onlyATagsHTML}
      </div>
      <div class="compare-primitives-row">
        <div class="primitives-label">Bだけの現象素（${escHtml(entryB.word)}）</div>
        ${onlyBTagsHTML}
      </div>

      <div class="compare-layer-grid">
        ${layerRowsHTML}
      </div>

      <div class="hyp-block">
        <div class="hyp-label">比較コメント</div>
        <div class="hyp-val">${escHtml(comment)}</div>
      </div>

      <div class="compare-copy-row">
        <button class="copy-btn" id="compareCopyBtn" type="button">
          <span>⎘</span><span>比較結果をコピー</span>
        </button>
      </div>
    </div>
  `;

  const copyBtn = section.querySelector('#compareCopyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      copyCompareResult(copyBtn);
    });
  }

  setTimeout(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ─── 比較結果コピー機能 ──────────────────────────── */
function buildCompareCopyText(entryA, entryB, common, onlyA, onlyB, comment) {
  const layerKeys = ['I', 'M', 'S', 'F', 'E', 'T'];
  const layerLines = layerKeys.map(key =>
    `${key} ${LAYER_META[key].label}：\nA（${entryA.word}）：${entryA.layers[key]}\nB（${entryB.word}）：${entryB.layers[key]}`
  ).join('\n\n');

  return `── 現象化OS Core β 比較モード ──

比較：
${entryA.word} × ${entryB.word}

共通する現象素：
${common.length ? common.join(' / ') : 'なし'}

Aだけの現象素（${entryA.word}）：
${onlyA.length ? onlyA.join(' / ') : 'なし'}

Bだけの現象素（${entryB.word}）：
${onlyB.length ? onlyB.join(' / ') : 'なし'}

${layerLines}

比較コメント：
${comment}`;
}

function copyCompareResult(btn) {
  if (!currentCompareData) return;
  const { entryA, entryB, common, onlyA, onlyB, comment } = currentCompareData;
  const text = buildCompareCopyText(entryA, entryB, common, onlyA, onlyB, comment);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopied(btn);
    }).catch(() => {
      fallbackCopy(text, btn);
    });
  } else {
    fallbackCopy(text, btn);
  }
}
