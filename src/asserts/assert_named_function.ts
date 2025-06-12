import {
  type ExtractedFunction,
  NoMethodError,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { extractNamedFunction } from '~src/extracts/extract_named_function.js'

type Node = TSESTree.Node

export function assertNamedFunction(
  name: string,
  root: Node
): ExtractedFunction | never
export function assertNamedFunction(
  name: string,
  functions: readonly ExtractedFunction[]
): ExtractedFunction | never

export function assertNamedFunction(
  name: string,
  root: Node | readonly ExtractedFunction[]
): ExtractedFunction | never {
  // Find the function
  const fn = Array.isArray(root)
    ? (root as readonly ExtractedFunction[]).find((fn) => fn.name === name)
    : extractNamedFunction(name, root as Node)

  // Does it exist?
  if (!fn) {
    throw new NoMethodError(name)
  }

  return fn
}
