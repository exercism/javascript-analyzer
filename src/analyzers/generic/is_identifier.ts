import { Node, Identifier } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

export function isIdentifier(node: Node, name?: string): node is Identifier {
  return node.type === AST_NODE_TYPES.Identifier && (
       name === undefined
    || node.name === name
  )
}
