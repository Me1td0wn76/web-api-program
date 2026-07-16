import type { ApiDef } from './types'
import { fetchJson } from './utils'

// ジョーク・ネタ系: one-liner joke / advice APIs.
// Yo Momma Jokes, Evil Insult Generator, FML API and 8ball API were dropped — dead DNS,
// invalid TLS certs, or consistent "Failed to fetch" errors when checked in a real browser.
const CATEGORY = 'ジョーク・ネタ系'

export const jokeApis: ApiDef[] = [
  {
    id: 'jokeapi',
    category: CATEGORY,
    name: 'JokeAPI',
    description: 'カテゴリ別にジョークを生成します(セーフモード)。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://v2.jokeapi.dev/joke/Any?safe-mode') }),
  },
  {
    id: 'official-joke-api',
    category: CATEGORY,
    name: 'Official Joke API',
    description: 'シンプルな英語の一発ジョークを返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://official-joke-api.appspot.com/random_joke') }),
  },
  {
    id: 'chuck-norris-io',
    category: CATEGORY,
    name: 'Chuck Norris IO',
    description: 'チャック・ノリスジョークをランダムに返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.chucknorris.io/jokes/random') }),
  },
  {
    id: 'icanhazdadjoke',
    category: CATEGORY,
    name: 'Dad Jokes API (icanhazdadjoke)',
    description: '親父ギャグ(Dad Joke)をランダムに返します。',
    run: async () => ({
      kind: 'json',
      // Without an explicit Accept header this endpoint serves its HTML homepage instead of JSON.
      data: await fetchJson('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }),
    }),
  },
  {
    id: 'bacon-ipsum',
    category: CATEGORY,
    name: 'Bacon Ipsum',
    description: 'ベーコンにまつわるダミーテキストを生成します。',
    run: async () => {
      const data = (await fetchJson(
        'https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=json',
      )) as string[]
      return { kind: 'text', text: data.join('\n\n') }
    },
  },
  {
    id: 'yes-no-api',
    category: CATEGORY,
    name: 'Yes No API',
    description: 'yes/noをGIF付きでランダムに返答します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://yesno.wtf/api') }),
  },
]
