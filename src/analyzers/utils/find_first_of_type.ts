import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { findFirst } from "./find_first"

export function findFirstOfType<T extends Node = Node>(root: Node, type: Node['type']): T | undefined {
  const isOfType = (node: Node): node is T => node.type === type
  return findFirst(root, isOfType) as T | undefined
}
