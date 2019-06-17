import { Node, CallExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isMemberExpression, SpecificObject, SpecificProperty } from "./is_member_expression";

type SpecificObjectCall<O> = CallExpression & { callee: SpecificObject<O> }
type SpecificPropertyCall<P> = CallExpression & { callee: SpecificProperty<P> }
type SpecificObjectPropertyCall<O, P> = SpecificObjectCall<O> & SpecificPropertyCall<P>

export function isCallExpression<O extends string, P extends string>(node: Node, object: O, property: P): node is SpecificObjectPropertyCall<O, P>
export function isCallExpression<O extends string>(node: Node, object: O, property?: undefined): node is SpecificObjectCall<O>
export function isCallExpression<P extends string>(node: Node, object: undefined, property: P): node is SpecificPropertyCall<P>
export function isCallExpression<O extends string | undefined, P extends string | undefined>(node: Node, object?: O, property?: P): node is CallExpression {
  return node.type === AST_NODE_TYPES.CallExpression
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    && isMemberExpression<any, any>(node.callee, object, property)
}
