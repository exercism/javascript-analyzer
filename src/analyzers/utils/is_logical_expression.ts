import { Node, LogicalExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function isLogicalExpression(node: Node, operator?: string): node is LogicalExpression {
  return node.type === AST_NODE_TYPES.LogicalExpression && (
       operator === undefined
    || node.operator === operator
  )
}
