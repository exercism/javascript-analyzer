import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

type Node = TSESTree.Node
type BinaryExpression = TSESTree.BinaryExpression
type BinaryOperator = BinaryExpression['operator']
type BinaryExpressionWithOperator<T extends BinaryOperator> = BinaryExpression & { operator: T }

export function isBinaryExpression(node: Node): node is BinaryExpression
export function isBinaryExpression<T extends BinaryOperator>(node: Node, operator: T): node is BinaryExpressionWithOperator<T>
export function isBinaryExpression(node: Node, operator?: string): node is BinaryExpression {
  return node.type === AST_NODE_TYPES.BinaryExpression && (
    operator === undefined
    || node.operator === operator
  )
}
