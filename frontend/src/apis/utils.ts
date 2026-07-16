// Small fetch/random helpers shared by every file in src/apis/*.ts.

/** Random integer in [min, max], inclusive on both ends. */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Picks one random element from a non-empty array. */
export function pick<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

/** Appends a cache-busting query param so direct <img> style URLs reload on each click. */
export function bust(url: string): string {
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}_=${Date.now()}`
}

/** fetch() + JSON parse, normalized to throw a short `HTTP <status>` error on non-2xx. */
export async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

/** Same as fetchJson but for endpoints that return plain text instead of JSON. */
export async function fetchText(url: string, init?: RequestInit): Promise<string> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

// Ensures every fetchJsonp() call gets its own unique global callback name,
// so overlapping requests never clobber each other's callback.
let jsonpCounter = 0

/** Loads a JSONP endpoint via a temporary <script> tag, for APIs that don't send CORS headers. */
export function fetchJsonp(url: string, callbackParam = 'callback'): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const callbackName = `__jsonp_cb_${Date.now()}_${jsonpCounter++}`
    const script = document.createElement('script')
    const globalWindow = window as unknown as Record<string, unknown>

    const cleanup = () => {
      delete globalWindow[callbackName]
      script.remove()
    }

    const timeout = setTimeout(() => {
      cleanup()
      reject(new Error('JSONP timeout'))
    }, 10000)

    // The remote script is expected to call this global function with its payload
    // (e.g. `cb123({...})`), which is how JSONP smuggles data past the same-origin policy.
    globalWindow[callbackName] = (data: unknown) => {
      clearTimeout(timeout)
      cleanup()
      resolve(data)
    }

    const sep = url.includes('?') ? '&' : '?'
    script.src = `${url}${sep}${callbackParam}=${callbackName}`
    script.onerror = () => {
      clearTimeout(timeout)
      cleanup()
      reject(new Error('JSONPの読み込みに失敗しました'))
    }
    document.body.appendChild(script)
  })
}
