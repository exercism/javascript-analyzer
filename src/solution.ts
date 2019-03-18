import path from 'path'

import { Exercise } from "./exercise"
import { readDir, readFile, existsSync } from './utils/fs'

const EXTENSIONS = /\.(js|ts|mjs)$/
const TEST_FILES = /\.spec|test\./

function findCandidates(files: string[], n: number) {
  return files
    .filter(file => EXTENSIONS.test(file))
    .filter(file => !TEST_FILES.test(file))
    .slice(0, n)
}

export class Solution {
  constructor(private readonly rootDir: string, private readonly exercise: Exercise) {
    if (!rootDir) {
      throw new Error(`Expected valid exercise inputDir, got '${rootDir}'`)
    }

    if (!existsSync(rootDir)) {
      throw new Error(`The inputDir ${rootDir} does not exist or is not accessible`)
    }
  }

  public async read(n = 1): Promise<Buffer[]> {
    const files = await readDir(this.rootDir)
    const candidates = await findCandidates(files, n)

    return Promise.all(
      candidates.map(candidate => readFile(path.join(this.rootDir, candidate)))
    )
  }
}