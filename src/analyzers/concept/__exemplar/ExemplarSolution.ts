import { AstParser } from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'node:fs'
import { Source } from '../../SourceImpl.js'
import { exemplarPath } from '~src/analyzers/utils/config.js'

export class ExemplarSolution {
  private readonly source: Source

  private exemplar!: Source

  constructor(
    public readonly program: TSESTree.Program,
    source: string
  ) {
    this.source = new Source(source)

    // const functions = extractFunctions(program)
    // const exports = extractExports(program)
  }

  public readExemplar(directory: string): void {
    this.exemplar = new Source(readFileSync(exemplarPath(directory)).toString())
  }

  public get isExemplar(): boolean {
    const sourceAst = AstParser.REPRESENTER.parseSync(this.source.toString())
    const exemplarAst = AstParser.REPRESENTER.parseSync(
      this.exemplar.toString()
    )

    // TODO: ignore order of exports, if possible/hoisted

    return (
      JSON.stringify(sourceAst[0].program) ===
      JSON.stringify(exemplarAst[0].program)
    )
  }
}
