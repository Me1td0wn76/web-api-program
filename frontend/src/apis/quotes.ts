import type { ApiDef } from './types'
import { fetchJson, pick } from './utils'

const CATEGORY = '名言・格言系'

let programmingQuotesCache: Array<{ text: string; author: string }> | null = null

export const quoteApis: ApiDef[] = [
  {
    id: 'quotable',
    category: CATEGORY,
    name: 'Quotable API',
    description: '英語の名言をランダムに取得します。',
    note: 'api.quotable.io はSSL証明書切れが確認されており、失敗する場合があります。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.quotable.io/random') }),
  },
  {
    id: 'zenquotes',
    category: CATEGORY,
    name: 'ZenQuotes',
    description: '禅風の名言をランダムに返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://zenquotes.io/api/random') }),
  },
  {
    id: 'theysaidso',
    category: CATEGORY,
    name: 'They Said So Quotes API',
    description: '有名人の名言を取得します。',
    needsKey: true,
    keyLabel: 'API Secret',
    keyPlaceholder: 'theysaidso.comで発行したキー',
    run: async (v) => ({
      kind: 'json',
      data: await fetchJson('https://quotes.rest/qod.json', {
        headers: { 'X-TheySaidSo-Api-Secret': v.apiKey },
      }),
    }),
  },
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
  {
    id: 'stoic-quotes',
    category: CATEGORY,
    name: 'Stoic Quotes API',
    description: 'ストア派哲学の名言を返します。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://stoic.tekloon.net/stoic-quote') }),
  },
]
