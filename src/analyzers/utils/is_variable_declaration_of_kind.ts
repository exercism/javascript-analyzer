import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

type Node = TSESTree.Node
type Kind = TSESTree.VariableDeclaration["kind"]

type VariableDeclarationOfKind<T extends Kind> = TSESTree.VariableDeclaration & { kind: T }

export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['var']): node is VariableDeclarationOfKind<'var'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['const', 'var']): node is VariableDeclarationOfKind<'const' | 'var'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['const']): node is VariableDeclarationOfKind<'const'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['let','const', 'var']): node is VariableDeclarationOfKind<'let' | 'const' | 'var'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['let', 'var']): node is VariableDeclarationOfKind<'let' | 'var'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['let', 'const']): node is VariableDeclarationOfKind<'let' | 'const'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly ['let']): node is VariableDeclarationOfKind<'let'>
export function isVariableDeclarationOfKind(node: Node, kinds: readonly Kind[]): node is VariableDeclarationOfKind<Kind> {
  if (node.type !== AST_NODE_TYPES.VariableDeclaration || !kinds.includes(node.kind)) {
    return false
  }

  return true
}
