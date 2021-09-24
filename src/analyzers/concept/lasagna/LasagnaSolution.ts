import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findFirst,
  findRawLiteral,
  findTopLevelConstants,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  Identifier,
  IdentifierWithName,
  ProgramConstant,
  ProgramConstants,
  SpecificFunctionCall,
  traverse,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
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

  public get hasReplaceableLiteral(): boolean {
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

    // Optimal implementation looks like this:
    //
    // function totalTimeInMinutes(numberOfLayers, actualMinutesInOven) {
    //   return actualMinutesInOven + preparationTimeInMinutes(numberOfLayers)
    // }
    //
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
    return !!findFirst(
      this.implementation.body,
      (
        node
      ): node is SpecificFunctionCall<typeof PREPARATION_TIME_IN_MINUTES> =>
        guardCallExpression(node, PREPARATION_TIME_IN_MINUTES)
    )
  }
}

class PreparationTimeInMinutes {
  private numberOfLayers: string

  constructor(
    private readonly implementation: ExtractedFunction,
    private readonly constants: ProgramConstants
  ) {
    this.numberOfLayers = parameterName(this.implementation.params[0])
  }

  public traverse(options: Parameters<typeof traverse>[1]): void {
    traverse(this.implementation.body, options)
  }

  /**
   * Extract the name of the constant (`const`) that should be used
   * instead of a magic number (`PREPARATION_MINUTES_PER_LAYER`).
   *
   * @returns the name of the constant, or `PREPARATION_MINUTES_PER_LAYER` if
   *          it can't be found
   */
  public get predefinedConstantName(): string {
    return (
      (
        this.constants.find(
          (constant) =>
            !!(
              guardIdentifier(constant.id) &&
              constant.init &&
              guardLiteral(constant.init, 2)
            )
        )?.id as Identifier
      )?.name ?? 'PREPARATION_MINUTES_PER_LAYER'
    )
  }

  public get hasReplaceableLiteral(): boolean {
    const hasConstantLiteral = findFirst(
      this.implementation.body,
      (node): node is IdentifierWithName<typeof EXPECTED_MINUTES_IN_OVEN> =>
        guardIdentifier(node, EXPECTED_MINUTES_IN_OVEN)
    )
    const hasLiteral = findRawLiteral(this.implementation.body, '40')
    return Boolean(hasLiteral && !hasConstantLiteral)
  }

  /**
   * Determines if the solution uses the `PREPARATION_MINUTES_PER_LAYER` inside
   * the `preparationTimeInMinutes` function.
   */
  public get usesPredefinedConstant(): boolean {
    const parameter = this.numberOfLayers
    const constantName = this.predefinedConstantName

    let foundConstantUsage = false

    // const PREPARATION_MINUTES_PER_LAYER = 2
    //
    // function preparationTimeInMinutes(numberOfLayers) {
    //  return numberOfLayers * PREPARATION_MINUTES_PER_LAYER;
    // }
    //
    this.traverse({
      [AST_NODE_TYPES.BinaryExpression](node) {
        foundConstantUsage =
          node.operator === '*' &&
          ((guardIdentifier(node.left, parameter) &&
            guardIdentifier(node.right, constantName)) ||
            (guardIdentifier(node.right, parameter) &&
              guardIdentifier(node.left, constantName)))

        this.skip()
      },
    })

    return foundConstantUsage
  }

  public get isOptimal(): boolean {
    const parameter = this.numberOfLayers
    const constantName = this.predefinedConstantName

    let foundSuboptimalNode = false

    // function preparationTimeInMinutes(numberOfLayers) {
    //   return numberOfLayers * PREPARATION_MINUTES_PER_LAYER;
    // }
    //
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
        // Don't know what's going on if it's not multiplication
        foundSuboptimalNode =
          node.operator !== '*' ||
          !(
            // Magic number problem
            (
              (guardIdentifier(node.left, parameter) &&
                guardIdentifier(node.right, constantName)) ||
              (guardIdentifier(node.right, parameter) &&
                guardIdentifier(node.left, constantName))
            )
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

export class LasagnaSolution {
  private readonly source: Source

  public readonly remainingMinutesInOven: RemainingMinutesInOven
  public readonly totalTimeInMinutes: TotalTimeInMinutes
  public readonly preparationTimeInMinutes: PreparationTimeInMinutes
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

    this.preparationTimeInMinutes = new PreparationTimeInMinutes(
      assertPublicApi(PREPARATION_TIME_IN_MINUTES, exports, functions),
      findTopLevelConstants(this.program, ['const', 'let', 'var'])
    )

    this.remainingMinutesInOven = new RemainingMinutesInOven(
      assertPublicApi(REMAINING_MINUTES_IN_OVEN, exports, functions)
    )

    this.totalTimeInMinutes = new TotalTimeInMinutes(
      assertPublicApi(TOTAL_TIME_IN_MINUTES, exports, functions)
    )
  }

  /**
   * Reads the exemplar solution from the .meta directory
   *
   * @param directory base directory to this solution
   */
  public readExemplar(directory: string): void {
    const configPath = path.join(directory, '.meta', 'config.json')
    const config = JSON.parse(readFileSync(configPath).toString())

    const exemplarPath = path.join(directory, config.files.exemplar[0])
    this.exemplar = new Source(readFileSync(exemplarPath).toString())
  }

  /**
   * The solution is considered exemplar if it's _exactly_ the same as the
   * `exemplar.js` solution from `.meta`.
   *
   * TODO: account for non-structural changes such as left and right hand
   *       side of a binary expression involving `*` or `+`
   */
  public get isExemplar(): boolean {
    const exemplarAst = AstParser.REPRESENTER.parseSync(
      this.exemplar.toString()
    )
    const sourceAst = AstParser.REPRESENTER.parseSync(this.source.toString())

    return (
      JSON.stringify(sourceAst[0].program) ===
      JSON.stringify(exemplarAst[0].program)
    )
  }

  /**
   * Find the type of the variable of the student defined constant
   *
   * ```javascript
   *   export [kind] EXPECTED_MINUTES_IN_OVEN = 40
   * ```
   *
   * @returns the kind: `const`, `let`, or `var`
   */
  public get constantKind(): ProgramConstant['kind'] {
    return this.expectedMinutesInOven.kind
  }

  public get hasConstantDeclaredAsConst(): boolean {
    return this.constantKind === 'const'
  }

  public get hasOptimalConstant(): boolean {
    return guardLiteral(this.expectedMinutesInOven.init!, 40)
  }
}
