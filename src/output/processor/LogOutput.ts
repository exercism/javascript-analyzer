import { getProcessLogger } from '@exercism/static-analysis'
import type { OutputProcessor } from '~src/interface'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LogOutput: OutputProcessor = async (
  previous: Promise<string>
): Promise<string> => {
  const output = await previous
  getProcessLogger().log(`=> output: \n\n${output}\n`)
  return output
}
