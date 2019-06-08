import { InlineInput } from "~test/helpers/input/InlineInput";

type AnalyzerFactory = () => Analyzer
type analyze = (solutionContent: string) => Promise<Output>

export function makeAnalyze(AnalyzerFactory: AnalyzerFactory): analyze {
  return async function (solutionContent: string): Promise<Output> {
    const analyzer = AnalyzerFactory()
    const input = new InlineInput([solutionContent])

    return analyzer.run(input)
  }
}
