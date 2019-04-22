import { Node, CallExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isMemberExpression } from "./is_member_expression";

export function isCallExpression(node: Node, object?: string, property?: string): node is CallExpression {
  return node.type === AST_NODE_TYPES.CallExpression
    && isMemberExpression(node.callee, object, property)
}
