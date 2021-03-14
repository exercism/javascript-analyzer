import { InlineInput } from '@exercism/static-analysis'
import { Analyzer, ExecutionOptions, Output } from '~src/interface'

type AnalyzerFactory = () => Analyzer
type analyze = (solutionContent: string) => Promise<Output>

const EMPTY_OPTIONS: Omit<
  ExecutionOptions,
  'exercise' | 'inputDir' | 'output'
> = {
  debug: false,
  console: false,
  dry: false,
  noTemplates: false,
  pretty: true,
}

export function makeOptions(
  changes: Partial<ExecutionOptions>
): Omit<ExecutionOptions, 'exercise' | 'inputDir' | 'output'> &
  Partial<Pick<ExecutionOptions, 'exercise' | 'inputDir' | 'output'>> {
  return { ...EMPTY_OPTIONS, ...changes }
}

export function makeAnalyze(
  AnalyzerFactory: AnalyzerFactory,
  options: Omit<
    ExecutionOptions,
    'exercise' | 'inputDir' | 'output'
  > = EMPTY_OPTIONS
): analyze {
  return async function (solutionContent: string): Promise<Output> {
    const analyzer = AnalyzerFactory()
    const input = new InlineInput([solutionContent])

    const fullOptions = options

    if (!Object.prototype.hasOwnProperty.call(fullOptions, 'exercise')) {
      Object.defineProperty(fullOptions, 'exercise', {
        get: () => {
          throw new Error(
            'No exercise given. Pass second argument to makeAnalyze(...).'
          )
        },
      })
    }

    if (!Object.prototype.hasOwnProperty.call(fullOptions, 'inputDir')) {
      Object.defineProperty(fullOptions, 'inputDir', {
        get: () => {
          throw new Error(
            'No inputDir given. Pass second argument to makeAnalyze(...).'
          )
        },
      })
    }

    if (!Object.prototype.hasOwnProperty.call(fullOptions, 'output')) {
      Object.defineProperty(fullOptions, 'output', {
        get: () => {
          throw new Error(
            'No output given. Pass second argument to makeAnalyze(...).'
          )
        },
      })
    }

    return analyzer.run(input, fullOptions as ExecutionOptions)
  }
}
