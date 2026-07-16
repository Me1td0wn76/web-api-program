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
]
