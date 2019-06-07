import { Node, ReturnStatement } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

type ReturnStatementWithValue = ReturnStatement & { argument: NonNullable<ReturnStatement['argument']> }

/**
 * Checks if the node is `return ...` and not `return;`
 */
export function isReturnStatementWithValue(node: Node): node is ReturnStatementWithValue {
  return node.type === AST_NODE_TYPES.ReturnStatement
    && node.argument !== null
}
