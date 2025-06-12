import type { ExtractedFunction } from '@exercism/static-analysis'
import { type ExtractedExport } from '@exercism/static-analysis'
import { assertNamedExport } from './assert_named_export.js'
import { assertNamedFunction } from './assert_named_function.js'

export function assertPublicApi(
  exported: string,
  exports: ExtractedExport[],
  functions: ExtractedFunction[]
): ExtractedFunction {
  const namedExport = assertNamedExport(exported, exports)
  return assertNamedFunction(namedExport.local, functions)
}
