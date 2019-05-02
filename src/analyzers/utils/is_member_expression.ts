import { Node, MemberExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isIdentifier } from "./is_identifier";
import { isLiteral } from "./is_literal";

export function isMemberExpression(node: Node, object?: string, property?: string): node is MemberExpression {
  return node.type === AST_NODE_TYPES.MemberExpression
    && (object === undefined || isIdentifier(node.object, object))
    && (property === undefined || isIdentifier(node.property, property) || isLiteral(node.property, property))
}
