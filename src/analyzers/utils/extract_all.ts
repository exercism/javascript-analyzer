import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { findAll } from "./find_all"

export function extractAll<T extends Node = Node>(root: Node, type: Node['type']): T[] {
  return findAll(root, (node): node is T => node.type === type) as T[]
}
