import { Solution } from "../../src/solution";
import { Exercise } from "../../src/exercise";

export class InlineSolution extends Solution {
  /**
   * Create a new solution reference
   *
   * @param rootDir the path to the root directory of the solution
   * @param exercise the exercise this solution belongs to
   */
  constructor(private readonly solutionFiles: string[], exercise: Exercise) {
    super('__fake__', exercise)
  }

  /**
   * Read the solution file(s)
   *
   * @param n number of files to return
   * @returns promise that resolves all the files at once
   */
  public async read(n = 1): Promise<Buffer[]> {

    return Promise.all(
      Object.keys(this.solutionFiles)
        .slice(0, n)
        .map(name => Buffer.from(this.solutionFiles[name], 'utf8'))
    )
  }
}
