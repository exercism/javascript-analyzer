import { MainMethod } from "./extract_main_method";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

type BlockStatement = TSESTree.BlockStatement
export type MainBody = MainBodyWithBlock | MainBodyWithSimpleReturn
type MainBodyWithBlock = TSESTree.BlockStatement
type MainBodyWithSimpleReturn = TSESTree.ReturnStatement

export function extractMainBody(mainMethod: MainMethod): MainBody {
  switch(mainMethod.type) {
    case AST_NODE_TYPES.FunctionDeclaration: {
      return extractBodyFromBlock(mainMethod.body)
    }

    case AST_NODE_TYPES.ArrowFunctionExpression: {
      if (mainMethod.body.type === AST_NODE_TYPES.BlockStatement) {
        return extractBodyFromBlock(mainMethod.body)
      }

      // Implicit return
      const result: MainBodyWithSimpleReturn = {
        type: AST_NODE_TYPES.ReturnStatement,
        argument: mainMethod.body,
        loc: mainMethod.body.loc,
        range: mainMethod.body.range
      }

      return result
    }

    case AST_NODE_TYPES.FunctionExpression: {
      return extractBodyFromBlock(mainMethod.body)
    }
  }
}

function extractBodyFromBlock(block: BlockStatement | null | undefined): MainBody {
  if (block) {
    // A single return statement
    if (block.body.length === 1 && block.body[0].type === AST_NODE_TYPES.ReturnStatement) {
      return block.body[0] as MainBodyWithSimpleReturn
    }

    return block
  }

  // no block, simulate empty one
  const result: MainBodyWithBlock = {
    type: AST_NODE_TYPES.BlockStatement,
    body: [],
    loc: { start: { line: -1, column: -1 }, end: { line: -1, column: -1 } },
    range: [0, 0]
  }

  return result
}
