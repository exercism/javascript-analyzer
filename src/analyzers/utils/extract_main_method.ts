import { Program, Node, FunctionDeclaration, ArrowFunctionExpression, FunctionExpression, ObjectExpression, Property } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import traverser from 'eslint/lib/util/traverser'

export type Traverser = traverser.Traverser
export type MainMethod = FunctionDeclaration | ArrowFunctionExpression | FunctionExpression

export function extractMainMethod(program: Program, name: string): MainMethod | undefined {
  let result: MainMethod | undefined = undefined

  traverser.traverse(program, {
    enter(node: Node): void {
      switch (node.type) {

        // function name() {}
        case AST_NODE_TYPES.FunctionDeclaration: {
          if (node.id && node.id.name === name) {
            result = node
            this.break()
          }
          break;
        }

        case AST_NODE_TYPES.VariableDeclaration: {
          this.skip()

          traverser.traverse(node, {
            enter(innerNode: Node): void {
              switch(innerNode.type) {

                case AST_NODE_TYPES.VariableDeclarator: {
                  if (innerNode.id.type === AST_NODE_TYPES.Identifier) {
                    if (
                      innerNode.id.name === name
                      && innerNode.init
                    ) {
                      // const name = () => {}
                      if (innerNode.init.type === AST_NODE_TYPES.ArrowFunctionExpression) {
                        result = innerNode.init
                        this.break()
                      }
                      // const name = function() {}
                      else if (innerNode.init.type === AST_NODE_TYPES.FunctionExpression) {
                        result = innerNode.init
                        this.break()
                      }
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
          if (
            node.static
            && node.key.type === AST_NODE_TYPES.Identifier
            && node.key.name === name
          ) {
            switch(node.value.type) {
              case AST_NODE_TYPES.FunctionExpression:
                result = node.value
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
                result = node.value
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
          // This was necessary because type incorrectly did not include this
          if (node.declaration.type as string === AST_NODE_TYPES.ObjectExpression) {
            this.skip()

            const objectNode = node.declaration as unknown as ObjectExpression
            const property = objectNode.properties.find(
              (property): boolean =>
                property.type === AST_NODE_TYPES.Property
              && property.key.type === AST_NODE_TYPES.Identifier
              && property.key.name === name
            ) as Property | undefined

            if (property) {
              if (
                property.value.type === AST_NODE_TYPES.ArrowFunctionExpression
                || property.value.type === AST_NODE_TYPES.FunctionExpression
              ) {
                result = property.value
                this.break()
              }
            }
          }
        }
      }

    },
  })

  return result
}
