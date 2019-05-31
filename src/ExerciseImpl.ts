export class ExerciseImpl implements Exercise {
  constructor(public readonly slug: string) {
    if (!slug) {
      throw new Error(`Expected valid exercise slug, got '${slug}'`)
    }
  }
}
