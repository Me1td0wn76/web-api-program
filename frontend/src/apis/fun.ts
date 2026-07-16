import type { ApiDef } from './types'
import { fetchJson, pick, randomInt } from './utils'

const CATEGORY = '完全に「どうでもいい」ネタ系'

export const funApis: ApiDef[] = [
  {
    id: 'coin-flip',
    category: CATEGORY,
    name: 'CoinFlip API(非公式)',
    description: 'コイントスの結果を返すだけ。',
    local: true,
    note: '実在する安定した公開APIが見つからなかったため、ローカルで判定しています。',
    run: async () => ({ kind: 'text', text: pick(['表 (Heads)', '裏 (Tails)']) }),
  },
  {
    id: 'dice-roll',
    category: CATEGORY,
    name: 'Dice Roll API',
    description: 'サイコロを振るだけ。',
    local: true,
    note: '実在する安定した公開APIが見つからなかったため、ローカルで判定しています。',
    run: async () => ({ kind: 'text', text: `🎲 ${randomInt(1, 6)}` }),
  },
  {
    id: 'rock-paper-scissors',
    category: CATEGORY,
    name: 'RockPaperScissors API(非公式)',
    description: 'じゃんけんの手をランダム生成。',
    local: true,
    note: '実在する安定した公開APIが見つからなかったため、ローカルで判定しています。',
    run: async () => ({ kind: 'text', text: pick(['グー ✊', 'チョキ ✌️', 'パー ✋']) }),
  },
  {
    id: 'chuck-norris-facts-alt',
    category: CATEGORY,
    name: 'Chuck Norris Facts (別実装)',
    description: '別ソースのチャックノリスネタ。',
    note: 'ICNDB(icndb.com)が停止しているため、chucknorris.ioをカテゴリ指定で呼び出す形で代替しています。',
    params: [
      {
        key: 'category',
        label: 'カテゴリ',
        options: ['dev', 'movie', 'food', 'career', 'sport', 'music'],
        defaultValue: 'dev',
      },
    ],
    run: async (v) => {
      const category = v.category || 'dev'
      return {
        kind: 'json',
        data: await fetchJson(`https://api.chucknorris.io/jokes/random?category=${category}`),
      }
    },
  },
  {
    id: 'inspirobot',
    category: CATEGORY,
    name: 'InspiroBot(非公式ラッパー)',
    description: 'AIが生成する意識高い系名言画像。',
    run: async () => {
      const url = await (await fetch('https://inspirobot.me/api?generate=true')).text()
      return { kind: 'image', imageUrl: url.trim() }
    },
  },
  {
    id: 'pun-api',
    category: CATEGORY,
    name: 'PUN API',
    description: 'ダジャレ(pun)を生成します。',
    local: true,
    note: '実在する安定した公開APIが見つからなかったため、ローカルの短いリストからランダムに返しています。',
    run: async () => ({
      kind: 'text',
      text: pick([
        'I used to be a banker, but I lost interest.',
        "I'm reading a book about anti-gravity. It's impossible to put down.",
        'A bicycle can\'t stand on its own because it is two-tired.',
        'I only know 25 letters of the alphabet. I don\'t know y.',
      ]),
    }),
  },
  {
    id: 'insult-mattbas',
    category: CATEGORY,
    name: 'Insult.mattbas.org',
    description: 'シェイクスピア風の罵倒文を生成します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://insult.mattbas.org/api/insult.json') }),
  },
  {
    id: 'corporate-bs-generator',
    category: CATEGORY,
    name: 'Corporate Bullshit Generator API(非公式)',
    description: '意識高い系ビジネス用語を生成します。',
    run: async () => ({
      kind: 'json',
      data: await fetchJson('https://corporatebs-generator.sameerkumar.website/'),
    }),
  },
  {
    id: 'cocktail-db',
    category: CATEGORY,
    name: 'Cocktail DB (TheCocktailDB)',
    description: 'カクテルレシピを検索します。',
    run: async () => ({
      kind: 'json',
      data: await fetchJson('https://www.thecocktaildb.com/api/json/v1/1/random.php'),
    }),
  },
  {
    id: 'meal-db',
    category: CATEGORY,
    name: 'Meal DB (TheMealDB)',
    description: '世界の料理レシピを検索します。',
    run: async () => ({
      kind: 'json',
      data: await fetchJson('https://www.themealdb.com/api/json/v1/1/random.php'),
    }),
  },
  {
    id: 'open-brewery-db',
    category: CATEGORY,
    name: 'Open Brewery DB',
    description: 'アメリカのビール醸造所データベースです。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.openbrewerydb.org/v1/breweries/random') }),
  },
  {
    id: 'random-beer-api',
    category: CATEGORY,
    name: 'Random Beer API',
    description: 'ビール銘柄をランダムに取得します。',
    unavailable: '主要な実装元(Punk API・random-data-api)がいずれも終了しており、代替が見つかりませんでした。',
  },
  {
    id: 'what-the-commit',
    category: CATEGORY,
    name: 'What The Commit',
    description: 'コミットメッセージのネタジェネレーターです。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://whatthecommit.com/index.json') }),
  },
  {
    id: 'hacker-news',
    category: CATEGORY,
    name: 'Hacker News API (Firebase)',
    description: 'Hacker Newsの投稿を取得します。',
    run: async () => {
      const topIds = (await fetchJson('https://hacker-news.firebaseio.com/v0/topstories.json')) as number[]
      const id = pick(topIds.slice(0, 50))
      return { kind: 'json', data: await fetchJson(`https://hacker-news.firebaseio.com/v0/item/${id}.json`) }
    },
  },
  {
    id: 'github-zen',
    category: CATEGORY,
    name: 'GitHub Zen API',
    description: 'GitHub公式の「禅の一言」を返します。',
    run: async () => ({ kind: 'text', text: await (await fetch('https://api.github.com/zen')).text() }),
  },
  {
    id: 'opensea-nft',
    category: CATEGORY,
    name: 'Bored Ape系のNFTメタデータAPI(OpenSea等)',
    description: 'NFT情報を取得します(要キー)。',
    needsKey: true,
    keyLabel: 'X-API-KEY',
    keyPlaceholder: 'OpenSeaで発行したAPIキー',
    params: [{ key: 'slug', label: 'コレクションslug', defaultValue: 'boredapeyachtclub' }],
    run: async (v) => {
      const slug = encodeURIComponent(v.slug?.trim() || 'boredapeyachtclub')
      return {
        kind: 'json',
        data: await fetchJson(`https://api.opensea.io/api/v2/collections/${slug}`, {
          headers: { 'X-API-KEY': v.apiKey },
        }),
      }
    },
  },
  {
    id: 'emoji-api',
    category: CATEGORY,
    name: 'Emoji API',
    description: '絵文字の検索・一覧取得を行います。',
    note: '公式emoji-api.comはキーが必要なため、キー不要のemojihubを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://emojihub.yurace.pro/api/random') }),
  },
  {
    id: 'random-emoji-api',
    category: CATEGORY,
    name: 'Random Emoji API(非公式)',
    description: 'ランダムな絵文字を返します。',
    note: 'emojihubのカテゴリ指定エンドポイントを使用しています。',
    params: [
      {
        key: 'category',
        label: 'カテゴリ',
        options: ['animals-and-nature', 'food-and-drink', 'travel-and-places', 'activities', 'objects'],
        defaultValue: 'animals-and-nature',
      },
    ],
    run: async (v) => {
      const category = v.category || 'animals-and-nature'
      return {
        kind: 'json',
        data: await fetchJson(`https://emojihub.yurace.pro/api/random/category/${category}`),
      }
    },
  },
  {
    id: 'kitsu-api',
    category: CATEGORY,
    name: 'Kitsu API',
    description: 'アニメ・マンガのSNS的データベースです。',
    run: async () => {
      const id = randomInt(1, 500)
      return { kind: 'json', data: await fetchJson(`https://kitsu.io/api/edge/anime/${id}`) }
    },
  },
  {
    id: 'place-dog',
    category: CATEGORY,
    name: 'PlaceDog',
    description: '犬画像専用プレースホルダーです。',
    run: async () => ({ kind: 'image', imageUrl: `https://place.dog/300/200?_=${Date.now()}` }),
  },
  {
    id: 'place-bear',
    category: CATEGORY,
    name: 'PlaceBear',
    description: '熊画像専用プレースホルダーです。',
    run: async () => ({ kind: 'image', imageUrl: `https://placebear.com/300/200?_=${Date.now()}` }),
  },
  {
    id: 'fill-murray',
    category: CATEGORY,
    name: 'FillMurray',
    description: 'ビル・マーレイの顔でプレースホルダー画像を生成します。',
    unavailable: '現在fillmurray.comが502エラーを返しており、応答しません。',
  },
  {
    id: 'catboosted',
    category: CATEGORY,
    name: 'CatBoosted (非公式ネタAPI)',
    description: '意味なく猫画像を返す系の派生APIです。',
    unavailable: '実在する安定した公開エンドポイントが見つかりませんでした。',
  },
  {
    id: 'dev-random-joke',
    category: CATEGORY,
    name: 'DevRandomJoke(自作/OSSでよくある名前)',
    description: '開発者ネタジョーク系の非公式APIの総称です。',
    note: 'Official Joke APIのprogrammingカテゴリを使用しています。',
    run: async () => ({
      kind: 'json',
      data: await fetchJson('https://official-joke-api.appspot.com/jokes/programming/random'),
    }),
  },
]
