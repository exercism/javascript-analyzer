import { extractSource } from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'

type NodeWithLocation = TSESTree.Node & {
  range?: TSESTree.Range
  loc?: TSESTree.SourceLocation
}

interface Source {
  get(node: NodeWithLocation): string
}

class SourceImpl implements Source {
  constructor(private readonly source: string) {}

  public getLines(from: number, to: number | undefined = undefined): string[] {
    return this.source.split('\n').slice(from, to)
  }

  public get(node: NodeWithLocation): string {
    return extractSource(this.source, node)
  }

  public getOuter(node: NodeWithLocation): string {
    switch (node.type) {
      case AST_NODE_TYPES.ArrowFunctionExpression: {
        return this.get(node).replace(this.get(node.body), '...')
      }
      case AST_NODE_TYPES.FunctionDeclaration: {
        return this.get(node).replace(
          (node.body && this.get(node.body)) || '...',
          '...'
        )
      }
      case AST_NODE_TYPES.FunctionExpression: {
        return this.get(node).replace(
          (node.body && this.get(node.body)) || '...',
          '...'
        )
      }
      case AST_NODE_TYPES.VariableDeclaration: {
        const first = node.declarations[0].init
        return this.get(node).replace(
          (first && this.get(first)) || '...',
          (first && this.getOuter(first)) || '...'
        )
      }
      default: {
        return this.get(node)
      }
    }
  }

  public toString(): string {
    return this.source
  }
}

export { SourceImpl as Source }
