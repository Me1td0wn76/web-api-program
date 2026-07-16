import type { ApiDef } from './types'
import { fetchJson, pick, randomInt } from './utils'

// 完全に「どうでもいい」ネタ系: joke/novelty APIs with no real practical use.
// CoinFlip, Dice Roll, RockPaperScissors and PUN API were dropped (no stable public
// API exists for them, so they'd have been fake client-side generators pretending to
// be network calls). Random Beer API, FillMurray, CatBoosted and the OpenSea NFT
// entry were dropped too — dead endpoints, a 502 that never resolved, an API that
// couldn't be found at all, and an API that requires a paid key, respectively.
const CATEGORY = '完全に「どうでもいい」ネタ系'

export const funApis: ApiDef[] = [
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
      // The Firebase API has no "random story" endpoint, so we fetch the top-story ID
      // list first, then pick one of the top 50 IDs and fetch that story individually.
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
