import type { OutputProcessor } from '~src/interface'

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PassThroughOutput: OutputProcessor = async (
  previous: Promise<string>
): Promise<string> => {
  return previous
}
