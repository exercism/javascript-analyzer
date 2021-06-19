import type {
  ExtractedFunction,
  IdentifierWithName,
  MetaConfiguration,
  ProgramConstant,
  SpecificFunctionCall,
} from '@exercism/static-analysis'
import {
  AstParser,
  extractExports,
  extractFunctions,
  findFirst,
  findRawLiteral,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  traverse,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { assertPublicApi } from '../../../asserts/assert_public_api'
import { assertPublicConstant } from '../../../asserts/assert_public_constant'
import { Source } from '../../SourceImpl'
import { parameterName } from '../../utils/extract_parameter'

export const REMAINING_MINUTES_IN_OVEN = 'remainingMinutesInOven'
export const PREPARATION_TIME_IN_MINUTES = 'preparationTimeInMinutes'
export const TOTAL_TIME_IN_MINUTES = 'totalTimeInMinutes'
export const EXPECTED_MINUTES_IN_OVEN = 'EXPECTED_MINUTES_IN_OVEN'

class RemainingMinutesInOven {
  public readonly parameter: string

  constructor(private readonly implementation: ExtractedFunction) {
    this.parameter = parameterName(implementation.params[0])
  }

  public traverse(options: Parameters<typeof traverse>[1]): void {
    traverse(this.implementation.body, options)
  }

  public get isOptimal(): boolean {
    const parameter = this.parameter

    let foundSuboptimalNode = false
    this.traverse({
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BinaryExpression](node) {
        foundSuboptimalNode =
          node.operator !== '-' ||
          !(
            guardIdentifier(node.left, EXPECTED_MINUTES_IN_OVEN) &&
            guardIdentifier(node.right, parameter)
          )
        this.skip()
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }

  public get hasReplacableLiteral(): boolean {
    const hasConstantLiteral = findFirst(
      this.implementation.body,
      (node): node is IdentifierWithName<typeof EXPECTED_MINUTES_IN_OVEN> =>
        guardIdentifier(node, EXPECTED_MINUTES_IN_OVEN)
    )
    const hasLiteral = findRawLiteral(this.implementation.body, '40')
    return Boolean(hasLiteral && !hasConstantLiteral)
  }
}

class TotalTimeInMinutes {
  public readonly numberOfLayers: string
  public readonly actualMinutesInOven: string

  constructor(private readonly implementation: ExtractedFunction) {
    this.numberOfLayers = parameterName(this.implementation.params[0])
    this.actualMinutesInOven = parameterName(this.implementation.params[1])
  }

  public traverse(options: Parameters<typeof traverse>[1]): void {
    traverse(this.implementation.body, options)
  }

  public get isOptimal(): boolean {
    const numberOfLayers = this.numberOfLayers
    const actualMinutesInOven = this.actualMinutesInOven

    let foundSuboptimalNode = false
    this.traverse({
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BinaryExpression](node) {
        foundSuboptimalNode =
          node.operator !== '+' ||
          !(
            (guardCallExpression(node.left, PREPARATION_TIME_IN_MINUTES) &&
              node.left.arguments.length === 1 &&
              guardIdentifier(node.left.arguments[0], numberOfLayers) &&
              guardIdentifier(node.right, actualMinutesInOven)) ||
            (guardCallExpression(node.right, PREPARATION_TIME_IN_MINUTES) &&
              node.right.arguments.length === 1 &&
              guardIdentifier(node.right.arguments[0], numberOfLayers) &&
              guardIdentifier(node.left, actualMinutesInOven))
          )
        this.skip()
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }

  public get hasCallToPreparationTime(): boolean {
    return Boolean(
      findFirst(this.implementation.body, (node): node is SpecificFunctionCall<
        typeof PREPARATION_TIME_IN_MINUTES
      > => guardCallExpression(node, PREPARATION_TIME_IN_MINUTES))
    )
  }
}

export class LasagnaSolution {
  private readonly source: Source

  public readonly remainingMinutesInOven: RemainingMinutesInOven
  public readonly totalTimeInMinutes: TotalTimeInMinutes
  private readonly preparationTimeInMinutes: ExtractedFunction
  private readonly expectedMinutesInOven: ProgramConstant

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.expectedMinutesInOven = assertPublicConstant(
      EXPECTED_MINUTES_IN_OVEN,
      exports,
      program
    )

    this.preparationTimeInMinutes = assertPublicApi(
      PREPARATION_TIME_IN_MINUTES,
      exports,
      functions
    )

    this.remainingMinutesInOven = new RemainingMinutesInOven(
      assertPublicApi(REMAINING_MINUTES_IN_OVEN, exports, functions)
    )

    this.totalTimeInMinutes = new TotalTimeInMinutes(
      assertPublicApi(TOTAL_TIME_IN_MINUTES, exports, functions)
    )
  }

  public readExemplar(directory: string): void {
    const configPath = path.join(directory, '.meta', 'config.json')
    const config = JSON.parse(
      readFileSync(configPath).toString()
    ) as MetaConfiguration

    const exemplarPath = path.join(directory, (config.files.exemplar ?? [])[0])
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

  public get constantKind(): ProgramConstant['kind'] {
    return this.expectedMinutesInOven.kind
  }

  public get hasConstantDeclaredAsConst(): boolean {
    return this.constantKind === 'const'
  }

  public get hasOptimalConstant(): boolean {
    return guardLiteral(this.expectedMinutesInOven.init!, 40)
  }

  public get hasOptimalPreparationTimeInMinutes(): boolean {
    const parameter = parameterName(this.preparationTimeInMinutes.params[0])

    let foundSuboptimalNode = false
    traverse(this.preparationTimeInMinutes.body, {
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        // this is fine
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BinaryExpression](node) {
        // TODO look for top-level constant and use that name instead.
        foundSuboptimalNode =
          node.operator !== '*' ||
          !(
            (guardIdentifier(node.left, parameter) &&
              guardIdentifier(node.right, 'PREPARATION_MINUTES_PER_LAYER')) ||
            (guardIdentifier(node.right, parameter) &&
              guardIdentifier(node.left, 'PREPARATION_MINUTES_PER_LAYER'))
          )
        this.skip()
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }
}
