import type { ApiDef } from './types'
import { fetchJson, pick } from './utils'

// 名言・格言系: quote-of-the-day style APIs.
// Quotable API, ZenQuotes, They Said So and Stoic Quotes were dropped — Quotable's
// certificate has expired, and the other three only ever returned "Failed to fetch"
// or require a paid API key.
const CATEGORY = '名言・格言系'

// Programming Quotes API's own random-quote endpoint is gone, so instead we fetch its
// full dataset once (via jsDelivr, which serves the GitHub repo with CORS enabled) and
// cache it in memory, sampling a random entry client-side on every click.
let programmingQuotesCache: Array<{ text: string; author: string }> | null = null

export const quoteApis: ApiDef[] = [
  {
    id: 'advice-slip',
    category: CATEGORY,
    name: 'Advice Slip API',
    description: 'ランダムなアドバイスを一言返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.adviceslip.com/advice') }),
  },
  {
    id: 'kanye-rest',
    category: CATEGORY,
    name: 'Kanye Rest API',
    description: 'カニエ・ウェストの名言風テキストを返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.kanye.rest/') }),
  },
  {
    id: 'programming-quotes',
    category: CATEGORY,
    name: 'Programming Quotes API',
    description: 'プログラミングに関する名言をランダムに返します。',
    note: '元のherokuapp版が終了しているため、同データセットをjsDelivr経由で取得しランダム抽出しています。',
    run: async () => {
      if (!programmingQuotesCache) {
        programmingQuotesCache = (await fetchJson(
          'https://cdn.jsdelivr.net/gh/skolakoda/programming-quotes-api@master/data/quotes.json',
        )) as Array<{ text: string; author: string }>
      }
      return { kind: 'json', data: pick(programmingQuotesCache) }
    },
  },
]
