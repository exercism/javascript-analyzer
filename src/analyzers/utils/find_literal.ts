import { Node, Literal } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { findFirst } from "./find_first"
import { isLiteral } from "./is_literal"

export function findLiteral(root: Node, value: string | number | boolean | RegExp | null): Literal | undefined {
  const isLiteralValue = (node: Node): boolean => isLiteral(node, value)
  return findFirst(root, isLiteralValue) as Literal | undefined
}
