import { ExtractedExport, NoExportError } from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { extractNamedExport } from '~src/extracts/extract_named_export'

type Node = TSESTree.Node

export function assertNamedExport(
  exported: string,
  root: Node
): ExtractedExport | never
export function assertNamedExport(
  exported: string,
  exports: readonly ExtractedExport[]
): ExtractedExport | never

export function assertNamedExport(
  exported: string,
  root: Node | readonly ExtractedExport[]
): ExtractedExport | never {
  // Find the export
  const fn = Array.isArray(root)
    ? root.find((fn) => fn.exported === exported)
    : extractNamedExport(exported, root as Node)

  // Does it exist?
  if (!fn) {
    throw new NoExportError(exported)
  }

  return fn
}
