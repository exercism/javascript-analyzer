import { Node, BinaryExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function isBinaryExpression(node: Node, operator?: string): node is BinaryExpression {
  return node.type === AST_NODE_TYPES.BinaryExpression && (
       operator === undefined
    || node.operator === operator
  )
}
