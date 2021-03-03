import { guardIdentifier } from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { extractNamedFunction } from '~src/extracts/extract_named_function'

type Program = TSESTree.Program
type Node = TSESTree.Node

type ArrowFunctionExpression = TSESTree.ArrowFunctionExpression
type FunctionDeclaration = TSESTree.FunctionDeclaration
type FunctionExpression = TSESTree.FunctionExpression
type Identifier = TSESTree.Identifier

type AnyMainMethodNode =
  | FunctionDeclaration
  | ArrowFunctionExpression
  | FunctionExpression

/**
 * @deprecated use extractNamedFunction instead
 */
export type MainMethod<
  T extends string = string,
  TNode extends AnyMainMethodNode = AnyMainMethodNode
> = {
  id: Identifier & { name: T }
  parent: undefined | Node
} & TNode

export function extractMainMethod<T extends string = string>(
  program: Program,
  name: T
): MainMethod<T> | undefined {
  const fn = extractNamedFunction(name, program)
  if (!fn) {
    return undefined
  }

  const { node } = fn

  switch (node.type) {
    case AST_NODE_TYPES.FunctionDeclaration: {
      if (!guardIdentifier(node.id)) {
        return undefined
      }

      return {
        ...node,
        parent: undefined,
        id: node.id as Identifier & { name: T },
      }
    }
    case AST_NODE_TYPES.ArrowFunctionExpression: {
      const { id, ...rest } = node

      return {
        ...rest,
        id: {
          type: AST_NODE_TYPES.Identifier,
          name,
          loc: node.loc,
          range: node.range,
        },
      } as MainMethod<T, ArrowFunctionExpression>
    }
    case AST_NODE_TYPES.FunctionExpression: {
      const { id, ...rest } = node

      return {
        ...rest,
        id: {
          type: AST_NODE_TYPES.Identifier,
          name,
          loc: node.loc,
          range: node.range,
        },
      } as MainMethod<T, FunctionExpression>
    }
  }

  return undefined
}
