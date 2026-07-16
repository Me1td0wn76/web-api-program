import type { ApiDef } from './types'
import { bust, fetchJson, randomInt } from './utils'

const CATEGORY = '変換・ユーティリティ・ネタ系'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
]

function generateLoremIpsum(sentences: number): string {
  const out: string[] = []
  for (let s = 0; s < sentences; s++) {
    const wordCount = randomInt(6, 14)
    const words = Array.from({ length: wordCount }, () => LOREM_WORDS[randomInt(0, LOREM_WORDS.length - 1)])
    words[0] = words[0][0].toUpperCase() + words[0].slice(1)
    out.push(`${words.join(' ')}.`)
  }
  return out.join(' ')
}

export const utilityApis: ApiDef[] = [
  {
    id: 'qr-server',
    category: CATEGORY,
    name: 'QR Server API',
    description: '文字列をQRコード画像に変換します。',
    params: [{ key: 'data', label: 'テキスト', defaultValue: 'https://example.com' }],
    run: async (v) => {
      const data = encodeURIComponent(v.data?.trim() || 'hello')
      return { kind: 'image', imageUrl: `https://api.qrserver.com/v1/create-qr-code/?data=${data}` }
    },
  },
  {
    id: 'jsonplaceholder',
    category: CATEGORY,
    name: 'JSONPlaceholder',
    description: 'テスト用のダミーJSONを取得します。',
    run: async () => {
      const id = randomInt(1, 100)
      return { kind: 'json', data: await fetchJson(`https://jsonplaceholder.typicode.com/posts/${id}`) }
    },
  },
  {
    id: 'random-user-generator',
    category: CATEGORY,
    name: 'Random User Generator',
    description: '架空の個人情報を生成します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://randomuser.me/api/') }),
  },
  {
    id: 'fake-store-api',
    category: CATEGORY,
    name: 'Fake Store API',
    description: 'ダミーのECサイト商品データを取得します。',
    run: async () => {
      const id = randomInt(1, 20)
      return { kind: 'json', data: await fetchJson(`https://fakestoreapi.com/products/${id}`) }
    },
  },
  {
    id: 'uuid-generator',
    category: CATEGORY,
    name: 'UUID Generator API',
    description: 'ランダムなUUIDを発行します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://www.uuidtools.com/api/generate/v4') }),
  },
  {
    id: 'ipify',
    category: CATEGORY,
    name: 'My IP API (ipify)',
    description: '自分のグローバルIPアドレスを取得します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.ipify.org?format=json') }),
  },
  {
    id: 'quickchart',
    category: CATEGORY,
    name: 'QuickChart',
    description: 'URLだけでグラフ画像を生成します。',
    run: async () => {
      const config = {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D'],
          datasets: [{ label: 'サンプル', data: [randomInt(1, 20), randomInt(1, 20), randomInt(1, 20), randomInt(1, 20)] }],
        },
      }
      const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(config))}`
      return { kind: 'image', imageUrl: bust(url) }
    },
  },
  {
    id: 'colormind',
    category: CATEGORY,
    name: 'Colormind API',
    description: 'カラーパレットを自動生成します。',
    run: async () => {
      const data = await fetchJson('https://colormind.io/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'default' }),
      })
      return { kind: 'json', data }
    },
  },
  {
    id: 'lorem-text',
    category: CATEGORY,
    name: 'Lorem Text API',
    description: 'ダミーテキスト(lorem ipsum)を生成します。',
    local: true,
    note: 'loripsum.net がDNS解決不能になっているため、ローカルでLorem Ipsum文を生成しています。',
    run: async () => ({ kind: 'text', text: generateLoremIpsum(3) }),
  },
  {
    id: 'random-word-api',
    category: CATEGORY,
    name: 'Random Word API',
    description: 'ランダムな英単語を生成します。',
    note: 'Heroku無料枠終了の影響で不安定になる場合があります。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://random-word-api.herokuapp.com/word') }),
  },
  {
    id: 'mockaroo',
    category: CATEGORY,
    name: 'Bacon-mockup系 (Mockaroo)',
    description: 'ダミーデータを大量に生成します。',
    unavailable: 'APIキーに加えて事前にWeb管理画面でスキーマを定義する必要があり、汎用的な実装ができないため未対応です。',
  },
]
