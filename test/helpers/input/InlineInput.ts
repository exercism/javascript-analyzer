
export class InlineInput implements Input {
  /**
   * Create a new solution reference
   *
   * @param rootDir the path to the root directory of the solution
   * @param exercise the exercise this solution belongs to
   */
  constructor(private readonly solutionFiles: string[]) { }

  /**
   * Read the solution file(s)
   *
   * @param n number of files to return
   * @returns promise that resolves all the files at once
   */
  public async read(n = 1): Promise<string[]> {
    return Promise.all(
      this.solutionFiles
        .slice(0, n)
    )
  }
}
