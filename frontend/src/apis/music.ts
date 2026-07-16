import type { ApiDef } from './types'
import { fetchJson, fetchJsonp } from './utils'

const CATEGORY = '音楽系'

const FULLWIDTH_MAP: Record<string, string> = { ' ': '　' }

function toAesthetic(input: string): string {
  return Array.from(input)
    .map((ch) => {
      const code = ch.codePointAt(0) ?? 0
      if (code >= 0x21 && code <= 0x7e) {
        return String.fromCodePoint(code - 0x21 + 0xff01)
      }
      return FULLWIDTH_MAP[ch] ?? ch
    })
    .join('')
}

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
  {
    id: 'vaporwave-aesthetic',
    category: CATEGORY,
    name: 'Vaporwave/Aesthetic API系(非公式)',
    description: '曲名生成ネタAPI。',
    local: true,
    note: '安定した公開APIが見つからなかったため、入力文字をVaporwave風の全角文字に変換するローカル処理で代替しています。',
    params: [{ key: 'text', label: 'テキスト', defaultValue: 'aesthetic' }],
    run: async (v) => {
      const text = v.text?.trim() || 'aesthetic'
      return { kind: 'text', text: toAesthetic(text) }
    },
  },
]
