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
    this.lines = source.split(/\r?\n/)
  }

  public getLines(node: NodeWithLocation): string[] {
    const startLineLoc = Math.max(0, node.loc.start.line - 1)
    const start = this.lines[startLineLoc]
    const endLineLoc = Math.min(this.lines.length - 1, node.loc.end.line - 1)

    if (startLineLoc === endLineLoc) {
      return [start.substring(node.loc.start.column, node.loc.end.column)]
    }

    const end = this.lines[endLineLoc]

    return [
      start.substring(node.loc.start.column),
      ...(
        startLineLoc + 1 <= endLineLoc - 1
          ? this.lines.slice(startLineLoc + 1, endLineLoc - 1)
          : []
      ),
      end.substring(0, node.loc.end.column < 0 ? undefined : node.loc.end.column)
    ]
  }

  public get(node: NodeWithLocation): string {
    return this.getLines(node).join("\n")
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
