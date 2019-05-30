
declare module "eslint/lib/util/traverser" {
  import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"

  interface Traverser {
    skip(): void
    break(): void
  }

  interface TraverserOptions {
    enter?(this: Traverser, node: Node): void
    exit?(this: Traverser, node: Node): void
  }

  type Module = {

  }

  export function traverse(root: Node, options: TraverserOptions): void
}
