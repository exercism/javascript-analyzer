import { getProcessLogger } from '@exercism/static-analysis'
import path from 'path'
import type { Analyzer, Exercise } from '~src/interface.d.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

type AnalyzerConstructor = new () => Analyzer

/**
 * Find an analyzer for a specific exercise
 *
 * @param exercise The exercise
 * @returns the Analyzer constructor
 */
export async function find(
  exercise: Readonly<Exercise>
): Promise<AnalyzerConstructor> {
  const file: unknown = await autoload(exercise)

  if (typeof file !== 'object' || !file || !('default' in file)) {
    throw new Error(`Expected ${exercise.slug} to be autoloaded`)
  }

  // By default, load the default export
  const key =
    file['default'] instanceof Function
      ? 'default'
      : Object.keys(file).find(
          (key): boolean =>
            (file as Record<string, AnalyzerConstructor>)[key] instanceof
            Function
        )

  if (key === undefined) {
    throw new Error(`No Analyzer found in './${exercise.slug}`)
  }

  const analyzer = (file as Record<string, AnalyzerConstructor>)[key]
  getProcessLogger().log(`=> analyzer: ${analyzer.name}`)
  return analyzer
}

class RequireError extends Error {
  constructor(
    public readonly modulePath: string,
    public readonly inner: Error
  ) {
    super('Failed to require ' + modulePath)
    Error.captureStackTrace(this, this.constructor)
  }
}

async function autoload(
  exercise: Readonly<Exercise>
): Promise<ReturnType<NodeJS.Require>> {
  const modulePaths = [
    path.join(__dirname, 'practice', exercise.slug, 'index.js'),
    path.join(__dirname, 'concept', exercise.slug, 'index.js'),
    `file://${path.join(__dirname, 'practice', exercise.slug, 'index.js')}`,
    `file://${path.join(__dirname, 'concept', exercise.slug, 'index.js')}`,
  ]

  // These exercises can also defer to the exemplar analyzer only
  if (
    [
      'amusement-park',
      'bird-watcher',
      'coordinate-transformation',
      'elyses-analytic-enchantments',
      'elyses-destructured-enchantments',
      'elyses-enchantments',
      'elyses-looping-enchantments',
      'elyses-transformative-enchantments',
      'factory-sensors',
      // 'fruit-picker',
      'high-score-board',
      'lasagna-master',
      'lucky-numbers',
      'mixed-juices',
      'nullability',
      'ozans-playlist',
      'pizza-order',
      'translation-service',
      'vehicle-purchase',
    ].includes(exercise.slug)
  ) {
    modulePaths.push(path.join(__dirname, 'concept', '__exemplar', 'index.js'))
    modulePaths.push(
      `file://${path.join(__dirname, 'concept', '__exemplar', 'index.js')}`
    )
  }

  const results = await Promise.all(
    modulePaths.map(async (modulePath) => {
      try {
        return (await import(modulePath)) as unknown
      } catch (err) {
        return new RequireError(modulePath, err as Error)
      }
    })
  )

  if (results.every((result) => result instanceof RequireError)) {
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

        `.trimStart()
    )

    logger.fatal(
      JSON.stringify(
        results.map((error) => ({
          name: error.name,
          cause: {
            name: error.inner.name,
            message: error.inner.message,
            stack: error.inner.stack,
          },
        })),
        undefined,
        2
      ),
      -32
    )
  }

  return results.find((result) => !(result instanceof RequireError))
}
