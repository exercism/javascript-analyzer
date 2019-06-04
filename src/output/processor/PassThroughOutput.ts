
export const PassThroughOutput: OutputProcessor = async (previous: Promise<string>): Promise<string> => {
  return previous
}
