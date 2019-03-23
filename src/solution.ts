import path from 'path'

import { Exercise } from './exercise'
import { readDir, readFile, exists } from './utils/fs'

const EXTENSIONS = /\.(jsx?|tsx?|mjs)$/
const TEST_FILES = /\.spec|test\./

/**
 * Given a list of files, finds up to n files that are not test files and have
 * an extension that will probably work with the estree analyzer.
 *
 * @param files the file candidates
 * @param n the number of files it should return
 * @param preferredNames the names of the files it prefers
 */
function findCandidates(files: string[], n: number, ...preferredNames: string[]) {
  const candidates = files
    .filter(file => EXTENSIONS.test(file))
    .filter(file => !TEST_FILES.test(file))

  const preferredMatches = preferredNames
    ? candidates.filter(file => preferredNames.includes(file))
    : []

  const allMatches = preferredMatches.length >= n
    ? preferredMatches
    : preferredMatches.concat(candidates.filter(file => !preferredMatches.includes(file)))

  return allMatches.slice(0, n)
}

export class Solution {
  /**
   * Create a new solution reference
   *
   * @param rootDir the path to the root directory of the solution
   * @param exercise the exercise this solution belongs to
   */
  constructor(private readonly rootDir: string, private readonly exercise: Exercise) {
    if (!rootDir) {
      throw new Error(`Expected valid exercise inputDir, got '${rootDir}'`)
    }
  }

  /**
   * Read the solution file(s)
   *
   * @param n number of files to return
   * @returns promise that resolves all the files at once
   */
  public async read(n = 1): Promise<Buffer[]> {
    if (!await exists(this.rootDir)) {
      throw new Error(`The inputDir ${this.rootDir} does not exist or is not accessible`)
    }

    const files = await readDir(this.rootDir)
    const candidates = await findCandidates(files, n, `${this.exercise.slug}.ts`)

    return Promise.all(
      candidates.map(candidate => readFile(path.join(this.rootDir, candidate)))
    )
  }
}
