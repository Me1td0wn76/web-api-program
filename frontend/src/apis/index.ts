// Aggregates every category file into the single flat list App.tsx renders,
// and derives the category tab list from whatever categories actually exist
// (so adding a new category file is enough — no separate list to keep in sync).
import { animalApis } from './animals'
import { jokeApis } from './jokes'
import { quoteApis } from './quotes'
import { visualApis } from './visuals'
import { triviaApis } from './trivia'
import { entertainmentApis } from './entertainment'
import { musicApis } from './music'
import { geoApis } from './geo'
import { utilityApis } from './utility'
import { funApis } from './fun'
import type { ApiDef } from './types'

export type { ApiDef, ApiParam, ApiResult, ResultKind } from './types'

export const allApis: ApiDef[] = [
  ...animalApis,
  ...jokeApis,
  ...quoteApis,
  ...visualApis,
  ...triviaApis,
  ...entertainmentApis,
  ...musicApis,
  ...geoApis,
  ...utilityApis,
  ...funApis,
]

export const categories: string[] = Array.from(new Set(allApis.map((api) => api.category)))
