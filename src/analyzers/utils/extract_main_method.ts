import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree"

import { traverse, Traverser as importedTraverser } from 'eslint/lib/util/traverser'
import { isIdentifier } from "./is_identifier";

type Program = TSESTree.Program
type Node = TSESTree.Node

type ArrowFunctionExpression = TSESTree.ArrowFunctionExpression
type FunctionDeclaration = TSESTree.FunctionDeclaration
type FunctionExpression = TSESTree.FunctionExpression
type Identifier = TSESTree.Identifier
type ObjectExpression = TSESTree.ObjectExpression
type Property = TSESTree.Property

export type Traverser = importedTraverser
export type MainMethod<T extends string = string> =
  { id: Identifier & { name: T }, parent: undefined | Node } &
  (
    FunctionDeclaration
    | ArrowFunctionExpression
    | FunctionExpression
  )

export function extractMainMethod<T extends string = string>(program: Program, name: T): MainMethod<T> | undefined {
  let result: MainMethod | undefined = undefined

  traverse(program, {
    enter(node: Node) {
      switch (node.type) {

        // function name() {}
        case AST_NODE_TYPES.FunctionDeclaration:
          const { id } = node
          if (id && isIdentifier(id, name)) {
            result = Object.assign(node, { id, parent: undefined })
            this.break()
          }
          break;

        case AST_NODE_TYPES.VariableDeclaration:
          this.skip()

          traverse(node, {
            enter(innerNode: Node) {
              switch(innerNode.type) {

                case AST_NODE_TYPES.VariableDeclarator:
                  const { id } = innerNode
                  if (isIdentifier(id, name) && innerNode.init) {

                    // const name = () => {}
                    if (innerNode.init.type === AST_NODE_TYPES.ArrowFunctionExpression) {
                      result = Object.assign(innerNode.init, { id, parent: node })
                      this.break()
                    }

                    // const name = function() {}
                    else if (innerNode.init.type === AST_NODE_TYPES.FunctionExpression) {
                      result = Object.assign(innerNode.init, { id, parent: node })
                      this.break()
                    }
                  }
              }
            }
          })

          if (result) {
            this.break()
          }
          break;

          // class Foo {
          //   name() {}
          // }
          case AST_NODE_TYPES.MethodDefinition:
            this.skip()

            const { key: methodKey } = node
            if (isIdentifier(methodKey, name)) {
              switch(node.value.type) {
                case AST_NODE_TYPES.FunctionExpression:
                  result = Object.assign(node.value, { id: methodKey, parent: node })
                  this.break()
                  break;
              }
            }

          // class Foo {
          //   static name = () => {}
          //   static name = name() {}
          //   static name = function name() {}
          // }
          case AST_NODE_TYPES.ClassProperty:
            this.skip()

            const { key: propertyKey } = node
            if (isIdentifier(propertyKey, name) && node.static) {
              switch(node.value.type) {
                case AST_NODE_TYPES.ArrowFunctionExpression:
                case AST_NODE_TYPES.FunctionExpression:
                  result = Object.assign(node.value, { id: propertyKey, parent: node })
                  this.break()
                  break;
              }
            }
            break;

          // export default {
          //   name: () => {}
          // }
          case AST_NODE_TYPES.ExportDefaultDeclaration:
            // This was necessary because type incorrectly did not include this
            if (node.declaration.type as string === AST_NODE_TYPES.ObjectExpression) {
              this.skip()

              const objectNode = node.declaration as unknown as ObjectExpression
              const property = objectNode.properties.find(
                property =>
                   property.type === AST_NODE_TYPES.Property
                && isIdentifier(property.key, name)
              ) as Property & { key: { name: T }} | undefined

              if (property) {
                if (
                     property.value.type === AST_NODE_TYPES.ArrowFunctionExpression
                  || property.value.type === AST_NODE_TYPES.FunctionExpression
                ) {
                  result = Object.assign(property.value, { id: property.key, parent: property })
                  this.break()
                }
              }
            }
      }

    },
  })

  return result
}
