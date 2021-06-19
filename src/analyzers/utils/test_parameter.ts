import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'

type Parameter = TSESTree.Parameter

export function isOptional(parameter: Parameter): boolean {
  switch (parameter.type) {
    case AST_NODE_TYPES.ArrayPattern: // [arg]?: type
    case AST_NODE_TYPES.Identifier: // arg?: type
    case AST_NODE_TYPES.ObjectPattern: // { arg }?: type
    case AST_NODE_TYPES.RestElement: // ...arg?: type
      return parameter.optional ?? false

    // (...)?: type = expression
    case AST_NODE_TYPES.AssignmentPattern: {
      return true
    }

    // public (...)?
    case AST_NODE_TYPES.TSParameterProperty: {
      return isOptional(parameter.parameter)
    }
  }

  return false
}

export function isRequired(parameter: Parameter): boolean {
  return !isOptional(parameter)
}
