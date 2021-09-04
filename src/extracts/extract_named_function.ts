import type { TSESTree } from '@typescript-eslint/typescript-estree'
import type { ExtractedFunction } from '@exercism/static-analysis'
import { extractFunctions } from '@exercism/static-analysis'

type Node = TSESTree.Node

export function extractNamedFunction(
  name: string,
  root: Node
): ExtractedFunction | undefined {
  return extractFunctions(root).find((parsed) => parsed.name === name)
}
