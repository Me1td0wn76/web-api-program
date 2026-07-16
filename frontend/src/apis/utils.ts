export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pick<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

/** Appends a cache-busting query param so direct <img> style URLs reload on each click. */
export function bust(url: string): string {
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}_=${Date.now()}`
}

export async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchText(url: string, init?: RequestInit): Promise<string> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

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
