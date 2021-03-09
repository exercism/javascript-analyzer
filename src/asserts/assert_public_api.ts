import { ExtractedExport, ExtractedFunction } from '@exercism/static-analysis'
import { assertNamedExport } from './assert_named_export'
import { assertNamedFunction } from './assert_named_function'

export function assertPublicApi(
  exported: string,
  exports: ExtractedExport[],
  functions: ExtractedFunction[]
): ExtractedFunction {
  const namedExport = assertNamedExport(exported, exports)
  return assertNamedFunction(namedExport.local, functions)
}
