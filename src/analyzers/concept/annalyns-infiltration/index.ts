import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { CommentType, factory } from '../../../comments/comment'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '../../../comments/shared'
import { ExecutionOptions, WritableOutput } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { AnnalynsInfiltrationSolution } from './AnnalynsInfiltrationSolution'

export const MUST_NOT_USE_LITERALS = factory`
  Remove all unnecessary literals.

  In JavaScript it's not necessary to \`return\` the literal \`true\` or
  \`false\` in order to return a boolean. The result of an expression can be
  returned directly.

  \`\`\`javascript
  // instead of
  if (some_expression) {
    return true
  } else {
    return false
  }

  // ...in JavaScript, these can be returned directly
  return some_expression
  \`\`\`
`(
  'javascript.annalyns-infiltration.must_not_use_literals',
  CommentType.Essential
)

export const MUST_NOT_EXPLICITLY_CAST = factory`
  Remove all explicit calls to Boolean(...).

  In JavaScript, the result of an expression does not need to be _cast_ to a
  specific type. For example, the result of a binary expression can be
  returned as is, and does not require another call to make it a boolean.

  \`\`\`javascript
  // instead of
  return Boolean(some_expression)

  // ...In JavaScript, in general, values don't need to be explicitly changed
  return some_expression
`(
  'javascript.annalyns-infiltration.must_not_explicitly_cast',
  CommentType.Essential
)

export const MUST_NOT_USE_BITWISE = factory`
  Use logical operators instead of bitwise operators.

  Whilst there is nothing wrong with using bitwise operators (such as \`|\` and
  \`&\`), this exercise wants you to explore logical boolean operators (such 
  as \`||\` and \`&&\`). Different exercises are devoted to bitwise operators.
`(
  'javascript.annalyns-infiltration.must_not_use_bitwise',
  CommentType.Essential
)

export const CAN_SIMPLIFY_CONDITIONALS = factory`
  Simplify or remove if statements.

  This exercise is meant to explore booleans and boolean operators. No if
  statements are required to complete this exercise.
`(
  'javascript.annalyns-infiltration.can_simplify_conditionals',
  CommentType.Actionable
)

type Program = TSESTree.Program

export class AnnalynsInfiltrationAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: AnnalynsInfiltrationSolution

  protected async execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

    this.solution = this.checkStructure(parsed.program, parsed.source, output)
    this.solution.readExemplar(options.inputDir)

    if (this.solution.isExemplar || this.solution.isOptimal) {
      output.add(EXEMPLAR_SOLUTION())
      output.finish()
    }

    if (this.solution.hasLiteralBoolean) {
      output.add(MUST_NOT_USE_LITERALS())
    }

    if (this.solution.hasBooleanCast) {
      output.add(MUST_NOT_EXPLICITLY_CAST())
    }

    if (this.solution.hasBitwise) {
      output.add(MUST_NOT_USE_BITWISE())
    }

    if (this.solution.hasUnnecessaryConditional) {
      output.add(CAN_SIMPLIFY_CONDITIONALS())
    }

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): AnnalynsInfiltrationSolution | never {
    try {
      return new AnnalynsInfiltrationSolution(program, source)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.add(NO_METHOD({ 'method.name': error.method }))
        output.finish()
      }

      if (error instanceof NoExportError) {
        output.add(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
        output.finish()
      }

      throw error
    }
  }
}

export default AnnalynsInfiltrationAnalyzer
