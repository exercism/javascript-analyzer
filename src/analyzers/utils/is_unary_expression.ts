import { Node, UnaryExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function isUnaryExpression(node: Node, operator?: string): node is UnaryExpression {
  return node.type === AST_NODE_TYPES.UnaryExpression && (
       operator === undefined
    || node.operator === operator
  )
}
