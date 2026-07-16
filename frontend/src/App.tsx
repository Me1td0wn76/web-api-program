import { useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

type BaseResponse = {
  decimal: string
  base: number
  result: string
  digits: number[]
  digitCount: number
  generatedAt: string
}

function App() {
  const [base, setBase] = useState<number>(16)
  const [data, setData] = useState<BaseResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchBase() {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch(`https://me1td0wn76.github.io/web-api-js/base/${base}/`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: BaseResponse = await res.json()
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>進数変換 APIの表示</h1>
          <p>指定した進数に変換された結果を表示します</p>
        </div>

        <div className="controls">
          <label htmlFor="base-input">変換する進数 (2〜1023)</label>
          <input
            id="base-input"
            type="number"
            min={2}
            max={1023}
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
          />
          <button
            type="button"
            className="fetch-btn"
            onClick={fetchBase}
            disabled={loading || base < 2 || base > 1023}
          >
            {loading ? '取得中...' : '取得'}
          </button>
        </div>

        {error && <p className="error">エラー: {error}</p>}

        {data && (
          <table className="result-table">
            <tbody>
              <tr>
                <th>decimal</th>
                <td>{data.decimal}</td>
              </tr>
              <tr>
                <th>base</th>
                <td>{data.base}</td>
              </tr>
              <tr>
                <th>result</th>
                <td className="mono">{data.result}</td>
              </tr>
              <tr>
                <th>digits</th>
                <td className="mono">[{data.digits.join(', ')}]</td>
              </tr>
              <tr>
                <th>digitCount</th>
                <td>{data.digitCount}</td>
              </tr>
              <tr>
                <th>generatedAt</th>
                <td>{data.generatedAt}</td>
              </tr>
            </tbody>
          </table>
        )}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
