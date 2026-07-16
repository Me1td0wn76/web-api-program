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

## APIリファレンス(引数・戻り値)

各APIが実際に呼び出すエンドポイントと、引数(カード上の入力欄に対応)・戻り値(レスポンスの主なフィールド)の一覧です。「戻り値」は`ApiCard`が画面に表示する前の、APIから返る生のレスポンス形です。

### 動物系(画像・情報)

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Dog CEO API | `GET dog.ceo/api/breeds/image/random`(犬種指定時は `breed/{breed}/images/random`) | breed(任意) | `{ message: 画像URL, status }` |
| Cataas | `GET cataas.com/cat` | なし | 画像(JPEG)そのもの |
| RandomFox | `GET randomfox.ca/floof/` | なし | `{ image, link }` |
| HTTP Cat | `GET http.cat/{code}` | code(ステータスコード) | 画像(JPEG) |
| HTTP Dog | `GET http.dog/{code}.jpg` | code(ステータスコード) | 画像(JPEG) |

### ジョーク・ネタ系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| JokeAPI | `GET v2.jokeapi.dev/joke/Any?safe-mode` | なし | `{ category, type, setup/joke, delivery?, flags, id, ... }` |
| Official Joke API | `GET official-joke-api.appspot.com/random_joke` | なし | `{ type, setup, punchline, id }` |
| Chuck Norris IO | `GET api.chucknorris.io/jokes/random` | なし | `{ categories, icon_url, id, url, value }` |
| Dad Jokes API (icanhazdadjoke) | `GET icanhazdadjoke.com/`(Accept: application/json) | なし | `{ id, joke, status }` |
| Bacon Ipsum | `GET baconipsum.com/api/?type=meat-and-filler&paras=1&format=json` | なし(固定パラメータ) | `string[]`(段落配列) |
| Yes No API | `GET yesno.wtf/api` | なし | `{ answer, forced, image }` |

### 名言・格言系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Advice Slip API | `GET api.adviceslip.com/advice` | なし | `{ slip: { id, advice } }` |
| Kanye Rest API | `GET api.kanye.rest/` | なし | `{ quote }` |
| Programming Quotes API | `GET`(jsDelivr上の全件データセットを初回のみ取得しキャッシュ) | なし | `{ text, author, ... }`(取得済み配列からランダム1件) |

### 画像・GIF・ビジュアル系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Picsum Photos | `GET picsum.photos/400/300` | なし | 画像 |
| DiceBear Avatars | `GET api.dicebear.com/9.x/{style}/svg?seed={seed}` | style(セレクト), seed(文字列) | 画像(SVG) |
| Robohash | `GET robohash.org/{text}.png` | text(文字列) | 画像(PNG) |
| UI Avatars | `GET ui-avatars.com/api/?name={name}` | name(文字列) | 画像(SVG) |
| Placeholder.com(→placehold.co) | `GET placehold.co/{size}` | size(例: `300x200`) | 画像 |
| This Person Does Not Exist | `GET thispersondoesnotexist.com/random-person.jpeg` | なし | 画像(JPEG) |

### 雑学・トリビア系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Cat Facts API | `GET catfact.ninja/fact` | なし | `{ fact, length }` |
| Useless Facts API | `GET uselessfacts.jsph.pl/api/v2/facts/random` | なし | `{ id, text, source, source_url, language }` |
| Meow Facts | `GET meowfacts.herokuapp.com/` | なし | `{ data: string[] }` |
| NASA APOD API | `GET api.nasa.gov/planetary/apod?api_key={key}` | apiKey(任意、空欄でDEMO_KEY) | `{ date, title, explanation, url, media_type, ... }` |
| Trivia API (Open Trivia DB) | `GET opentdb.com/api.php?amount=1` | なし | `{ response_code, results: [{ question, correct_answer, incorrect_answers, category, difficulty }] }` |
| Genderize.io | `GET api.genderize.io/?name={name}` | name(文字列) | `{ name, gender, probability, count }` |
| Agify.io | `GET api.agify.io/?name={name}` | name(文字列) | `{ name, age, count }` |
| Nationalize.io | `GET api.nationalize.io/?name={name}` | name(文字列) | `{ name, country: [{ country_id, probability }] }` |

### エンタメ・カルチャー系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Studio Ghibli API | `GET ghibliapi.vercel.app/films` | なし | `[{ id, title, original_title, description, director, release_date, ... }]` |
| Rick and Morty API | `GET rickandmortyapi.com/api/character/{id}` | id(内部でランダム1〜826) | `{ id, name, status, species, gender, origin, location, image, episode }` |
| Pokéapi | `GET pokeapi.co/api/v2/pokemon/{id}` | id(内部でランダム1〜1010) | `{ id, name, height, weight, types, abilities, stats, sprites }` |
| Star Wars API (SWAPI) | `GET swapi.dev/api/people/{id}/` | id(内部でランダム1〜83) | `{ name, height, mass, hair_color, films, homeworld }` |
| Harry Potter API (PotterAPI) | `GET potterapi-fedeperin.vercel.app/en/characters` | なし | `[{ fullName, nickname, hogwartsHouse, interpretedBy, image }]` |
| Anime Chan API | `GET api.animechan.io/v1/quotes/random` | なし | `{ data: { content, anime: { name }, character: { name } } }` |
| Jikan API (MyAnimeList非公式) | `GET api.jikan.moe/v4/random/anime` | なし | `{ data: { mal_id, title, synopsis, score, images } }` |

### 音楽系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Lyrics.ovh | `GET api.lyrics.ovh/v1/{artist}/{title}` | artist, title | `{ lyrics }` |
| iTunes Search API | `GET itunes.apple.com/search?term={term}&limit=5` | term(検索語) | `{ resultCount, results: [{ trackName, artistName, ... }] }` |
| Deezer API | `GET api.deezer.com/search?q={q}&output=jsonp`(JSONP) | q(検索語) | `{ data: [{ title, artist, album, preview, ... }] }` |

### 天気・時間・地理系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Open-Meteo | `GET api.open-meteo.com/v1/forecast?latitude=&longitude=&current_weather=true` | lat, lon | `{ current_weather: { temperature, windspeed, weathercode, time }, ... }` |
| WorldTimeAPI(→timeapi.io) | `GET timeapi.io/api/time/current/zone?timeZone={zone}` | zone(タイムゾーン) | `{ dateTime, date, time, timeZone, dayOfWeek, dstActive }` |
| IP-API(→ipwho.is) | `GET ipwho.is/` | なし | `{ ip, country, region, city, latitude, longitude, timezone }` |
| Sunrise-Sunset API | `GET api.sunrise-sunset.org/json?lat=&lng=` | lat, lng | `{ results: { sunrise, sunset, day_length, ... }, status }` |
| Zippopotam.us | `GET api.zippopotam.us/us/{zip}` | zip(米国郵便番号) | `{ country, "post code", places: [{ "place name", state, latitude, longitude }] }` |

### 変換・ユーティリティ・ネタ系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| QR Server API | `GET api.qrserver.com/v1/create-qr-code/?data={data}` | data(文字列) | 画像(PNG QRコード) |
| JSONPlaceholder | `GET jsonplaceholder.typicode.com/posts/{id}` | id(内部でランダム1〜100) | `{ userId, id, title, body }` |
| Random User Generator | `GET randomuser.me/api/` | なし | `{ results: [{ name, email, location, picture, ... }] }` |
| Fake Store API | `GET fakestoreapi.com/products/{id}` | id(内部でランダム1〜20) | `{ id, title, price, description, category, image, rating }` |
| UUID Generator API | `GET www.uuidtools.com/api/generate/v4` | なし | `string[]`(UUID1件の配列) |
| My IP API (ipify) | `GET api.ipify.org?format=json` | なし | `{ ip }` |
| QuickChart | `GET quickchart.io/chart?c={Chart.js設定}` | c(内部でランダムなグラフデータを生成) | 画像(PNGグラフ) |
| Random Word API | `GET random-word-api.herokuapp.com/word` | なし | `string[]`(単語1件の配列) |

### 完全に「どうでもいい」ネタ系

| API名 | エンドポイント | 引数 | 戻り値 |
| --- | --- | --- | --- |
| Chuck Norris Facts (別実装) | `GET api.chucknorris.io/jokes/random?category={category}` | category(セレクト) | `{ categories, icon_url, id, url, value }` |
| InspiroBot(非公式ラッパー) | `GET inspirobot.me/api?generate=true` | なし | プレーンテキストの画像URL |
| Insult.mattbas.org | `GET insult.mattbas.org/api/insult.json` | なし | `{ insult, args: { lang, template } }` |
| Corporate Bullshit Generator API(非公式) | `GET corporatebs-generator.sameerkumar.website/` | なし | `{ phrase }` |
| Cocktail DB (TheCocktailDB) | `GET thecocktaildb.com/api/json/v1/1/random.php` | なし | `{ drinks: [{ strDrink, strInstructions, strDrinkThumb, ... }] }` |
| Meal DB (TheMealDB) | `GET themealdb.com/api/json/v1/1/random.php` | なし | `{ meals: [{ strMeal, strCategory, strArea, strInstructions, strMealThumb, ... }] }` |
| Open Brewery DB | `GET api.openbrewerydb.org/v1/breweries/random` | なし | `[{ name, brewery_type, city, state_province, country, website_url }]` |
| What The Commit | `GET whatthecommit.com/index.json` | なし | `{ hash, commit_message, permalink }` |
| Hacker News API (Firebase) | `GET topstories.json` → `GET item/{id}.json` | なし(内部で上位50件からランダム選択) | `{ by, descendants, id, score, time, title, url }` |
| GitHub Zen API | `GET api.github.com/zen` | なし | プレーンテキスト1文 |
| Emoji API(→emojihub) | `GET emojihub.yurace.pro/api/random` | なし | `{ name, category, group, htmlCode, unicode }` |
| Random Emoji API(非公式、→emojihub) | `GET emojihub.yurace.pro/api/random/category/{category}` | category(セレクト) | `{ name, category, group, htmlCode, unicode }` |
| Kitsu API | `GET kitsu.io/api/edge/anime/{id}` | id(内部でランダム1〜500) | `{ data: { attributes: { canonicalTitle, synopsis, posterImage } } }` |
| PlaceDog | `GET place.dog/300/200` | なし | 画像 |
| PlaceBear | `GET placebear.com/300/200` | なし | 画像 |
| DevRandomJoke(自作/OSSでよくある名前) | `GET official-joke-api.appspot.com/jokes/programming/random` | なし | `[{ type, setup, punchline, id }]` |
