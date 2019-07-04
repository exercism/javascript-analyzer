import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree"

import { traverse, Traverser as importedTraverser } from 'eslint/lib/util/traverser'
import { isIdentifier } from "./is_identifier";

type Program = TSESTree.Program
type Node = TSESTree.Node

type ArrowFunctionExpression = TSESTree.ArrowFunctionExpression
type FunctionDeclaration = TSESTree.FunctionDeclaration
type FunctionExpression = TSESTree.FunctionExpression
type Identifier = TSESTree.Identifier

export type Traverser = importedTraverser
export type MainMethod<T extends string = string> =
  {
    id: Identifier & { name: T };
    parent: undefined | Node;
  } &
  (
    FunctionDeclaration
    | ArrowFunctionExpression
    | FunctionExpression
  )

export function extractMainMethod<T extends string = string>(program: Program, name: T): MainMethod<T> | undefined {
  let result: MainMethod | undefined = undefined

  traverse(program, {
    enter(node: Node): void {
      switch (node.type) {

        // function name() {}
        case AST_NODE_TYPES.FunctionDeclaration: {
          const { id } = node
          if (id && isIdentifier(id, name)) {
            result = Object.assign(node, { id, parent: undefined })
            this.break()
          }
          break;
        }

        case AST_NODE_TYPES.VariableDeclaration: {
          this.skip()

          traverse(node, {
            enter(innerNode: Node): void {
              switch(innerNode.type) {

                case AST_NODE_TYPES.VariableDeclarator: {
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
                  break
                }
              }
            }
          })

          if (result) {
            this.break()
          }
          break;
        }

        // class Foo {
        //   name() {}
        // }
        case AST_NODE_TYPES.MethodDefinition: {
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
          break;
        }

        // class Foo {
        //   static name = () => {}
        //   static name = name() {}
        //   static name = function name() {}
        // }
        case AST_NODE_TYPES.ClassProperty: {
          this.skip()

          if (
            node.static
            && node.key.type === AST_NODE_TYPES.Identifier
            && node.key.name === name
          ) {
            switch(node.value.type) {
              case AST_NODE_TYPES.ArrowFunctionExpression:
              case AST_NODE_TYPES.FunctionExpression:
                result =  Object.assign(node.value, { id: node.key, parent: node })
                this.break()
                break;
            }
          }
          break;
        }

        // export default {
        //   name: () => {}
        // }
        case AST_NODE_TYPES.ExportDefaultDeclaration: {
          const declaration = node.declaration
          // This was necessary because type incorrectly did not include this
          if (declaration.type === AST_NODE_TYPES.ObjectExpression) {
            this.skip()

            for (const property of declaration.properties) {
              switch(property.type) {
                case AST_NODE_TYPES.Property: {
                  const { key: propertyKey } = property
                  if (isIdentifier(propertyKey, name)) {
                    switch(property.value.type) {
                      case AST_NODE_TYPES.ArrowFunctionExpression:
                      case AST_NODE_TYPES.FunctionExpression:
                        result = Object.assign(property.value, { id: propertyKey, parent: property })
                        this.break()
                        break;
                    }
                  }
                  break;
                }
              }
            }
          }
          break;
        }
      }
    },
  })

  return result
}
