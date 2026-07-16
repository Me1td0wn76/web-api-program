import type { ApiDef } from './types'
import { bust, fetchJson, randomInt } from './utils'

const CATEGORY = '変換・ユーティリティ・ネタ系'

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
    id: 'random-word-api',
    category: CATEGORY,
    name: 'Random Word API',
    description: 'ランダムな英単語を生成します。',
    note: 'Heroku無料枠終了の影響で不安定になる場合があります。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://random-word-api.herokuapp.com/word') }),
  },
]
