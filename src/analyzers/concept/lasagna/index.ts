import {
  AstParser,
  extractExports,
  extractVariables,
  guardIdentifier,
  guardLiteral,
  Input,
} from '@exercism/static-analysis'
import { WritableOutput } from '~src/interface'
import { extractNamedFunction } from '../../../extracts/extract_named_function'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'

export class LasagnaAnalyzer extends IsolatedAnalyzerImpl {
  protected async execute(input: Input, output: WritableOutput): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

    const exports = extractExports(parsed.program)

    if (
      exports.length < 4 ||
      [
        'EXPECTED_MINUTES_IN_OVEN',
        'remainingMinutesInOven',
        'preparationTimeInMinutes',
        'totalTimeInMinutes',
      ].some((expected) => !exports.some((item) => item.name === expected))
    ) {
      throw new Error('Does not pass the tests.')
    }

    const constant = extractVariables(parsed.program).find(
      (variable) => variable.name === 'EXPECTED_MINUTES_IN_OVEN'
    )

    if (constant?.kind !== 'const') {
      throw new Error(
        'informational: talk about SCREAMING_SNAKE_CASE convention'
      )
    }

    if (!guardLiteral(constant!.init!, 40)) {
      throw new Error('not optimal constant')
    }

    const remainingMinutesInOven = extractNamedFunction(
      'remainingMinutesInOven',
      parsed.program
    )!

    if (
      remainingMinutesInOven.params.length !== 1 ||
      !guardIdentifier(remainingMinutesInOven.params[0])
    ) {
      throw new Error('parameter was added, or changed')
    }

    const param = remainingMinutesInOven.params[0].name

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
}
