import { Node, CallExpression, Identifier } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isMemberExpression, SpecificObject, SpecificProperty } from "./is_member_expression";
import { isIdentifier } from "./is_identifier";

type SpecificFunctionCall<C> = CallExpression & { callee: Identifier & { name: C }}
type SpecificObjectCall<O> = CallExpression & { callee: SpecificObject<O> }
type SpecificPropertyCall<P> = CallExpression & { callee: SpecificProperty<P> }
type SpecificObjectPropertyCall<O, P> = SpecificObjectCall<O> & SpecificPropertyCall<P>

// Object.property

export function isCallExpression<O extends string, C extends string>(node: Node, callee: C): node is SpecificFunctionCall<C>
export function isCallExpression<O extends string, P extends string>(node: Node, object: O, property: P): node is SpecificObjectPropertyCall<O, P>
export function isCallExpression<O extends string>(node: Node, object: O, property?: undefined): node is SpecificObjectCall<O>
export function isCallExpression<P extends string>(node: Node, object: undefined, property: P): node is SpecificPropertyCall<P>
export function isCallExpression<O extends string | undefined, P extends string | undefined, C extends string | undefined>(node: Node, object?: O | C, property?: P): node is CallExpression {
  if (node.type !== AST_NODE_TYPES.CallExpression) {
    return false
  }

  if (typeof object === 'string' && !property) {
    if (isIdentifier(node.callee, object)) {
      return true
    }
  }

  return node.type === AST_NODE_TYPES.CallExpression
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    && isMemberExpression<any, any>(node.callee, object, property)
}
