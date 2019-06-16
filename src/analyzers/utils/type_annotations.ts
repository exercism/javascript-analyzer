import { TSTypeAnnotation, TypeNode, Parameter, EntityName } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { parameterName } from "./extract_parameter";

export function parameterType(parameter: Parameter, fallback: string = 'any'): string {
  switch(parameter.type) {

    case AST_NODE_TYPES.ArrayPattern:       // [arg]?: type
    case AST_NODE_TYPES.Identifier:         // arg?: type
    case AST_NODE_TYPES.ObjectPattern:      // { arg }?: type
    case AST_NODE_TYPES.RestElement:        // ...arg?: type
      return parameter.typeAnnotation && annotateType(parameter.typeAnnotation, fallback) || fallback

    // (...)?: type = expression
    case AST_NODE_TYPES.AssignmentPattern: {
      return parameter.left.typeAnnotation && annotateType(parameter.left.typeAnnotation, fallback) || fallback
    }

    // public (...)?
    case AST_NODE_TYPES.TSParameterProperty: {
      return parameterType(parameter.parameter, fallback)
    }

    default: {
      return parameter
    }
  }
}

export function annotateType(typeAnnotation?: TSTypeAnnotation, fallback: string = 'any'): string {
  if (typeAnnotation === undefined) {
    return fallback
  }

  return annotate(typeAnnotation.typeAnnotation, fallback)
}

export function annotateEntityName(entityName: EntityName): string {
  switch(entityName.type) {
    case AST_NODE_TYPES.Identifier: {
      return entityName.name
    }

    case AST_NODE_TYPES.TSQualifiedName: {
      return `${annotateEntityName(entityName.left)}.${annotateEntityName(entityName.right)}`
    }

    default: {
      return entityName
    }
  }
}

function annotate(typeNode?: TypeNode, fallback: string = 'any'): string {
  if (typeNode === undefined) {
    return fallback
  }

  switch(typeNode.type) {
    case AST_NODE_TYPES.ThisExpression: {
      return 'this'
    }
    case AST_NODE_TYPES.TSAnyKeyword: {
      return 'any'
    }
    case AST_NODE_TYPES.TSArrayType: {
      return `Array<${typeNode.elementType}>`
    }
    case AST_NODE_TYPES.TSBigIntKeyword: {
      return 'bigint'
    }
    case AST_NODE_TYPES.TSBooleanKeyword: {
      return 'boolean'
    }
    case AST_NODE_TYPES.TSConditionalType: {
      const ctC = annotate(typeNode.checkType, fallback)
      const ctE = annotate(typeNode.extendsType, fallback)
      const ctT = annotate(typeNode.trueType, fallback)
      const ctF = annotate(typeNode.falseType, fallback)
      return `${ctC} extends ${ctE} ? ${ctT} : ${ctF}`
    }
    case AST_NODE_TYPES.TSConstructorType: {
      const ctP = typeNode.params.map((parameter): string => `${parameterName(parameter)}: ${parameterType(parameter, fallback)}`).join(', ')
      const ctR = annotateType(typeNode.returnType, fallback)
      return `new (${ctP}) => ${ctR}`
    }
    case AST_NODE_TYPES.TSClassImplements: {
      return '<...>' // TODO id + type parameters
    }
    case AST_NODE_TYPES.TSFunctionType: {
      const ftP = typeNode.params.map((parameter): string => `${parameterName(parameter)}: ${parameterType(parameter, fallback)}`).join(', ')
      const ftR = annotateType(typeNode.returnType, fallback)
      return `(${ftP}) => ${ftR}`
    }
    case AST_NODE_TYPES.TSIntersectionType: {
      return typeNode.types.map((innerTypeNode): string => annotate(innerTypeNode, fallback)).join(' & ')
    }
    case AST_NODE_TYPES.TSImportType: {
      return `${typeNode.isTypeOf ? 'typeof ' : ''} import(${typeNode.parameter})${typeNode.qualifier ? `.${annotateEntityName(typeNode.qualifier)}` : '' } <...>` // todo type parameters
    }
    case AST_NODE_TYPES.TSInferType: {
      return 'infer <...>' // TODO type parameter
    }
    case AST_NODE_TYPES.TSIndexedAccessType: {
      return `${annotate(typeNode.objectType, fallback)}[${annotate(typeNode.indexType, fallback)}]`
    }
    case AST_NODE_TYPES.TSInterfaceHeritage: {
      return typeNode.expression.type === AST_NODE_TYPES.Identifier && typeNode.expression.name
        || typeNode.expression.type === AST_NODE_TYPES.Literal && typeNode.expression.raw
        || '<...>' // TODO id + type parameters
    }
    case AST_NODE_TYPES.TSLiteralType: {
      return typeNode.literal.type === AST_NODE_TYPES.Literal && typeNode.literal.raw || fallback
    }
    case AST_NODE_TYPES.TSMappedType: {
      return `{ ${typeNode.readonly ? 'readonly ' : ''}...: ${annotate(typeNode.typeAnnotation, fallback)} }` // TODO parameters
    }
    case AST_NODE_TYPES.TSNullKeyword: {
      return 'null'
    }
    case AST_NODE_TYPES.TSNeverKeyword: {
      return 'never'
    }
    case AST_NODE_TYPES.TSNumberKeyword: {
      return 'number'
    }
    case AST_NODE_TYPES.TSObjectKeyword: {
      return 'object'
    }
    case AST_NODE_TYPES.TSOptionalType: {
      return `${annotate(typeNode.typeAnnotation, fallback)}?`
    }
    case AST_NODE_TYPES.TSParenthesizedType: {
      return `(${annotate(typeNode.typeAnnotation, fallback)})`
    }
    case AST_NODE_TYPES.TSRestType: {
      return `...${annotate(typeNode.typeAnnotation, fallback)}`
    }
    case AST_NODE_TYPES.TSStringKeyword: {
      return 'string'
    }
    case AST_NODE_TYPES.TSSymbolKeyword: {
      return "symbol"
    }
    case AST_NODE_TYPES.TSThisType: {
      return "this"
    }
    case AST_NODE_TYPES.TSTupleType: {
      return `[${typeNode.elementTypes.map((innerTypeNode): string => annotate(innerTypeNode, fallback)).join(', ')}]`
    }
    case AST_NODE_TYPES.TSTypeLiteral: {
      return '<...>' // TODO
    }
    case AST_NODE_TYPES.TSTypeOperator: {
      return `${typeNode.operator} ${annotateType(typeNode.typeAnnotation, fallback)}`
    }
    case AST_NODE_TYPES.TSTypePredicate: {
      return `${typeNode.parameterName} is ${annotateType(typeNode.typeAnnotation, fallback)}`
    }
    case AST_NODE_TYPES.TSTypeQuery: {
      return `typeof ${annotateEntityName(typeNode.exprName)}`
    }
    case AST_NODE_TYPES.TSTypeReference: {
      return `${typeNode.typeName}<...>` // TODO type parameters
    }
    case AST_NODE_TYPES.TSUndefinedKeyword: {
      return 'undefined'
    }
    case AST_NODE_TYPES.TSUnionType: {
      return typeNode.types.map((n): string => annotate(n)).join(' | ')
    }
    case AST_NODE_TYPES.TSUnknownKeyword: {
      return 'unknown'
    }
    case AST_NODE_TYPES.TSVoidKeyword: {
      return 'void'
    }
    default: {
      return typeNode
    }
  }
}
