import { readFileSync } from 'node:fs'
import path from 'node:path'

export function readConfig(directory: string): object {
  const configPath = path.join(directory, '.meta', 'config.json')
  return JSON.parse(readFileSync(configPath).toString()) as object
}

export function exemplarPath(directory: string): string {
  const config = readConfig(directory)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  return path.join(directory, (config as any).files.exemplar[0])
}
