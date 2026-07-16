import { useMemo, useState } from 'react'
import './App.css'
import { allApis, categories } from './apis'
import { ApiCard } from './components/ApiCard'

// Top-level page: a search box + category tabs that filter `allApis`, rendered as
// a grid of generic ApiCard instances. See src/apis/index.ts for how the catalog
// is assembled and src/apis/types.ts for the ApiDef shape each card is driven by.

const ALL_LABEL = 'すべて'

function App() {
  const [category, setCategory] = useState(ALL_LABEL)
  const [query, setQuery] = useState('')

  // Recomputed only when the tab or search text changes, not on every render/keystroke elsewhere.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allApis.filter((api) => {
      const matchesCategory = category === ALL_LABEL || api.category === category
      const matchesQuery =
        !q || api.name.toLowerCase().includes(q) || api.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <section id="center">
      <h1>雑多API図鑑</h1>
      <p className="subtitle">
        動物・ジョーク・名言・エンタメなど、約100個の無料公開APIをブラウザから直接叩いて遊べます。
      </p>

      <input
        className="search-box"
        type="text"
        placeholder="API名や説明で検索…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="category-tabs">
        <button
          className={category === ALL_LABEL ? 'active' : ''}
          onClick={() => setCategory(ALL_LABEL)}
        >
          {ALL_LABEL} ({allApis.length})
        </button>
        {categories.map((c) => (
          <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>
            {c} ({allApis.filter((api) => api.category === c).length})
          </button>
        ))}
      </div>

      <div className="api-grid">
        {filtered.map((api) => (
          <ApiCard key={api.id} def={api} />
        ))}
      </div>
    </section>
  )
}

export default App
