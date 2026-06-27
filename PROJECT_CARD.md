# PROJECT_CARD

## このアプリは何？
現象化OS Core β は、日常語（例：食べる・怒る・咲く 等）を「現象」として観察する仮説実験的な静的ウェブアプリです。入力した語を辞書（phenomenonCoreDictionary）から引き、IMSFET風の6レイヤー（I 情報 / M 媒体 / S 構造 / F 力 / E エネルギー / T 時間）で分解・表示し、観察メモをクリップボードにコピーできるツールです。根拠ファイル：index.html / script.js / style.css。

## 現在の状態
- 完成度の高いフロントエンドプロトタイプ。入力UI・サンプルチップ・辞書データ・検索ロジック・結果描画（レイヤーカード、ΔI、スケール、仮説チェック）・コピー機能・localStorage による前回入力復元が実装済み。  
- 辞書（phenomenonCoreDictionary）に複数のエントリ（食べる／寝る／怒る 等）が定義されているため、即座に観察結果を得られる。  
- README（プロジェクト説明）はリポジトリに含まれていない（ドキュメント整備が必要）。

## 状態ラベル
- 実験（プロトタイプ）

## 主な機能
- 単語入力またはサンプルボタンで観測対象を選択。  
- 辞書を検索して一致エントリを取得。  
- 各エントリを I/M/S/F/E/T の6レイヤーで表示（レイヤーカード）。  
- 現象素（primitives）、ΔI（差分情報）、スケール変換、仮説チェックを表示。  
- 観察結果を読みやすいテキストに組み立ててクリップボードへコピー（コピー用テキストの構築とコピー処理実装済み）。  
- 最後に入力した語を localStorage に保存・復元。

## GitHub Pages公開
- そのまま公開可能（静的ファイル：index.html / script.js / style.css のみ）。Pages に main ブランチの root を指定すればデモURLが作れる。公開後はデモURLを README に追記するのが望ましい。

## 足りないもの
- README.md（使い方、目的、辞書編集方法、デモURL、動作環境、localStorage の説明、注意点）  
- LICENSE（公開と再利用の条件を明示）  
- スクリーンショット / 短いデモGIF（UI確認用）  
- CONTRIBUTING / Issue テンプレ（外部貢献受入れ用）  
- 辞書（phenomenonCoreDictionary）拡張ルールやフォーマットのドキュメント化  
- 公開時のプライバシー注意（localStorage の扱い、コピーするテキストに個人情報を含めない注意など）

## 触らないこと
- index.html / script.js / style.css のコードや既存文言を変更しない。  
- 辞書本文（phenomenonCoreDictionary のエントリ）を勝手に編集しない。  
- 表示文言、見た目、リンク構造、アプリ挙動を変更しない。  
- README や LICENSE の新規作成・追加は今回行わない。

## 次にやること
（コード修正を伴わない整理タスク）
1. README.md のドラフト作成（目的・使い方・デモURL・辞書追加手順・localStorage の説明）。  
2. LICENSE を選定して追加する準備（所有者の方針に従う）。  
3. GitHub Pages を有効化してデモURLを取得し、README に追記する。  
4. 辞書の追加・編集方法（フォーマット例）をドキュメント化する。  
5. スクリーンショット／デモGIF を作成して README に添付する準備。  
6. repository description と topics を設定（例: genshoka-os, phenomenon, research, static-site）。  
7. Issue を作って残タスクを可視化（辞書拡張、アクセシビリティ改善、テスト、ドキュメント）。  
8. localStorage のキーや挙動（LS_KEY = 'phenCore_lastWord'）を README に明記し、プライバシー上の注意を添える。

## APP_MAP.mdに載せる一行説明
- 現象化OS Core β — 日常語をIMSFET風6レイヤーで観測する仮説実験ツール（静的プロトタイプ）。

## メモ
- 根拠は index.html / script.js / style.css の実在ファイルのみ。  
- 辞書の中身は観察モデルの仮説（IMSFET の各要素）に基づいた説明が豊富で、研究的な拡張の余地が大きいです。README 作成→Pages 公開→辞書拡張フローの順で整理すると次の作業が進めやすいです。
