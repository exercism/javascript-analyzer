import { Program, Node, ExportDefaultDeclaration, ExportNamedDeclaration, ClassDeclaration, VariableDeclaration, ExportDeclaration, ExportSpecifier, AssignmentExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"
import { traverse } from 'eslint/lib/util/traverser'

export type ExportDeclarationNode = ExportDefaultDeclaration | ExportNamedDeclaration | AssignmentExpression | undefined
export type ExportedNode = ClassDeclaration | VariableDeclaration | ExportDeclaration | ExportSpecifier | undefined

export const extractDefaultExport = (program: Program): [ExportDefaultDeclaration | undefined, ExportedNode] => extractExport(program)

export function extractExport(program: Program): [ExportDefaultDeclaration | undefined, ExportedNode]
export function extractExport(program: Program, name: string): [ExportNamedDeclaration | undefined, ExportedNode]
export function extractExport(program: Program, ...args: string[]): [ExportDeclarationNode, ExportedNode] {
  const [name] = args

  let exportDeclaration: ExportDeclarationNode = undefined
  let exportedNode: ExportedNode = undefined

  let type = name ? AST_NODE_TYPES.ExportNamedDeclaration : AST_NODE_TYPES.ExportDefaultDeclaration

  traverse(program, {
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

                // export class Name
                case AST_NODE_TYPES.FunctionDeclaration:
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
          break;

        case AST_NODE_TYPES.ExpressionStatement:

          // module.exports = { ... }
          if (node.expression.type === AST_NODE_TYPES.AssignmentExpression) {
            this.skip()

            const { left, right } = node.expression

            if (left.type === AST_NODE_TYPES.MemberExpression) {
              const { object, property } = left

              if (object.type === AST_NODE_TYPES.Identifier && object.name === 'module') {
                if (property.type === AST_NODE_TYPES.Identifier && property.name === 'exports') {

                  switch (right.type) {
                    case AST_NODE_TYPES.ObjectExpression:
                      const exportProperty = right.properties.find(property =>
                            (property.type === AST_NODE_TYPES.Property)
                         && (property.key.type === AST_NODE_TYPES.Identifier)
                         && (property.key.name === (name || 'default'))
                      )
                      if (exportProperty) {
                        exportDeclaration = node.expression
                        this.break()
                      }
                      break;
                  }

                }
              }
            }
          }
      }
    }
  })

  return [exportDeclaration, exportedNode]
}
