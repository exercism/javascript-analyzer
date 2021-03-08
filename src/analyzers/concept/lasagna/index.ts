import {
  AstParser,
  ExtractedExport,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  extractVariables,
  findTopLevelConstants,
  guardIdentifier,
  guardLiteral,
  Input,
  NoExportError,
  NoMethodError,
  ProgramConstant,
  StructureError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { factory } from '~src/comments/comment'
import { extractNamedFunction } from '~src/extracts/extract_named_function'
import { WritableOutput } from '~src/interface'
import { assertNamedExport } from '../../../asserts/assert_named_export'
import { assertNamedFunction } from '../../../asserts/assert_named_function'
import { NO_METHOD, NO_NAMED_EXPORT } from '../../../comments/shared'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { Source } from '../../SourceImpl'

const SIGNATURE_CHANGED = factory`
📕 Don't change the function declarations unless absolutely necessary. The stub
provides the correct exports and correct function declarations, with the
expected amount and format of parameters. It is sometimes possible to change the
function signature (change how its parameters work), but in this case the
parameters were already optimally defined.
`('javascript.lasagna.signature_changed')

type Program = TSESTree.Program

export class LasagnaAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: LasagnaSolution

  protected async execute(input: Input, output: WritableOutput): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

    this.solution = this.checkStructure(parsed.program, parsed.source, output)

    if (!this.solution.hasConstantDeclaredAsConst) {
      throw new Error(
        'informational: talk about SCREAMING_SNAKE_CASE convention'
      )
    }

    if (!this.solution.hasOptimalConstant) {
      throw new Error('not optimal constant')
    }

    // remainingMinutesInOven.body

    /* "argument": {
      "type": "BinaryExpression",
      "operator": "-",
      "left": {
        "type": "Identifier",
        "name": "EXPECTED_MINUTES_IN_OVEN",
      },
      "right": {
        "type": "Identifier",
        "name": "actualMinutesInOven",
      },
    },*/

    /*
    "type": "BinaryExpression",
    "operator": "*",
    "left": {
      "type": "Identifier",
      "name": "numberOfLayers",
    },
    "right": {
      "type": "Identifier",
      "name": "PREPARATION_MINUTES_PER_LAYER",
    },*/

    /*
    "type": "BinaryExpression",
    "operator": "+",
    "left": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "preparationTimeInMinutes",
      },
      "arguments": [
        {
          "type": "Identifier",
          "name": "numberOfLayers",
        }
      ],
      "optional": false,
    },
    "right": {
      "type": "Identifier",
      "name": "actualMinutesInOven",
    },*/
    output.approve()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): LasagnaSolution | never {
    try {
      return new LasagnaSolution(program, source)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.disapprove(NO_METHOD({ 'method.name': error.method }))
      }

      if (error instanceof NoExportError) {
        output.disapprove(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
      }

      throw error
    }
  }
}

class NoPublicConstantError extends StructureError {
  constructor(public name: string) {
    super(`Expected an exported constant named ${name}, but did not find it.`)

    Error.captureStackTrace(this, this.constructor)
  }
}

const REMAINING_MINUTES_IN_OVEN = 'remainingMinutesInOven'
const PREPARATION_TIME_IN_MINUTES = 'preparationTimeInMinutes'
const TOTAL_TIME_IN_MINUTES = 'totalTimeInMinutes'
const EXPECTED_MINUTES_IN_OVEN = 'EXPECTED_MINUTES_IN_OVEN'

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

class LasagnaSolution {
  private readonly source: Source

  private readonly remainingMinutesInOven: ExtractedFunction
  private readonly preparationTimeInMinutes: ExtractedFunction
  private readonly totalTimeInMinutes: ExtractedFunction
  private readonly expectedMinutesInOven: ProgramConstant

  constructor(public readonly program: Program, source: string) {
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
}
