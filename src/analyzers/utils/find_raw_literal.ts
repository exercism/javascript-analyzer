import { Node, Literal } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { findFirst } from "./find_first"
import { isLiteral } from "./is_literal"

export function findRawLiteral(root: Node, raw: string): Literal | undefined {
  const isLiteralValue = (node: Node): boolean => isLiteral(node) && node.raw === raw
  return findFirst(root, isLiteralValue) as Literal | undefined
}
