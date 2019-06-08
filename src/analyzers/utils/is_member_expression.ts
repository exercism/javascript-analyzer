import { Node, MemberExpression, Identifier, Literal } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { isIdentifier } from "./is_identifier";
import { isLiteral } from "./is_literal";

export type SpecificObject<O> = MemberExpression & { object: Identifier & { name: O } }
export type SpecificProperty<P> = MemberExpression & { property: (Identifier & { name: P }) | (Literal & { value: P }) }
export type SpecificObjectProperty<O, P> = SpecificObject<O> & SpecificProperty<P>

export function isMemberExpression<O extends string, P extends string>(node: Node, object: O, property: P): node is SpecificObjectProperty<O, P>
export function isMemberExpression<O extends string>(node: Node, object: O, property?: undefined): node is SpecificObject<O>
export function isMemberExpression<P extends string>(node: Node, object: undefined, property: P): node is SpecificProperty<P>
export function isMemberExpression<O extends string | undefined, P extends string | undefined>(node: Node, object?: O, property?: P): node is MemberExpression {
  return node.type === AST_NODE_TYPES.MemberExpression
    && (object === undefined || isIdentifier(node.object, object))
    && (property === undefined || isIdentifier(node.property, property) || isLiteral(node.property, property))
}
