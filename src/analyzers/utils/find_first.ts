import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { traverse, Traverser } from 'eslint/lib/util/traverser'

/**
 * Find the first note (starting at root) that matches the given predicate.
 *
 * @example find the first literal
 *
 * findFirst(program, isLiteral)
 *
 * @example find the first multiplication
 *
 * findFirst(program, (node) => isBinaryExpression(node, '*'))
 *
 * @param root the root to start traversing from
 * @param predicate predicate function that gets the traverse as bound this
 * @returns the node that returns true for the predicate or undefined
 */
export function findFirst(root: Node, predicate: (this: Traverser , node: Node) => boolean): Node | undefined {
  let result: Node | undefined = undefined

  traverse(root, {
    enter(node: Node) {
      if (predicate.call(this, node)) {
        result = node
        this.break()
      }
    }
  })

  return result
}
