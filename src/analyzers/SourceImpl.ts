import { TSESTree } from "@typescript-eslint/typescript-estree";

type NodeWithLocation = TSESTree.Node & {
  range?: TSESTree.Range;
  loc?: TSESTree.SourceLocation;
}

interface Source {
  get(node: NodeWithLocation): string
}

class SourceImpl implements Source {
  private readonly lines: ReadonlyArray<string>

  constructor(source: string) {
    this.lines = source.split("\n")
  }

  get(node: NodeWithLocation): string {
    const start = this.lines[node.loc.start.line - 1]
    const end = this.lines[node.loc.end.line - 1]
    if (start === end) {
      return start.substring(node.loc.start.column, node.loc.end.column)
    }

    return [
      start.substring(node.loc.start.column),
      ...this.lines.slice(node.loc.start.line, node.loc.end.line - 2),
      end.substring(0, node.loc.end.column)
    ].join("\n")
  }

}

export { SourceImpl as Source }
