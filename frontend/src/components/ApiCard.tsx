import { useState } from 'react'
import type { ApiDef, ApiResult } from '../apis/types'

function initialValues(def: ApiDef): Record<string, string> {
  const values: Record<string, string> = {}
  for (const param of def.params ?? []) {
    values[param.key] = param.defaultValue ?? ''
  }
  if (def.needsKey) values.apiKey = ''
  return values
}

function ResultView({ result }: { result: ApiResult }) {
  if (result.kind === 'image') {
    return (
      <div className="api-result api-result-image">
        <img src={result.imageUrl} alt="" loading="lazy" />
      </div>
    )
  }
  if (result.kind === 'text') {
    return (
      <div className="api-result api-result-text">
        <p>{result.text}</p>
      </div>
    )
  }
  return (
    <div className="api-result api-result-json">
      <pre>{JSON.stringify(result.data, null, 2)}</pre>
    </div>
  )
}

export function ApiCard({ def }: { def: ApiDef }) {
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(def))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ApiResult | null>(null)

  const setValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleRun = async () => {
    if (!def.run) return
    if (def.needsKey && !values.apiKey?.trim()) {
      setError(`${def.keyLabel ?? 'APIキー'}を入力してください`)
      setResult(null)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await def.run(values)
      setResult(res)
    } catch (e) {
      setResult(null)
      setError(e instanceof Error ? e.message : '取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`api-card${def.unavailable ? ' api-card-unavailable' : ''}`}>
      <div className="api-card-head">
        <h3>{def.name}</h3>
        {def.local && <span className="api-badge api-badge-local">ローカル生成</span>}
        {def.needsKey && <span className="api-badge api-badge-key">キー必要</span>}
        {def.unavailable && <span className="api-badge api-badge-dead">利用不可</span>}
      </div>
      <p className="api-card-desc">{def.description}</p>

      {def.unavailable ? (
        <p className="api-card-note api-card-note-dead">{def.unavailable}</p>
      ) : (
        <>
          {def.note && <p className="api-card-note">{def.note}</p>}

          {(def.params?.length || def.needsKey) && (
            <div className="api-card-params">
              {def.params?.map((param) => (
                <label key={param.key} className="api-param">
                  <span>{param.label}</span>
                  {param.options ? (
                    <select
                      value={values[param.key] ?? ''}
                      onChange={(e) => setValue(param.key, e.target.value)}
                    >
                      {param.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={values[param.key] ?? ''}
                      placeholder={param.placeholder}
                      onChange={(e) => setValue(param.key, e.target.value)}
                    />
                  )}
                </label>
              ))}
              {def.needsKey && (
                <label className="api-param">
                  <span>{def.keyLabel ?? 'APIキー'}</span>
                  <input
                    type="text"
                    value={values.apiKey ?? ''}
                    placeholder={def.keyPlaceholder}
                    onChange={(e) => setValue('apiKey', e.target.value)}
                  />
                </label>
              )}
            </div>
          )}

          <button className="api-fetch-btn" onClick={handleRun} disabled={loading}>
            {loading ? '取得中…' : def.local ? '生成する' : '取得する'}
          </button>

          {error && <p className="api-error">{error}</p>}
          {result && <ResultView result={result} />}
        </>
      )}
    </div>
  )
}
