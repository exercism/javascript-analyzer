import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'

declare type Node = TSESTree.Node
export declare type Literal = TSESTree.Literal
export declare type LiteralValue =
  | string
  | number
  | boolean
  | RegExp
  | bigint
  | null

export function guardLiteralCaseInsensitive(
  node: Node,
  value?: LiteralValue,
  raw?: string
): node is Literal {
  return (
    node.type === AST_NODE_TYPES.Literal &&
    (value === undefined ||
      String(node.value).toLocaleUpperCase() ===
        String(value).toLocaleUpperCase()) &&
    (raw === undefined ||
      node.raw.toLocaleUpperCase() === raw.toLocaleUpperCase())
  )
}
