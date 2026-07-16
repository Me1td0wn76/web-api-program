import type { ApiDef } from './types'
import { fetchJson, randomInt } from './utils'

// エンタメ・カルチャー系: fictional-universe database APIs (anime, movies, games).
// Marvel API, Breaking Bad Quotes API and The Lord of the Rings API were dropped:
// Marvel's auth scheme needs a private key that can't be exposed in frontend code,
// the LOTR API requires a free but manually-issued bearer token, and Breaking Bad
// Quotes consistently failed to fetch.
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
