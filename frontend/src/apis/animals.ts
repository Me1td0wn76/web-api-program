import type { ApiDef } from './types'
import { bust, fetchJson } from './utils'

const CATEGORY = '動物系(画像・情報)'

export const animalApis: ApiDef[] = [
  {
    id: 'dog-ceo',
    category: CATEGORY,
    name: 'Dog CEO API',
    description: 'ランダムな犬の画像を取得します。犬種を指定することもできます。',
    params: [
      { key: 'breed', label: '犬種(空欄でランダム)', placeholder: '例: shiba' },
    ],
    run: async (v) => {
      const breed = v.breed?.trim().toLowerCase()
      const url = breed
        ? `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images/random`
        : 'https://dog.ceo/api/breeds/image/random'
      const data = (await fetchJson(url)) as { message: string }
      return { kind: 'image', imageUrl: data.message }
    },
  },
  {
    id: 'cataas',
    category: CATEGORY,
    name: 'Cataas',
    description: 'Cat as a Service。ランダムな猫画像を返します。',
    run: async () => ({ kind: 'image', imageUrl: bust('https://cataas.com/cat') }),
  },
  {
    id: 'randomfox',
    category: CATEGORY,
    name: 'RandomFox',
    description: 'ランダムなキツネの画像を取得します。',
    run: async () => {
      const data = (await fetchJson('https://randomfox.ca/floof/')) as { image: string }
      return { kind: 'image', imageUrl: data.image }
    },
  },
  {
    id: 'randomduck',
    category: CATEGORY,
    name: 'RandomDuck',
    description: 'ランダムなアヒルの画像を取得します。',
    run: async () => {
      const data = (await fetchJson('https://random-d.uk/api/v2/random')) as { url: string }
      return { kind: 'image', imageUrl: data.url }
    },
  },
  {
    id: 'placekitten',
    category: CATEGORY,
    name: 'PlaceKitten',
    description: 'サイズ指定で子猫のプレースホルダー画像を返します。',
    unavailable: 'placekitten.comのドメインが失効しており、現在は521エラーで応答しません。',
  },
  {
    id: 'shibe-online',
    category: CATEGORY,
    name: 'Shibe.online',
    description: '柴犬・猫・鳥のランダム画像を返します。',
    unavailable: 'ドメインが第三者に転用されており、安全のため無効化しています。',
  },
  {
    id: 'some-random-api-animal',
    category: CATEGORY,
    name: 'Some Random API (animals)',
    description: 'パンダやコアラなど動物画像と豆知識をまとめて返します。',
    note: 'アクセス元によってはCloudflareにブロックされる場合があります。',
    params: [
      {
        key: 'type',
        label: '動物',
        options: ['panda', 'koala', 'fox', 'bird', 'red_panda', 'kangaroo', 'raccoon', 'dog', 'cat'],
        defaultValue: 'panda',
      },
    ],
    run: async (v) => {
      const type = v.type || 'panda'
      const data = (await fetchJson(`https://some-random-api.com/animal/${type}`)) as {
        image: string
        fact: string
      }
      return { kind: 'json', data }
    },
  },
  {
    id: 'http-cat',
    category: CATEGORY,
    name: 'HTTP Cat',
    description: 'HTTPステータスコードを猫画像で表現します。',
    params: [{ key: 'code', label: 'ステータスコード', defaultValue: '200' }],
    run: async (v) => {
      const code = v.code?.trim() || '200'
      return { kind: 'image', imageUrl: `https://http.cat/${encodeURIComponent(code)}` }
    },
  },
  {
    id: 'http-dog',
    category: CATEGORY,
    name: 'HTTP Dog',
    description: 'HTTPステータスコードを犬画像で表現します。',
    params: [{ key: 'code', label: 'ステータスコード', defaultValue: '200' }],
    run: async (v) => {
      const code = v.code?.trim() || '200'
      return { kind: 'image', imageUrl: `https://http.dog/${encodeURIComponent(code)}.jpg` }
    },
  },
  {
    id: 'axolotl-api',
    category: CATEGORY,
    name: 'Axolotl API',
    description: 'ウーパールーパーのランダム画像を返します。',
    unavailable: '公開されていたエンドポイントが404を返すようになり、現在は利用できません。',
  },
]
