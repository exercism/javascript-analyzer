import { Parameter, ObjectLiteralElementLike, Expression, PropertyName } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

export function parameterName(parameter: Parameter, fallback: string = '<unknown>'): string {
  switch(parameter.type) {

    // [arg]?: type
    case AST_NODE_TYPES.ArrayPattern:
      return `[${parameter.elements.map(element => expressionName(element, fallback)).join(', ')}]`

    // arg?: type
    case AST_NODE_TYPES.Identifier:
      return parameter.name

    // { arg }?: type
    case AST_NODE_TYPES.ObjectPattern:
      return `{${parameter.properties.map(element => objectLiteralElementName(element, fallback)).join(', ')}`
    // ...arg?: type
    case AST_NODE_TYPES.RestElement:
      switch(parameter.argument.type) {
        case AST_NODE_TYPES.ArrayPattern:
        case AST_NODE_TYPES.Identifier:
        case AST_NODE_TYPES.ObjectPattern:
          return parameterName(parameter.argument)
      }

      return fallback

    // (...)?: type = expression
    case AST_NODE_TYPES.AssignmentPattern:
      return parameterName(parameter.left)

    // public (...)?
    case AST_NODE_TYPES.TSParameterProperty:
      return parameterName(parameter.parameter)

    default:
      return parameter
  }
}

function objectLiteralElementName(element: ObjectLiteralElementLike, fallback: string = '<unknown>'): string {
  switch(element.type) {
    case AST_NODE_TYPES.MethodDefinition:
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      return fallback

    case AST_NODE_TYPES.Property:
      return properyNameName(element.key, fallback)

    // Don't support nested names for now
    case AST_NODE_TYPES.RestElement:
    case AST_NODE_TYPES.SpreadElement:
      return fallback

    default:
      return element
  }
}

function properyNameName(key: PropertyName, fallback: string = '<unknown>'): string {
  switch (key.type) {
    case AST_NODE_TYPES.Identifier:
      return key.name
    case AST_NODE_TYPES.Literal:
      return key.raw

    default:
      return key
  }
}

function expressionName(element: Expression, fallback: string = '<unknown>'): string {
  switch(element.type) {
    case AST_NODE_TYPES.RestElement:
    case AST_NODE_TYPES.ArrayPattern:
    case AST_NODE_TYPES.ObjectPattern:
    case AST_NODE_TYPES.Identifier:
      const result = parameterName(element, fallback)
      return Array.isArray(result) ? result[0] : result

    // Don't know how to get the name
    default:
      return fallback
  }
}
