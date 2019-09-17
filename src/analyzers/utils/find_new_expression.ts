import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree"
import { findFirst } from "./find_first"
import { isIdentifier } from "./is_identifier"


type Node = TSESTree.Node
type NewExpression = TSESTree.NewExpression
type NewExpressionWithName<T extends string> = NewExpression & { callee: TSESTree.Identifier & { name: T }}

export function isNewExpression(node: Node): node is NewExpression
export function isNewExpression<T extends string>(node: Node, className: T): node is NewExpressionWithName<T>
export function isNewExpression<T extends string>(node: Node, className?: T): node is NewExpression {
  return node.type === AST_NODE_TYPES.NewExpression && (!className || isIdentifier(node.callee, className))
}

export function findNewExpression<T extends string>(root: Node, className: T): NewExpressionWithName<T> | undefined {
  const isNewClass = (node: Node): boolean => isNewExpression(node) && isIdentifier(node.callee, className)
  return findFirst(root, isNewClass) as NewExpressionWithName<T> | undefined
}
