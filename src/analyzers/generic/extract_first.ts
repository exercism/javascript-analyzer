import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"

import traverser from 'eslint/lib/util/traverser'

export function extractFirst<T extends Node = Node>(root: Node, type: Node['type']): T | undefined {
  let result: T | undefined = undefined

  traverser.traverse(root, {
    enter(node: Node) {
      if (node.type === type) {
        result = node as T
        this.break()
      }
    }
  })

  return result
}
