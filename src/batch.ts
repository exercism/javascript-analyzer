import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import { DirectoryInput } from '@exercism/static-analysis/dist/input/DirectoryInput'
import { readDir } from '@exercism/static-analysis/dist/utils/fs'
import path from 'path'
import { find } from './analyzers/Autoload'
import type { Comment, Output } from './interface'
import { FileOutput } from './output/processor/FileOutput'
import { Bootstrap } from './utils/bootstrap'

// The bootstrap call uses the arguments passed to the process to figure out
// which exercise to target, where the input lives (directory input) and what
// execution options to set.
//
// batch -c two-fer ~/fixtures
//
// For example, if arguments are passed directly, the above will run the two-fer
// exercise analyzer for all the folders inside the two-fer fixture folder, with
// console log output turned on
//
const { exercise, options, logger } = Bootstrap.call()

const AnalyzerClass = find(exercise)
const FIXTURES_ROOT = path.join(
  options.inputDir || path.join(__dirname, '..', 'test', 'fixtures'),
  exercise.slug
)

console.log('Analyzer found:', AnalyzerClass)
console.log('Fixtures root:', FIXTURES_ROOT)

/**
 * Pad the input `value` to `length` using the `padc` pad character
 *
 * @param {(string | number | bigint)} value
 * @param {number} [length=20]
 * @param {string} [padc=' ']
 * @returns {string} the padded string
 */
function pad(value: string | number | bigint, length = 20, padc = ' '): string {
  const pad = Array(length).fill(padc).join('')
  return (pad + value).slice(-length)
}

const DEFAULT_LINE_DATA = {
  count: 0,
  comments: {
    unique: [] as string[],
    uniqueTemplates: [] as string[],
  },
  runtimes: {
    total: BigInt(0),
    average: BigInt(0),
    median: BigInt(0),
  },
}

type OutputGroup = NonNullable<Comment['type']> | 'none' | 'unknown'

/**
 * Turns a data set into a table row
 *
 * @param {string} humanStatus
 * @param {typeof DEFAULT_LINE_DATA} [data=DEFAULT_LINE_DATA]
 * @returns {string}
 */
function line(
  humanStatus: string,
  data: typeof DEFAULT_LINE_DATA = DEFAULT_LINE_DATA
): string {
  const {
    count,
    comments: { unique, uniqueTemplates },
    runtimes: { total, average, median },
  } = data
  return `| ${[
    pad(humanStatus, 20),
    pad(count, 5),
    pad(unique.length, 8),
    pad(uniqueTemplates.length, 6),
    `${pad(average / BigInt(1000000), 4)}ms`,
    `${pad(median / BigInt(1000000), 4)}ms`,
    `${pad(total / BigInt(10000000000), 6)}s`,
  ].join(' | ')} |`
}

const rootTimeStamp = process.hrtime.bigint()
logger.log(`=> start batch runner for ${exercise.slug}`)

readDir(FIXTURES_ROOT)
  .then(async (fixtureDirs) =>
    Promise.all(
      fixtureDirs.map(async (fixtureDir) => {
        try {
          const inputDir = path.join(FIXTURES_ROOT, fixtureDir)
          const input = DirectoryWithConfigInput.test(inputDir)
            ? new DirectoryWithConfigInput(inputDir)
            : new DirectoryInput(inputDir, exercise.slug)
          const analyzer = new AnalyzerClass()
          options.inputDir = inputDir

          const fixtureStamp = process.hrtime.bigint()
          const analysis = await analyzer.run(input, options)
          const runtime = process.hrtime.bigint() - fixtureStamp

          const fixture = fixtureDir

          const processable = analysis.toProcessable(options)

          if (options.dry) {
            await processable
          } else {
            await FileOutput(processable, {
              ...options,
              inputDir,
              output: './analysis.json',
            })
          }

          return { result: analysis, runtime, fixture }
        } catch (_ignore) {
          return undefined
        }
      })
    )
  )
  .then(
    (results) =>
      results.filter(Boolean) as readonly {
        result: Output
        runtime: bigint
        fixture: string
      }[]
  )
  .then((results) => {
    return results.reduce(
      (groups, { result: { comments }, runtime, fixture }) => {
        const uniques = comments
          .map((comment) => comment.type)
          .filter(Boolean)
          .filter((value, index, self) => self.indexOf(value) === index)

        const status: OutputGroup =
          uniques.find((value) => value === 'essential') ||
          uniques.find((value) => value === 'actionable') ||
          uniques.find((value) => value === 'informative') ||
          uniques.find((value) => value === 'celebratory') ||
          (comments.length === 0 ? 'none' : 'unknown')

        groups[status] = groups[status] || {
          runtimes: [],
          comments: [],
          count: 0,
          fixtures: [],
        }

        groups[status].runtimes.push(runtime)
        groups[status].comments.push(...comments)
        groups[status].count += 1
        groups[status].fixtures.push(fixture)

        return groups
      },
      {} as {
        [K in OutputGroup]: {
          runtimes: bigint[]
          count: number
          comments: Comment[]
          fixtures: string[]
        }
      }
    )
  })
  .then((grouped) => {
    const aggregatedGroups = (Object.keys(grouped) as OutputGroup[]).reduce(
      (aggregated, status) => {
        const { count, comments, runtimes, fixtures } = grouped[status]

        const sortedRuntimes = runtimes.sort()

        const totalRuntime = runtimes.reduce(
          (result, time): bigint => result + time,
          BigInt(0)
        )
        const averageRuntime =
          totalRuntime / BigInt(Math.max(1, sortedRuntimes.length))
        const medianRuntime = sortedRuntimes[(sortedRuntimes.length / 2) | 0]

        const uniqueComments = [
          ...new Set(
            comments.filter(Boolean).map((comment): string => comment.message)
          ),
        ]
        const uniqueTemplates = [
          ...new Set(
            comments.filter(Boolean).map((comment): string => comment.template)
          ),
        ]

        return {
          ...aggregated,
          [status]: {
            count,
            comments: {
              unique: uniqueComments,
              uniqueTemplates: uniqueTemplates,
            },
            runtimes: {
              total: totalRuntime,
              average: averageRuntime,
              median: medianRuntime,
            },
            fixtures,
          },
        }
      },
      {} as {
        [K in OutputGroup]: {
          count: number
          fixtures: string[]
          comments: { unique: string[]; uniqueTemplates: string[] }
          runtimes: { total: bigint; average: bigint; median: bigint }
        }
      }
    )

    const groupKeys = Object.keys(aggregatedGroups) as OutputGroup[]
    const allRuntimesSorted = groupKeys
      .reduce(
        (runtimes, status): bigint[] =>
          runtimes.concat(grouped[status].runtimes),
        [] as bigint[]
      )
      .sort()

    const totalCount = groupKeys.reduce(
      (result, status): number => result + aggregatedGroups[status].count,
      0
    )
    const totalRuntime = groupKeys.reduce(
      (result, status): bigint =>
        result + aggregatedGroups[status].runtimes.total,
      BigInt(0)
    )
    const totalAverageRuntime =
      totalRuntime / BigInt(Math.max(1, allRuntimesSorted.length))
    const totalMedianRuntime = BigInt(
      allRuntimesSorted[(allRuntimesSorted.length / 2) | 0] ?? 0
    )
    const totalTotalRuntime = groupKeys.reduce(
      (result, status): bigint =>
        result + aggregatedGroups[status].runtimes.total,
      BigInt(0)
    )

    const allComments = groupKeys.reduce(
      (comments, status): Comment[] =>
        comments.concat(grouped[status].comments),
      [] as Comment[]
    )
    const allUniqueComments = [
      ...new Set(
        allComments.filter(Boolean).map((comment): string => comment.message)
      ),
    ]
    const allUniqueTemplates = [
      ...new Set(
        allComments.filter(Boolean).map((comment): string => comment.template)
      ),
    ]

    const totalData = {
      count: totalCount,
      comments: {
        unique: allUniqueComments,
        uniqueTemplates: allUniqueTemplates,
      },
      runtimes: {
        total: totalTotalRuntime,
        average: totalAverageRuntime,
        median: totalMedianRuntime,
      },
    }

    process.stdout.write(`
## Raw

\`\`\`json
${JSON.stringify(
  groupKeys.reduce(
    (serializable, status) => {
      return {
        ...serializable,
        [status]: {
          ...aggregatedGroups[status],
          runtimes: {
            total: Number(aggregatedGroups[status].runtimes.total.toString()),
            average: Number(
              aggregatedGroups[status].runtimes.average.toString()
            ),
            median: Number(aggregatedGroups[status].runtimes.median.toString()),
          },
        },
      }
    },
    {
      toolRuntime:
        (
          (process.hrtime.bigint() - rootTimeStamp) /
          BigInt(1000000)
        ).toString() + 'ms',
    }
  ),
  null,
  2
)}
\`\`\``)

    process.stdout.write('\n\n')
    process.stdout.write(
      `
## Statistics

|               Status | Count | Comments | Unique |    Avg | Median |   Total |
| --------------------:| -----:| --------:| ------:| ------:|-------:|--------:|
${line('Essential', aggregatedGroups['essential'])}
${line('Actionable', aggregatedGroups['actionable'])}
${line('Informative', aggregatedGroups['informative'])}
${line('Celebratory', aggregatedGroups['celebratory'])}
${line('Unknown', aggregatedGroups['unknown'])}
${line('None', aggregatedGroups['none'])}
${line('Total', totalData)}
`.trim()
    )
  })
