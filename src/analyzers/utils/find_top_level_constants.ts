import { findAll } from "./find_all";
import { Traverser } from "eslint/lib/util/traverser";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import { isVariableDeclarationOfKind } from "./is_variable_declaration_of_kind";

type Node = TSESTree.Node
type VariableDeclaration = TSESTree.VariableDeclaration
type VariableDeclarator = TSESTree.VariableDeclarator
export type ProgramConstant = VariableDeclarator & { kind: VariableDeclaration['kind'] }
export type ProgramConstants = ProgramConstant[]

const CONSTANT_MODIFIERS = [
  AST_NODE_TYPES.ExportNamedDeclaration
]

function isTopLevelConstant(this: Traverser, node: Node, kinds: readonly VariableDeclaration["kind"][] = ['const']): boolean {
  if (isVariableDeclarationOfKind(node, kinds as ['let', 'const', 'var'])) {
    return true
  }

  if (!CONSTANT_MODIFIERS.indexOf(node.type)) {
    this.skip() // doesn't traverse this node any further
  }

  return false
}

/**
 * Finds all constants declared at the top-level of the scope of the node given.
 *
 * @param root the top-level
 * @returns Node[]
 */
export function findTopLevelConstants(root: Node, kinds: readonly VariableDeclaration["kind"][] = ['const']): ProgramConstants {
  const constants = findAll(
    root,
    function(node): boolean { return isTopLevelConstant.apply(this, [node, kinds]) }
  ) as VariableDeclaration[]

  return constants.reduce(
    (declarations, declaration): ProgramConstants => declarations.concat(
      declaration.declarations.map((d): ProgramConstant => ({ ...d, kind: declaration.kind }))
    ),
    [] as ProgramConstants
  )
}
