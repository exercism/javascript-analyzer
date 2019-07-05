import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

type NodeWithLocation = TSESTree.Node & {
  range?: TSESTree.Range;
  loc?: TSESTree.SourceLocation;
}

interface Source {
  get(node: NodeWithLocation): string;
}

class SourceImpl implements Source {
  private readonly lines: string[]

  constructor(source: string) {
    this.lines = source.split("\n")
  }

  public get(node: NodeWithLocation): string {
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

  public getOuter(node: NodeWithLocation): string {
    switch (node.type) {
      case AST_NODE_TYPES.ArrowFunctionExpression: {
        return this.get(node).replace(this.get(node.body), '...')
      }
      case AST_NODE_TYPES.FunctionDeclaration: {
        return this.get(node).replace(node.body && this.get(node.body) || '...', '...')
      }
      case AST_NODE_TYPES.FunctionExpression: {
        return this.get(node).replace(node.body && this.get(node.body) || '...', '...')
      }
      case AST_NODE_TYPES.VariableDeclaration: {
        const first = node.declarations[0].init
        return this.get(node).replace(first && this.get(first) || '...', first && this.getOuter(first) || '...')
      }
      default: {
        return this.get(node)
      }
    }
  }
}

export { SourceImpl as Source }
