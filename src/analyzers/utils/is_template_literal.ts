import { Node, TemplateLiteral } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function isTemplateLiteral(node: Node, quasis?: string[], value?: string): node is TemplateLiteral {
  return node.type === AST_NODE_TYPES.TemplateLiteral
    && (quasis === undefined || node.quasis.every((q, i) => quasis[i] === q.value.raw))
}
