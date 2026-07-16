export type ResultKind = 'json' | 'image' | 'text'

export interface ApiResult {
  kind: ResultKind
  data?: unknown
  text?: string
  imageUrl?: string
}

export interface ApiParam {
  key: string
  label: string
  defaultValue?: string
  placeholder?: string
  options?: string[]
}

export interface ApiDef {
  id: string
  category: string
  name: string
  description: string
  /** Info note shown even when the API works (rate limits, mirrors used, etc). */
  note?: string
  /** When set, the card is shown as disabled with this reason instead of a working button. */
  unavailable?: string
  /** When set, this is a client-side simulation rather than a real network call. */
  local?: boolean
  params?: ApiParam[]
  needsKey?: boolean
  keyLabel?: string
  keyPlaceholder?: string
  run?: (values: Record<string, string>) => Promise<ApiResult>
}
