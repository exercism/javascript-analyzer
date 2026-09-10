import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { CommentType, factory } from '~src/comments/comment'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '~src/comments/shared'
import { ExecutionOptions, WritableOutput } from '~src/interface'
import { IsolatedAnalyzerImpl } from '~src/analyzers/IsolatedAnalyzerImpl'
import {
  BIRDS_IN_WEEK,
  BirdWatcherSolution,
  FIX_BIRD_COUNT_LOG,
  TOTAL_BIRD_COUNT,
} from './BirdWatcherSolution'

const USE_FOR_LOOP = factory<'function'>`
📕 The learning exercise exist to practice or demonstrate your knowledge of \`for-loops\`.
This is different from practice exercises where you are asked to solve the best way you
possibly can.

💬 Update the function \`${'function'}\` so that it makes use of \`for-loops\`.

`('javascript.bird-watcher.uses_for_loop', CommentType.Actionable)

const PREFER_SHORTHAND_ASSIGNMENT = factory<'function'>`
You can reduce some cognitive overhead when it comes to assignment in equations.
One way to do this is using shorthand assignment that allows you to remove duplication.

An example of assignment:

\`\`\`javascript
x = x + 1
\`\`\`

can be in the short hand:

\`\`\`javascript
x += 1
\`\`\`

Usage found in \`${'function'}\` if you are interested in modifying your solution.
`(
  'javascript.bird-watcher.prefer_shorthand_assignment',
  CommentType.Informative
)

type Program = TSESTree.Program

export class BirdWatcherAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: BirdWatcherSolution

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

    if (!this.solution.birdsInWeek.hasFor) {
      output.add(USE_FOR_LOOP({ function: BIRDS_IN_WEEK }))
    }

    if (!this.solution.totalBirdCount.hasFor) {
      output.add(USE_FOR_LOOP({ function: TOTAL_BIRD_COUNT }))
    }
    if (!this.solution.totalBirdCount.usesShorthandAssignment) {
      output.add(PREFER_SHORTHAND_ASSIGNMENT({ function: TOTAL_BIRD_COUNT }))
    }

    if (!this.solution.fixBirdCountLog.hasFor) {
      output.add(USE_FOR_LOOP({ function: FIX_BIRD_COUNT_LOG }))
    }
    if (!this.solution.fixBirdCountLog.usesShorthandAssignment) {
      output.add(PREFER_SHORTHAND_ASSIGNMENT({ function: FIX_BIRD_COUNT_LOG }))
    }

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): BirdWatcherSolution | never {
    try {
      return new BirdWatcherSolution(program, source)
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
}
export default BirdWatcherAnalyzer
