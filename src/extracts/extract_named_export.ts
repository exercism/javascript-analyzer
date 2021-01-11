import { TSESTree } from '@typescript-eslint/typescript-estree'
import { extractExports, ExtractedExport } from '@exercism/static-analysis'

type Node = TSESTree.Node

export function extractNamedExport(
  exportedName: string,
  root: Node
): ExtractedExport | undefined {
  const exportItems = extractExports(root)
  return exportItems.find((item) => item.exported === exportedName)
}
