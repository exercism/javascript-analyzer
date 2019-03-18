import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"

import traverser from 'eslint/lib/util/traverser'

export function extractAll<T extends Node = Node>(root: Node, type: Node['type']): T[] {
  const results: T[] = []

  traverser.traverse(root, {
    enter(node: Node) {
      if (node.type === type) {
        results.push(node as T)
      }
    }
  })

  return results
}
