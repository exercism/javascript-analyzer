import { Node, AssignmentPattern } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isIdentifier } from "./is_identifier";
import { isLiteral } from "./is_literal";

export function isAssignmentPattern(node: Node, value?: string): node is AssignmentPattern {
  return node.type === AST_NODE_TYPES.AssignmentPattern
    && (value === undefined
      || (node.right !== undefined
        && (
             isLiteral(node.right, value)
          || isIdentifier(node.right, value)
        )
      )
    )
}
