import { readDir } from "~src/utils/fs";
import { FileInput } from "./FileInput";

import nodePath from 'path'

const EXTENSIONS = /\.(jsx?|tsx?|mjs)$/
const TEST_FILES = /\.spec|test\./
const CONFIGURATION_FILES = /(?:babel\.config\.js|jest\.config\.js|\.eslintrc\.js)$/

export class DirectoryInput implements Input {
  constructor(private readonly path: string, private readonly exerciseSlug: string) {}

  public async read(n = 1): Promise<string[]> {
    const files = await readDir(this.path)

    const candidates = findCandidates(files, n, `${this.exerciseSlug}.js`)
    const fileSources = await Promise.all(
      candidates.map((candidate): Promise<string> => {
        return new FileInput(nodePath.join(this.path, candidate))
          .read()
          .then(([source]): string => source)
      })
    )

    return fileSources
  }
}

/**
 * Given a list of files, finds up to n files that are not test files and have
 * an extension that will probably work with the estree analyzer.
 *
 * @param files the file candidates
 * @param n the number of files it should return
 * @param preferredNames the names of the files it prefers
 */
function findCandidates(files: string[], n: number, ...preferredNames: string[]): string[] {
  const candidates = files
    .filter((file): boolean => EXTENSIONS.test(file))
    .filter((file): boolean => !TEST_FILES.test(file))
    .filter((file): boolean => !CONFIGURATION_FILES.test(file))

  const preferredMatches = preferredNames
    ? candidates.filter((file): boolean => preferredNames.includes(file))
    : []

  const allMatches = preferredMatches.length >= n
    ? preferredMatches
    : preferredMatches.concat(candidates.filter((file): boolean => !preferredMatches.includes(file)))

  return allMatches.slice(0, n)
}
