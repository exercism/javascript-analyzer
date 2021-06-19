import { getProcessLogger } from '@exercism/static-analysis'
import path from 'path'
import type { Analyzer, Exercise } from '~src/interface'

type AnalyzerConstructor = new () => Analyzer

/**
 * Find an analyzer for a specific exercise
 *
 * @param exercise The exericse
 * @returns the Analyzer constructor
 */
export function find(exercise: Readonly<Exercise>): AnalyzerConstructor {
  const file = autoload(exercise)
  const key = Object.keys(file).find(
    (fileKey): boolean => file[fileKey] instanceof Function
  )

  if (key === undefined) {
    throw new Error(`No Analyzer found in './${exercise.slug}`)
  }

  const analyzer = file[key] as AnalyzerConstructor
  getProcessLogger().log(`=> analyzer: ${analyzer.name}`)
  return analyzer
}

class RequireError extends Error {
  constructor(
    public readonly modulePath: string,
    public readonly inner: unknown
  ) {
    super('Failed to require ' + modulePath)
    Error.captureStackTrace(this, this.constructor)
  }
}

function autoload(exercise: Readonly<Exercise>): Record<string, unknown> {
  // explicit path (no extension)
  const modulePaths = [
    path.join(__dirname, 'practice', exercise.slug, 'index'),
    path.join(__dirname, 'concept', exercise.slug, 'index'),
    path.join(__dirname, 'generic', 'index'),
  ]

  const results = modulePaths.map((modulePath) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require(modulePath) as unknown
    } catch (err: unknown) {
      return new RequireError(modulePath, err)
    }
  })

  if (
    results.every(
      (result): result is RequireError => result instanceof RequireError
    )
  ) {
    const slug = exercise.slug
    const logger = getProcessLogger()

    logger.error(
      `
        Whilst loading the index.js analyzer in the following locations, something went wrong:
        ${results.map((error) => `- ${error.modulePath}`).join('\n')}

        Make sure that:
        - the slug "${slug}" is valid (hint: use dashes, not underscores)
        - there is actually an analyzer written for that exercise

        Original errors:

        `.trimLeft()
    )

    logger.fatal(
      JSON.stringify(
        results.map((error) => ({
          name: error.name,
          cause:
            error.inner instanceof Error
              ? {
                  name: error.inner.name,
                  message: error.inner.message,
                  stack: error.inner.stack,
                }
              : error.inner,
        })),
        undefined,
        2
      ),
      -32
    )
  }

  return results.find((result) => !(result instanceof RequireError)) as Record<
    string,
    unknown
  >
}
