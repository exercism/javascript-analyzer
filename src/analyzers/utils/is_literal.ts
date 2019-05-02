import { Node, Literal } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

export function isLiteral(node: Node, value?: string | number | boolean | RegExp | null, raw?: string): node is Literal {
  return node.type === AST_NODE_TYPES.Literal
    && (value === undefined || node.value === value)
    && (raw === undefined || node.raw === raw)
}
