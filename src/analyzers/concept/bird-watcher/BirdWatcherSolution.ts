import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findFirst,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { PublicApi } from '~src/analyzers/PublicApi'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'

export const TOTAL_BIRD_COUNT = 'totalBirdCount'
export const BIRDS_IN_WEEK = 'birdsInWeek'
export const FIX_BIRD_COUNT_LOG = 'fixBirdCountLog'

class TotalBirdCount extends PublicApi {
  constructor(implementation: ExtractedFunction) {
    super(implementation)
  }

  public get hasFor(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.ForStatement =>
          [AST_NODE_TYPES.ForStatement].some((type) => type === node.type)
      ) !== undefined
    )
  }

  public get usesShorthandAssignment(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.AssignmentExpression =>
          [AST_NODE_TYPES.AssignmentExpression].some(
            (type) => type === node.type
          )
      )?.operator === '+='
    )
  }
}

class BirdsInWeek extends PublicApi {
  constructor(implementation: ExtractedFunction) {
    super(implementation)
  }
  public get hasFor(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.ForStatement =>
          [AST_NODE_TYPES.ForStatement].some((type) => type === node.type)
      ) !== undefined
    )
  }
}

class FixBirdCountLog extends PublicApi {
  constructor(implementation: ExtractedFunction) {
    super(implementation)
  }

  public get hasFor(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.ForStatement =>
          [AST_NODE_TYPES.ForStatement].some((type) => type === node.type)
      ) !== undefined
    )
  }

  public get usesIncrementalCounter(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.ForStatement =>
          [AST_NODE_TYPES.ForStatement].some((type) => type === node.type)
      )?.body?.body[0].expression.operator === '++'
    )
  }

  public get usesShorthandAssignment(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is TSESTree.AssignmentExpression =>
          [AST_NODE_TYPES.AssignmentExpression].some(
            (type) => type === node.type
          )
      )?.operator === '+='
    )
  }
}

export class BirdWatcherSolution {
  private readonly source: Source

  public readonly totalBirdCount: TotalBirdCount
  public readonly birdsInWeek: BirdsInWeek
  public readonly fixBirdCountLog: FixBirdCountLog

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.totalBirdCount = new TotalBirdCount(
      assertPublicApi(TOTAL_BIRD_COUNT, exports, functions)
    )
    this.birdsInWeek = new BirdsInWeek(
      assertPublicApi(BIRDS_IN_WEEK, exports, functions)
    )
    this.fixBirdCountLog = new FixBirdCountLog(
      assertPublicApi(FIX_BIRD_COUNT_LOG, exports, functions)
    )
  }

  public readExemplar(directory: string): void {
    const configPath = path.join(directory, '.meta', 'config.json')
    const config = JSON.parse(readFileSync(configPath).toString())

    const exemplarPath = path.join(directory, config.files.exemplar[0])
    this.exemplar = new Source(readFileSync(exemplarPath).toString())
  }

  public get isExemplar(): boolean {
    const sourceAst = AstParser.REPRESENTER.parseSync(this.source.toString())
    const exemplarAst = AstParser.REPRESENTER.parseSync(
      this.exemplar.toString()
    )

    return (
      JSON.stringify(sourceAst[0].program) ===
      JSON.stringify(exemplarAst[0].program)
    )
  }
}
