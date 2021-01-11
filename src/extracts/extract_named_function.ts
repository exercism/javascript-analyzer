import { TSESTree } from '@typescript-eslint/typescript-estree'
import { extractFunctions, ExtractedFunction } from '@exercism/static-analysis'

type Node = TSESTree.Node

export function extractNamedFunction(
  name: string,
  root: Node
): ExtractedFunction | undefined {
  return extractFunctions(root).find((parsed) => parsed.name === name)
}
