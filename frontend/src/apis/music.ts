import type { ApiDef } from './types'
import { fetchJson, fetchJsonp } from './utils'

const CATEGORY = '音楽系'

export const musicApis: ApiDef[] = [
  {
    id: 'lyrics-ovh',
    category: CATEGORY,
    name: 'Lyrics.ovh',
    description: '曲名とアーティストから歌詞を取得します。',
    params: [
      { key: 'artist', label: 'アーティスト', defaultValue: 'Coldplay' },
      { key: 'title', label: '曲名', defaultValue: 'Yellow' },
    ],
    run: async (v) => {
      const artist = encodeURIComponent(v.artist?.trim() || 'Coldplay')
      const title = encodeURIComponent(v.title?.trim() || 'Yellow')
      return { kind: 'json', data: await fetchJson(`https://api.lyrics.ovh/v1/${artist}/${title}`) }
    },
  },
  {
    id: 'itunes-search',
    category: CATEGORY,
    name: 'iTunes Search API',
    description: 'iTunesの楽曲を検索します(キー不要)。',
    params: [{ key: 'term', label: '検索語', defaultValue: 'Coldplay' }],
    run: async (v) => {
      const term = encodeURIComponent(v.term?.trim() || 'Coldplay')
      return { kind: 'json', data: await fetchJson(`https://itunes.apple.com/search?term=${term}&limit=5`) }
    },
  },
  {
    id: 'deezer-api',
    category: CATEGORY,
    name: 'Deezer API',
    description: '音楽情報を検索します。',
    note: 'DeezerはCORS非対応のため、JSONP経由で取得しています。',
    params: [{ key: 'q', label: '検索語', defaultValue: 'Coldplay' }],
    run: async (v) => {
      const q = encodeURIComponent(v.q?.trim() || 'Coldplay')
      return { kind: 'json', data: await fetchJsonp(`https://api.deezer.com/search?q=${q}&output=jsonp`) }
    },
  },
]
