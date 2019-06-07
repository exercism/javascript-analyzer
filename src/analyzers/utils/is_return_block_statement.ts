import { Node, ReturnStatement, BlockStatement } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

type BlockWithReturnStatement = BlockStatement & { body: [ReturnStatement] }

export function isReturnBlockStatement(node: Node): node is BlockWithReturnStatement {
  return node.type === AST_NODE_TYPES.BlockStatement
    && node.body.length === 1
    && node.body[0].type === AST_NODE_TYPES.ReturnStatement
}
