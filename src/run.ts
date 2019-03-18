import { BaseAnalyzer } from "./analyzers/base_analyzer"
import { get as getLogger } from "./utils/logger"

export async function run(analyzer: BaseAnalyzer, outputDir: string) {
  const logger = getLogger()

  const output = await analyzer.run()
  logger.log(`=> output: \n\n${output.toString()}\n`)

  await output.writeTo(outputDir)

  logger.log('=> DONE')
}
