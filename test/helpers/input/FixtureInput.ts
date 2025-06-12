import { DirectoryInput } from '@exercism/static-analysis'
import nodePath from 'node:path'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

export class FixtureInput extends DirectoryInput {
  /**
   * Create a new fixture reference
   *
   * @param slug the slug of the exercise
   * @param num the exercise index
   */
  constructor(
    slug: string,
    private readonly num: number
  ) {
    super(
      nodePath.join(__dirname, '..', '..', 'fixtures', slug, num.toString()),
      slug
    )
  }
}
