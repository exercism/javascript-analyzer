import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'

type Parameter = TSESTree.Parameter
type ObjectLiteralElementLike = TSESTree.ObjectLiteralElementLike
type Expression = TSESTree.Expression
type PropertyName = TSESTree.PropertyName
type VariableDeclarator = TSESTree.VariableDeclarator
type DestructuringPattern = TSESTree.DestructuringPattern

export function parameterName(
  parameter: Parameter | VariableDeclarator,
  fallback = '<unknown>'
): string {
  switch (parameter.type) {
    case AST_NODE_TYPES.VariableDeclarator: {
      return parameterName(parameter.id)
    }

    // [arg]?: type
    case AST_NODE_TYPES.ArrayPattern: {
      return `[${parameter.elements
        .map((element): string =>
          element ? expressionName(element, fallback) : fallback
        )
        .join(', ')}]`
    }

    // (...)?: type = expression
    case AST_NODE_TYPES.AssignmentPattern: {
      return parameterName(parameter.left)
    }

    // arg?: type
    case AST_NODE_TYPES.Identifier: {
      return parameter.name
    }

    // { arg }?: type
    case AST_NODE_TYPES.ObjectPattern: {
      return `{${parameter.properties
        .map((element): string => {
          if (element.type === AST_NODE_TYPES.RestElement) {
            switch (element.argument.type) {
              case AST_NODE_TYPES.ArrayPattern:
              case AST_NODE_TYPES.Identifier:
              case AST_NODE_TYPES.ObjectPattern:
                return parameterName(element.argument)
            }
          }

          return fallback
        })
        .join(', ')}`
    }
    // ...arg?: type
    case AST_NODE_TYPES.RestElement: {
      switch (parameter.argument.type) {
        case AST_NODE_TYPES.ArrayPattern:
        case AST_NODE_TYPES.Identifier:
        case AST_NODE_TYPES.ObjectPattern:
          return parameterName(parameter.argument)
      }

      return fallback
    }

    // public (...)?
    case AST_NODE_TYPES.TSParameterProperty: {
      return parameterName(parameter.parameter)
    }

    default: {
      return parameter
    }
  }
}

function objectLiteralElementName(
  element: ObjectLiteralElementLike,
  fallback = '<unknown>'
): string {
  switch (element.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      return fallback

    case AST_NODE_TYPES.Property:
      return properyNameName(element.key, fallback)

    // Don't support nested names for now
    // case AST_NODE_TYPES.RestElement:
    case AST_NODE_TYPES.SpreadElement:
      return fallback

    default:
      return element
  }
}

function properyNameName(key: PropertyName, fallback = '<unknown>'): string {
  switch (key.type) {
    case AST_NODE_TYPES.Identifier:
      return key.name
    case AST_NODE_TYPES.Literal:
      return key.raw
    case AST_NODE_TYPES.ArrayPattern:
    case AST_NODE_TYPES.ObjectPattern:
    case AST_NODE_TYPES.RestElement:
    case AST_NODE_TYPES.SpreadElement:
      return fallback
    case AST_NODE_TYPES.MemberExpression:
      return properyNameName(key.property, fallback)
    case AST_NODE_TYPES.ArrowFunctionExpression:
    case AST_NODE_TYPES.AssignmentExpression:
    case AST_NODE_TYPES.BinaryExpression:
      return fallback

    default:
      return fallback
  }
}

function expressionName(
  element: Expression | DestructuringPattern,
  fallback = '<unknown>'
): string {
  switch (element.type) {
    case AST_NODE_TYPES.ArrayPattern:
    case AST_NODE_TYPES.ObjectPattern:
    case AST_NODE_TYPES.Identifier:
      // Disabled this rule here because we _want_ the fall-through
      // eslint-disable-next-line no-case-declarations
      const result = parameterName(element, fallback)
      return Array.isArray(result) ? result[0] : result

    // Don't know how to get the name
    default:
      return fallback
  }
}
