import {
  AstParser,
  AstTraverser,
  ExtractedExport,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findTopLevelConstants,
  guardBinaryExpression,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  ProgramConstant,
  StructureError,
  traverse,
} from '@exercism/static-analysis'
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import { assertNamedExport } from '~src/asserts/assert_named_export'
import { assertNamedFunction } from '~src/asserts/assert_named_function'
import { Source } from '../../SourceImpl'
import { parameterName } from '../../utils/extract_parameter'
import path from 'path'

const REMAINING_MINUTES_IN_OVEN = 'remainingMinutesInOven'
const PREPARATION_TIME_IN_MINUTES = 'preparationTimeInMinutes'
const TOTAL_TIME_IN_MINUTES = 'totalTimeInMinutes'
const EXPECTED_MINUTES_IN_OVEN = 'EXPECTED_MINUTES_IN_OVEN'

export class NoPublicConstantError extends StructureError {
  constructor(public name: string) {
    super(`Expected an exported constant named ${name}, but did not find it.`)

    Error.captureStackTrace(this, this.constructor)
  }
}

function assertPublicApi(
  exported: string,
  exports: ExtractedExport[],
  functions: ExtractedFunction[]
): ExtractedFunction {
  const namedExport = assertNamedExport(exported, exports)
  return assertNamedFunction(namedExport.local, functions)
}

function assertPublicConstant(
  exported: string,
  exports: ExtractedExport[],
  root: TSESTree.Node
): ProgramConstant {
  const namedExport = assertNamedExport(exported, exports)
  const result = findTopLevelConstants(root, ['let', 'const', 'var']).find(
    (constant) =>
      guardIdentifier(constant.id) && constant.id.name === namedExport.name
  )

  if (!result) {
    throw new NoPublicConstantError(exported)
  }

  return result
}

export class LasagnaSolution {
  private readonly source: Source

  private readonly remainingMinutesInOven: ExtractedFunction
  private readonly preparationTimeInMinutes: ExtractedFunction
  private readonly totalTimeInMinutes: ExtractedFunction
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

    this.remainingMinutesInOven = assertPublicApi(
      REMAINING_MINUTES_IN_OVEN,
      exports,
      functions
    )

    this.preparationTimeInMinutes = assertPublicApi(
      PREPARATION_TIME_IN_MINUTES,
      exports,
      functions
    )

    this.totalTimeInMinutes = assertPublicApi(
      TOTAL_TIME_IN_MINUTES,
      exports,
      functions
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

  public get hasConstantDeclaredAsConst(): boolean {
    return this.expectedMinutesInOven.kind === 'const'
  }

  public get hasOptimalConstant(): boolean {
    return guardLiteral(this.expectedMinutesInOven.init!, 40)
  }

  public get hasOptimalRemainingMinutesInOven(): boolean {
    const parameter = parameterName(this.remainingMinutesInOven.params[0])

    let foundSuboptimalNode = false
    traverse(this.remainingMinutesInOven.body, {
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

  public get hasOptimalTotalTimeInMinutes(): boolean {
    const numberOfLayers = parameterName(this.totalTimeInMinutes.params[0])
    const actualMinutesInOven = parameterName(this.totalTimeInMinutes.params[1])

    let foundSuboptimalNode = false
    traverse(this.totalTimeInMinutes.body, {
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
}
