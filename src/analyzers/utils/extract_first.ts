import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { findFirstOfType } from "./find_first_of_type"

export function extractFirst<T extends Node = Node>(root: Node, type: Node['type']): T | undefined {
  return findFirstOfType<T>(root, type)
}
