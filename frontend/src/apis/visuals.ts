import type { ApiDef } from './types'
import { bust, fetchJson } from './utils'

const CATEGORY = '画像・GIF・ビジュアル系'

export const visualApis: ApiDef[] = [
  {
    id: 'picsum',
    category: CATEGORY,
    name: 'Picsum Photos (Lorem Picsum)',
    description: 'ランダムなダミー写真を返します。',
    run: async () => ({ kind: 'image', imageUrl: bust('https://picsum.photos/400/300') }),
  },
  {
    id: 'dicebear',
    category: CATEGORY,
    name: 'DiceBear Avatars',
    description: 'シード文字列からランダムなアバター画像を生成します。',
    params: [
      {
        key: 'style',
        label: 'スタイル',
        options: ['adventurer', 'bottts', 'pixel-art', 'thumbs', 'micah', 'lorelei'],
        defaultValue: 'adventurer',
      },
      { key: 'seed', label: 'シード', defaultValue: 'workstation' },
    ],
    run: async (v) => {
      const style = v.style || 'adventurer'
      const seed = v.seed?.trim() || 'seed'
      return {
        kind: 'image',
        imageUrl: bust(`https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`),
      }
    },
  },
  {
    id: 'robohash',
    category: CATEGORY,
    name: 'Robohash',
    description: '文字列からロボット風アバターを生成します。',
    params: [{ key: 'text', label: 'テキスト', defaultValue: 'workstation' }],
    run: async (v) => {
      const text = v.text?.trim() || 'robot'
      return { kind: 'image', imageUrl: bust(`https://robohash.org/${encodeURIComponent(text)}.png`) }
    },
  },
  {
    id: 'ui-avatars',
    category: CATEGORY,
    name: 'UI Avatars',
    description: 'イニシャルからアバター画像を生成します。',
    params: [{ key: 'name', label: '名前', defaultValue: 'Taro Yamada' }],
    run: async (v) => {
      const name = v.name?.trim() || 'User'
      return { kind: 'image', imageUrl: bust(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`) }
    },
  },
  {
    id: 'placeholder-com',
    category: CATEGORY,
    name: 'Placeholder.com',
    description: 'サイズ指定でプレースホルダー画像を返します。',
    note: 'via.placeholder.com がサービス終了しているため、後継のplacehold.coを使用しています。',
    params: [{ key: 'size', label: 'サイズ', defaultValue: '300x200' }],
    run: async (v) => {
      const size = v.size?.trim() || '300x200'
      return { kind: 'image', imageUrl: bust(`https://placehold.co/${encodeURIComponent(size)}`) }
    },
  },
  {
    id: 'this-person-does-not-exist',
    category: CATEGORY,
    name: 'This Person Does Not Exist',
    description: 'AI生成の存在しない人物の顔画像を返します。',
    run: async () => ({
      kind: 'image',
      imageUrl: bust('https://thispersondoesnotexist.com/random-person.jpeg'),
    }),
  },
  {
    id: 'waifu-pics',
    category: CATEGORY,
    name: 'Waifu.pics',
    description: 'アニメ風画像をランダムに取得します。',
    unavailable: 'ドメインが第三者(ギャンブルサイト)に転売されているのを確認したため、安全のため無効化しています。',
  },
  {
    id: 'nekos-life',
    category: CATEGORY,
    name: 'Nekos.life',
    description: 'ネコ耳キャラのGIF・画像を返します。',
    note: 'nekos.lifeは2021年に終了したため後継のnekos.bestを使用していますが、現在応答が不安定なようです。',
    run: async () => {
      const data = (await fetchJson('https://nekos.best/api/v2/neko')) as {
        results: Array<{ url: string }>
      }
      return { kind: 'image', imageUrl: data.results[0].url }
    },
  },
  {
    id: 'bored-api',
    category: CATEGORY,
    name: 'Boredom API (Bored API)',
    description: '暇つぶしのアイデアを提案します。',
    note: '本家boredapi.comが終了したため、後継のbored-api.appbrewery.comを使用しています。',
    run: async () => ({ kind: 'json', data: await fetchJson('https://bored-api.appbrewery.com/random') }),
  },
]
