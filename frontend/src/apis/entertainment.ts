import type { ApiDef } from './types'
import { fetchJson, randomInt } from './utils'

const CATEGORY = 'エンタメ・カルチャー系'

export const entertainmentApis: ApiDef[] = [
  {
    id: 'studio-ghibli',
    category: CATEGORY,
    name: 'Studio Ghibli API',
    description: 'ジブリ映画のデータベースを取得します。',
    note: '本家herokuapp版が終了しているため、vercel版ミラーを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://ghibliapi.vercel.app/films') }),
  },
  {
    id: 'rick-and-morty',
    category: CATEGORY,
    name: 'Rick and Morty API',
    description: 'リック・アンド・モーティのキャラクター情報を取得します。',
    run: async () => {
      const id = randomInt(1, 826)
      return { kind: 'json', data: await fetchJson(`https://rickandmortyapi.com/api/character/${id}`) }
    },
  },
  {
    id: 'pokeapi',
    category: CATEGORY,
    name: 'Pokéapi',
    description: 'ポケモンの詳細データを取得します。',
    run: async () => {
      const id = randomInt(1, 1010)
      return { kind: 'json', data: await fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`) }
    },
  },
  {
    id: 'swapi',
    category: CATEGORY,
    name: 'Star Wars API (SWAPI)',
    description: 'スター・ウォーズの世界観データを取得します。',
    run: async () => {
      const id = randomInt(1, 83)
      return { kind: 'json', data: await fetchJson(`https://swapi.dev/api/people/${id}/`) }
    },
  },
  {
    id: 'marvel-api',
    category: CATEGORY,
    name: 'Marvel API',
    description: 'マーベルキャラクター情報を取得します(要登録)。',
    unavailable:
      '公開鍵と秘密鍵によるハッシュ署名が必要な仕様で、秘密鍵をフロントエンドに置くと漏洩するため未対応です。',
  },
  {
    id: 'breaking-bad-quotes',
    category: CATEGORY,
    name: 'Breaking Bad Quotes API',
    description: 'ブレイキング・バッドの名台詞を取得します。',
    note: 'サーバーの応答が遅い・不安定な場合があります。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.breakingbadquotes.xyz/v1/quotes') }),
  },
  {
    id: 'lotr-api',
    category: CATEGORY,
    name: 'The Lord of the Rings API',
    description: '指輪物語の登場人物・書籍情報を取得します。',
    needsKey: true,
    keyLabel: 'アクセストークン',
    keyPlaceholder: 'the-one-api.dev で無料登録して取得したトークン',
    run: async (v) => ({
      kind: 'json',
      data: await fetchJson('https://the-one-api.dev/v2/movie', {
        headers: { Authorization: `Bearer ${v.apiKey}` },
      }),
    }),
  },
  {
    id: 'harry-potter-api',
    category: CATEGORY,
    name: 'Harry Potter API (PotterAPI)',
    description: 'ハリー・ポッターの呪文・キャラクター情報を取得します。',
    note: '公式版はキーが必要なため、キー不要の互換ミラーを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://potterapi-fedeperin.vercel.app/en/characters') }),
  },
  {
    id: 'anime-chan',
    category: CATEGORY,
    name: 'Anime Chan API',
    description: 'アニメの名言集を取得します。',
    note: '旧ドメイン(animechan.xyz)が終了しているため、後継のanimechan.ioを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.animechan.io/v1/quotes/random') }),
  },
  {
    id: 'jikan-api',
    category: CATEGORY,
    name: 'Jikan API (MyAnimeList非公式)',
    description: 'アニメ・漫画情報を取得します。',
    note: 'MyAnimeList側が混雑している場合、504エラーになることがあります。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://api.jikan.moe/v4/random/anime') }),
  },
]
