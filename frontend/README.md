# 雑多API図鑑

動物・ジョーク・名言・エンタメなど、無料で使える公開APIをブラウザから直接叩いて試せるカタログアプリです。カテゴリタブと検索で67個のAPIから絞り込み、各カードの「取得する」ボタンを押すとその場でレスポンス(画像・JSON・テキスト)を表示します。

Vite + React + TypeScriptで構築しています。

## セットアップ

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 型チェック + 本番ビルド
npm run lint     # ESLint
```

## ディレクトリ構成

```text
src/
  apis/
    types.ts          # ApiDef / ApiParam / ApiResult の型定義
    utils.ts           # fetchJson / fetchJsonp / bust などの共通ヘルパー
    animals.ts          カテゴリごとのAPI定義(下記10ファイル)
    jokes.ts
    quotes.ts
    visuals.ts
    trivia.ts
    entertainment.ts
    music.ts
    geo.ts
    utility.ts
    fun.ts
    index.ts           # 上記10ファイルを1つの配列に集約
  components/
    ApiCard.tsx        # 1つのAPIカードを描画する汎用コンポーネント
  App.tsx              # 検索ボックス + カテゴリタブ + カードグリッド
  main.tsx             # エントリーポイント
```

すべてのAPIは同じ`ApiDef`型のオブジェクトとして表現され、`ApiCard`が共通のロジック(パラメータ入力・取得ボタン・結果表示)で描画します。新しいAPIを追加する場合は、該当カテゴリファイルに1エントリ追加するだけで一覧に反映されます。

```ts
{
  id: 'example-api',
  category: 'カテゴリ名',
  name: '表示名',
  description: '説明文',
  run: async () => ({ kind: 'json', data: await fetchJson('https://example.com/api') }),
}
```

- `params` — カード上に表示する入力欄(テキスト or セレクト)
- `needsKey` — APIキー入力欄を追加し、未入力なら取得をブロック
- `note` — 常時表示する補足(代替API使用・レート制限などの注意書き)
- `local: true` — 実サーバーを叩かないローカル生成であることを示すバッジ表示
- `unavailable: '理由'` — ボタンを出さず、理由だけを表示する無効化カード

## 実装方針・注意点

元の依頼は約100個のAPIを実装対象としていましたが、実際にPlaywrightでブラウザを起動して1件ずつ動作検証した結果、以下は一覧から除外しています。

- **APIキー必須のもの**(Marvel、Mockaroo、OpenSea、They Said Soなど)
- **現在ドメイン失効・停止・危険(ドメイン転売)などで恒久的に利用不可なもの**(PlaceKitten、Shibe.online、Waifu.pics、Numbers APIなど)
- **実在する安定した公開APIが見つからず、ローカル生成でしか代替できないもの**(コイントス、サイコロ等)
- **`Failed to fetch`(CORS非対応・証明書切れ等)が再現性をもって発生するもの**(Quotable API、REST Countriesなど)

一部のAPIは元サービスが終了しているため、同等の後継サービスに差し替えています(例: Studio Ghibli API → vercel版ミラー、Bored API → appbrewery版)。差し替えた場合はカード内の注記(`note`)に明記しています。

Deezer APIのみCORSヘッダーを返さないため、`<script>`タグによるJSONP読み込み(`fetchJsonp`)で取得しています。
