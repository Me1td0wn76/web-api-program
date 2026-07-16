// Shared type definitions for the API catalog. Every category file under
// src/apis/*.ts exports an array of ApiDef, which ApiCard renders generically
// (one card component handles all ~70 APIs instead of one component per API).

/** Which part of ApiResult holds the payload, and therefore how ApiCard should render it. */
export type ResultKind = 'json' | 'image' | 'text'

/** What an ApiDef's run() resolves to; only the field matching `kind` is expected to be set. */
export interface ApiResult {
  kind: ResultKind
  data?: unknown
  text?: string
  imageUrl?: string
}

/** A single user-editable input rendered above the "取得する" button. */
export interface ApiParam {
  key: string
  label: string
  defaultValue?: string
  placeholder?: string
  /** When set, renders as a <select> instead of a free-text <input>. */
  options?: string[]
}

/** Describes one catalog entry: what it is, how to call it, and how to render the result. */
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
  /** When true, ApiCard renders an extra key/token input and blocks run() until it's filled in. */
  needsKey?: boolean
  keyLabel?: string
  keyPlaceholder?: string
  /** Fetches (or generates) one result. Absent only for `unavailable` entries. */
  run?: (values: Record<string, string>) => Promise<ApiResult>
}
