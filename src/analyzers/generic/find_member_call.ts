import { Node, CallExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"
import { findFirst } from "./find_first"
import { isMemberExpression } from "./is_member_expression"

export const isCallExpression = (node: Node): node is CallExpression => node.type === AST_NODE_TYPES.CallExpression

export function findMemberCall(root: Node, object: string, property: string): CallExpression | undefined {
  const isMemberCall = (node: Node) => isCallExpression(node) && isMemberExpression(node.callee, object, property)
  return findFirst(root, isMemberCall) as CallExpression | undefined
}
