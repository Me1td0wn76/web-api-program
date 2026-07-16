import type { ApiDef } from './types'
import { fetchJson } from './utils'

const CATEGORY = '天気・時間・地理系'

export const geoApis: ApiDef[] = [
  {
    id: 'open-meteo',
    category: CATEGORY,
    name: 'Open-Meteo',
    description: '完全無料の天気予報APIです。',
    params: [
      { key: 'lat', label: '緯度', defaultValue: '35.68' },
      { key: 'lon', label: '経度', defaultValue: '139.69' },
    ],
    run: async (v) => {
      const lat = v.lat?.trim() || '35.68'
      const lon = v.lon?.trim() || '139.69'
      return {
        kind: 'json',
        data: await fetchJson(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        ),
      }
    },
  },
  {
    id: 'worldtimeapi',
    category: CATEGORY,
    name: 'WorldTimeAPI',
    description: '世界各地の現在時刻を取得します。',
    note: 'worldtimeapi.orgが不安定なため、後継のtimeapi.ioを使用しています。',
    params: [{ key: 'zone', label: 'タイムゾーン', defaultValue: 'Asia/Tokyo' }],
    run: async (v) => {
      const zone = encodeURIComponent(v.zone?.trim() || 'Asia/Tokyo')
      return {
        kind: 'json',
        data: await fetchJson(`https://timeapi.io/api/time/current/zone?timeZone=${zone}`),
      }
    },
  },
  {
    id: 'ip-api',
    category: CATEGORY,
    name: 'IP-API',
    description: 'IPアドレスから位置情報を取得します。',
    note: 'ip-api.comの無料版はHTTP専用でMixed Contentになるため、HTTPS対応のipwho.isを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://ipwho.is/') }),
  },
  {
    id: 'sunrise-sunset',
    category: CATEGORY,
    name: 'Sunrise-Sunset API',
    description: '日の出・日の入り時刻を取得します。',
    params: [
      { key: 'lat', label: '緯度', defaultValue: '35.68' },
      { key: 'lng', label: '経度', defaultValue: '139.69' },
    ],
    run: async (v) => {
      const lat = v.lat?.trim() || '35.68'
      const lng = v.lng?.trim() || '139.69'
      return {
        kind: 'json',
        data: await fetchJson(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`),
      }
    },
  },
  {
    id: 'zippopotam',
    category: CATEGORY,
    name: 'Zippopotam.us',
    description: '郵便番号から地域情報を取得します(米国の例)。',
    params: [{ key: 'zip', label: '郵便番号(米国)', defaultValue: '90210' }],
    run: async (v) => {
      const zip = v.zip?.trim() || '90210'
      return { kind: 'json', data: await fetchJson(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`) }
    },
  },
]
