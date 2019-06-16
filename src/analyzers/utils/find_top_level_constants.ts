import { Node, VariableDeclaration } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { findAll } from "./find_all";
import { Traverser } from "eslint/lib/util/traverser";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

const CONSTANT_MODIFIERS = [
  AST_NODE_TYPES.ExportNamedDeclaration
]

function isTopLevelConstant(this: Traverser, node: Node, kinds: VariableDeclaration["kind"][] = ['const']): boolean {
  if (node.type !== AST_NODE_TYPES.VariableDeclaration || !kinds.includes(node.kind)) {
    if (!CONSTANT_MODIFIERS.indexOf(node.type)) {
      this.skip() // doesn't traverse this node any further
    }
    return false
  }

  return true
}

/**
 * Finds all constants declared at the top-level of the scope of the node given.
 *
 * @param root the top-level
 * @returns Node[]
 */
export function findTopLevelConstants(root: Node, kinds: VariableDeclaration["kind"][] = ['const']): VariableDeclaration[] {
  return findAll(
    root,
    function(node): boolean { return isTopLevelConstant.apply(this, [node, kinds]) }
  ) as VariableDeclaration[]
}
