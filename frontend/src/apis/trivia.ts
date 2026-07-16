import type { ApiDef } from './types'
import { fetchJson } from './utils'

const CATEGORY = '雑学・トリビア系'

export const triviaApis: ApiDef[] = [
  {
    id: 'cat-facts',
    category: CATEGORY,
    name: 'Cat Facts API',
    description: '猫にまつわる豆知識を返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://catfact.ninja/fact') }),
  },
  {
    id: 'useless-facts',
    category: CATEGORY,
    name: 'Useless Facts API',
    description: '本当にどうでもいい雑学を返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://uselessfacts.jsph.pl/api/v2/facts/random') }),
  },
  {
    id: 'meow-facts',
    category: CATEGORY,
    name: 'Meow Facts',
    description: '猫の雑学(別バージョン)を返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://meowfacts.herokuapp.com/') }),
  },
  {
    id: 'nasa-apod',
    category: CATEGORY,
    name: 'NASA APOD API',
    description: 'NASAの「今日の1枚」天文写真を返します。',
    note: 'キー未入力の場合はレート制限つきのDEMO_KEYを使用します。',
    params: [{ key: 'apiKey', label: 'APIキー(任意)', placeholder: '空欄でDEMO_KEY使用' }],
    run: async (v) => {
      const key = v.apiKey?.trim() || 'DEMO_KEY'
      return {
        kind: 'json',
        data: await fetchJson(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(key)}`),
      }
    },
  },
  {
    id: 'open-trivia-db',
    category: CATEGORY,
    name: 'Trivia API (Open Trivia DB)',
    description: 'クイズ問題をランダムに取得します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://opentdb.com/api.php?amount=1') }),
  },
  {
    id: 'genderize',
    category: CATEGORY,
    name: 'Genderize.io',
    description: '名前から性別を推測します。',
    params: [{ key: 'name', label: '名前', defaultValue: 'peter' }],
    run: async (v) => {
      const name = v.name?.trim() || 'peter'
      return { kind: 'json', data: await fetchJson(`https://api.genderize.io/?name=${encodeURIComponent(name)}`) }
    },
  },
  {
    id: 'agify',
    category: CATEGORY,
    name: 'Agify.io',
    description: '名前から年齢を推測します。',
    params: [{ key: 'name', label: '名前', defaultValue: 'michael' }],
    run: async (v) => {
      const name = v.name?.trim() || 'michael'
      return { kind: 'json', data: await fetchJson(`https://api.agify.io/?name=${encodeURIComponent(name)}`) }
    },
  },
  {
    id: 'nationalize',
    category: CATEGORY,
    name: 'Nationalize.io',
    description: '名前から国籍を推測します。',
    params: [{ key: 'name', label: '名前', defaultValue: 'john' }],
    run: async (v) => {
      const name = v.name?.trim() || 'john'
      return {
        kind: 'json',
        data: await fetchJson(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`),
      }
    },
  },
]
