import { Program, Node, ExportDefaultDeclaration, ExportNamedDeclaration, ClassDeclaration, VariableDeclaration, ExportDeclaration, ExportSpecifier } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import traverser from 'eslint/lib/util/traverser'

type ExportDeclarationNode = ExportDefaultDeclaration | ExportNamedDeclaration | undefined
type ExportedNode = ClassDeclaration | VariableDeclaration | ExportDeclaration | ExportSpecifier | undefined

export function extractExport(program: Program): [ExportDefaultDeclaration | undefined, ExportedNode]
export function extractExport(program: Program, name: string): [ExportNamedDeclaration | undefined, ExportedNode]
export function extractExport(program: Program, ...args: string[]): [ExportDeclarationNode, ExportedNode] {
  const [name] = args

  let exportDeclaration: ExportDefaultDeclaration | ExportNamedDeclaration | undefined = undefined
  let exportedNode: ExportedNode | undefined = undefined

  let type = name ? AST_NODE_TYPES.ExportNamedDeclaration : AST_NODE_TYPES.ExportDefaultDeclaration

  traverser.traverse(program, {
    enter(node: Node) {
      // export statements must be top-level
      if (node.type !== AST_NODE_TYPES.Program) {
        this.skip()
      }

      switch (node.type) {
        case AST_NODE_TYPES.ExportDefaultDeclaration:

          // export default ...
          if (type === node.type) {
            exportDeclaration = node
            this.break()
          }
          break;

        case AST_NODE_TYPES.ExportNamedDeclaration:
          if (type === node.type) {

            // export { name }
            if (node.declaration === null) {
              const specifier = node
                .specifiers
                .filter(specifier => specifier.type === AST_NODE_TYPES.ExportSpecifier)
                .find(specifier => specifier.local.name === name)

              if (specifier !== undefined) {
                exportDeclaration = node
                exportedNode = specifier
                this.break()
              }
            } else {
              switch(node.declaration.type) {

                // export class Name
                case AST_NODE_TYPES.ClassDeclaration:
                  if (node.declaration.id && node.declaration.id.name === name) {
                    exportDeclaration = node
                    exportedNode = node.declaration
                    this.break()
                  }
                  break;

                // export const name
                // export let name
                // export var name
                case AST_NODE_TYPES.VariableDeclaration:
                  const declaration = node
                    .declaration
                    .declarations
                    .find(d => d.id.type === AST_NODE_TYPES.Identifier && d.id.name === name)

                  if (declaration) {
                    exportDeclaration = node
                    exportedNode = node.declaration
                  }
                  break;
              }
            }
          }
      }
    }
  })

  return [exportDeclaration, exportedNode]
}
