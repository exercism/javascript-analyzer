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

function isNewExpression(node: unknown): node is TSESTree.NewExpression {
  return (
    typeof node === 'object' &&
    node !== null &&
    (node as TSESTree.Node).type === 'NewExpression'
  )
}

function isStubThrowStatement(statement: TSESTree.Statement): boolean {
  if (statement.type !== 'ThrowStatement') return false

  const argument = statement.argument
  if (!isNewExpression(argument)) return false

  const callee = argument.callee
  if (callee.type !== 'Identifier' || callee.name !== 'Error') return false

  const [firstArg] = argument.arguments
  if (!firstArg || firstArg.type !== 'Literal') return false
  if (typeof firstArg.value !== 'string') return false

  return (
    firstArg.value.includes('Please implement') ||
    firstArg.value.includes('Remove this line and implement') ||
    firstArg.value.includes('Implement the') ||
    firstArg.value.includes('Remove this statement and implement')
  )
}

export function hasStubThrow(fn: { body?: TSESTree.Node }): boolean {
  if (!fn.body || fn.body.type !== 'BlockStatement') return false

  return fn.body.body.some(
    (statement) =>
      statement.type === 'ThrowStatement' && isStubThrowStatement(statement)
  )
}
