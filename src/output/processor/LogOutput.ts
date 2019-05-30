import { getProcessLogger } from '../../utils/logger'

export const LogOutput: OutputProcessor = async (previous: Promise<string>): Promise<string> => {
  const output = await previous
  getProcessLogger().log(`=> output: \n\n${output}\n`)
  return output
}
