import type { ApiDef } from './types'
import { fetchJson } from './utils'

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
      data: await fetchJson('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }),
    }),
  },
  {
    id: 'yomomma',
    category: CATEGORY,
    name: 'Yo Momma Jokes API',
    description: 'ユーモアジョークを返します。',
    unavailable: 'api.yomomma.info のドメインが名前解決できなくなっており、サービス終了と思われます。',
  },
  {
    id: 'evil-insult-generator',
    category: CATEGORY,
    name: 'Evil Insult Generator',
    description: 'ランダムな罵倒文を生成します。',
    unavailable: 'evilinsult.com はHTTPS証明書が無効で、HTTP版もリダイレクトループとなり利用できません。',
  },
  {
    id: 'fml-api',
    category: CATEGORY,
    name: 'FML API',
    description: '「今日のついてない話」を返します。',
    unavailable: '公式のFMyLife APIは2014年頃に終了しており、後継の無料公開APIも見つかりませんでした。',
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
  {
    id: '8ball-api',
    category: CATEGORY,
    name: '8ball API (Magic 8-ball)',
    description: '魔法の8ボール占い風の返答を返します。',
    params: [{ key: 'question', label: '質問', defaultValue: '今日はいいことがありますか？' }],
    run: async (v) => {
      const question = encodeURIComponent(v.question?.trim() || 'Will today be a good day?')
      return {
        kind: 'json',
        data: await fetchJson(`https://www.eightballapi.com/api/biased?question=${question}&lucky=false`),
      }
    },
  },
]
