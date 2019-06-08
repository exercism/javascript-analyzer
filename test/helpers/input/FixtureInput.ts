import { DirectoryInput } from "~src/input/DirectoryInput";

import nodePath from 'path'

export class FixtureInput extends DirectoryInput {
  /**
   * Create a new fixture reference
   *
   * @param slug the slug of the exercise
   * @param num the exercise index
   */
  constructor(slug: string, private readonly num: number) {
    super(nodePath.join(__dirname, '..', '..', 'fixtures', slug, num.toString()), slug)
  }
}
