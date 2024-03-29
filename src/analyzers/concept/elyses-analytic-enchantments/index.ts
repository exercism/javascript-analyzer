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
  PREFER_BUILT_IN_METHOD,
} from '../../../comments/shared'
import { WritableOutput, ExecutionOptions } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import {
  DOES_STACK_INCLUDE_CARD,
  DOES_STACK_INCLUDE_ODD_CARD,
  ElysesAnalyticEnchantmentsSolution,
  GET_CARD_POSITION,
  GET_FIRST_EVEN_CARD_POSITION,
  GET_FIRST_ODD_CARD,
  IS_EACH_CARD_EVEN,
} from './ElysesAnalyticEnchantmentsSolution'

type Program = TSESTree.Program

export const MUST_AVOID_IMPERATIVE_LOOP = factory`
  Avoid use of for loops with this exercise.

  According to the introduction, there are built-in methods on the JavaScript Array object that are geared towards analysis.

  Take a look at the introduction and/or the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods) on what methods are available to use.
`(
  'javascript.elyses-analytic-enchantments.must_avoid_imperative_loop',
  CommentType.Essential
)

export class ElysesAnalyticEnchantmentsAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: ElysesAnalyticEnchantmentsSolution

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

    if (this.solution.hasImperativeLoop) {
      output.add(MUST_AVOID_IMPERATIVE_LOOP())
      output.finish()
    }

    this.checkCorrectMethodUsed(output)

    this.checkForOptimalSolutions(output)

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): ElysesAnalyticEnchantmentsSolution | never {
    try {
      return new ElysesAnalyticEnchantmentsSolution(program, source)
    } catch (error) {
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

  private checkCorrectMethodUsed(output: WritableOutput): void {
    if (!this.solution.stackIncludesCard.usesIncludes) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'includes',
        })
      )
      output.finish()
    }

    if (!this.solution.cardPosition.usesIndexOf) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'indexOf',
        })
      )
      output.finish()
    }

    if (!this.solution.firstEvenCard.usesFindIndex) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'findIndex',
        })
      )
      output.finish()
    }

    if (!this.solution.firstOddCard.usesFind) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'find',
        })
      )
      output.finish()
    }

    if (!this.solution.stackIncludesOdd.usesSome) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'some',
        })
      )
      output.finish()
    }

    if (!this.solution.cardsAreEven.usesEvery) {
      output.add(
        PREFER_BUILT_IN_METHOD({
          type: 'Array',
          method: 'every',
        })
      )
      output.finish()
    }
  }

  private checkForOptimalSolutions(output: WritableOutput): void {
    if (!this.solution.cardPosition.isOptimal) {
      output.add(FUNCTION_NOT_OPTIMAL({ function: GET_CARD_POSITION }))
      output.finish()
    }

    if (!this.solution.stackIncludesCard.isOptimal) {
      output.add(FUNCTION_NOT_OPTIMAL({ function: DOES_STACK_INCLUDE_CARD }))
      output.finish()
    }

    if (!this.solution.cardsAreEven.isOptimal) {
      output.add(FUNCTION_NOT_OPTIMAL({ function: IS_EACH_CARD_EVEN }))
      output.finish()
    }

    if (!this.solution.stackIncludesOdd.isOptimal) {
      output.add(
        FUNCTION_NOT_OPTIMAL({ function: DOES_STACK_INCLUDE_ODD_CARD })
      )
      output.finish()
    }

    if (!this.solution.firstOddCard.isOptimal) {
      output.add(FUNCTION_NOT_OPTIMAL({ function: GET_FIRST_ODD_CARD }))
      output.finish()
    }

    if (!this.solution.firstEvenCard.isOptimal) {
      output.add(
        FUNCTION_NOT_OPTIMAL({ function: GET_FIRST_EVEN_CARD_POSITION })
      )
      output.finish()
    }
  }
}
export default ElysesAnalyticEnchantmentsAnalyzer
