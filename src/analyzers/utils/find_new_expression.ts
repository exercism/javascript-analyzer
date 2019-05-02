import { Node, NewExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"
import { findFirst } from "./find_first"
import { isIdentifier } from "./is_identifier"

export const isNewExpression = (node: Node): node is NewExpression => node.type === AST_NODE_TYPES.NewExpression

export function findNewExpression(root: Node, className: string): NewExpression | undefined {
  const isNewClass = (node: Node) => isNewExpression(node) && isIdentifier(node.callee, className)
  return findFirst(root, isNewClass) as NewExpression | undefined
}
