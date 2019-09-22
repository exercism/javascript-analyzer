
declare module "eslint/lib/shared/traverser" {
  import { Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"

  interface Traverser {
    skip(): void;
    break(): void;
  }

  interface TraverserOptions {
    enter?(this: Traverser, node: Node): void;
    exit?(this: Traverser, node: Node): void;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Module {

  }

  export function traverse(root: Node, options: TraverserOptions): void
}
