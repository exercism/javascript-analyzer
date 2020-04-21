import { getProcessLogger } from '~src/utils/logger'
import { OutputProcessor } from '~src/interface'

export const LogOutput: OutputProcessor = async (previous: Promise<string>): Promise<string> => {
  const output = await previous
  getProcessLogger().log(`=> output: \n\n${output}\n`)
  return output
}
