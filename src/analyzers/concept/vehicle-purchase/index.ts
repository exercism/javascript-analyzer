import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { CommentType, factory } from '../../../comments/comment'
import {
  EXEMPLAR_SOLUTION,
  FUNCTION_NOT_OPTIMAL,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '../../../comments/shared'
import { WritableOutput, ExecutionOptions } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import {
  CALCULATE_RESELL_PRICE,
  CHOOSE_VEHICLE,
  NEEDS_LICENSE,
  VehiclePurchaseSolution,
} from './VehiclePurchaseSolution'
type Program = TSESTree.Program

const UNNECESSARY_IF_STATEMENT = factory`
Instead of creating an \`if (...) {}\` block, leverage the boolean value directly
that can be returned from checking the value of the parameter.

For example, the following:

\`\`\`javascript
if (param === true) {
  return true;
}
\`\`\`

can be turned into:

\`\`\`javascript
return param === true
\`\`\`
`(
  'javascript.vehicle-purchase.unnecessary_if_statement',
  CommentType.Actionable
)

const USE_IF_ELSE = factory<'function'>`
Nice.
That's an \_early return\_.
For the purpose of the Concept that this exercise aims to teach, try solving this
using an \`else\` statement.
`('javascript.vehicle-purchase.use_if_else', CommentType.Informative)

export class VehiclePurchaseAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: VehiclePurchaseSolution

  protected async execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

    this.solution = this.checkStructure(parsed.program, parsed.source, output)
    this.solution.readExemplar(options.inputDir)

    if (this.solution.isExemplar) {
      output.add(EXEMPLAR_SOLUTION())
      output.finish()
    }

    if (this.solution.needsLicense.hasConditional) {
      output.add(UNNECESSARY_IF_STATEMENT())
      output.finish()
    }

    if (!this.solution.chooseVehicle.usesIfElse) {
      output.add(USE_IF_ELSE({ function: CHOOSE_VEHICLE }))
      output.finish()
    }

    if (!this.solution.calculateResellPrice.usesIfElse) {
      output.add(USE_IF_ELSE({ function: CALCULATE_RESELL_PRICE }))
      output.finish()
    }

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): VehiclePurchaseSolution | never {
    try {
      return new VehiclePurchaseSolution(program, source)
    } catch (error: unknown) {
      if (error instanceof NoMethodError) {
        output.add(NO_METHOD({ 'method.name': error.method }))
        output.finish()
      }

      if (error instanceof NoExportError) {
        output.add(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
      }

      throw error
    }
  }
}

export default VehiclePurchaseAnalyzer
