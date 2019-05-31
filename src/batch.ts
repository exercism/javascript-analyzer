
import fs from 'fs'
import path from 'path'

import { Bootstrap } from './utils/bootstrap'
import { find } from './analyzers/Autoload'
import { readDir } from './utils/fs';
import { DirectoryInput } from './input/DirectoryInput'
import { FileOutput } from './output/processor/FileOutput';


const { exercise, options, logger } = Bootstrap.call()

const AnalyzerClass = find(exercise)
const FIXTURES_ROOT = path.join(options.inputDir || path.join(__dirname, '..', 'test', 'fixtures'), exercise.slug)

function pad(value: string | number | bigint, length = 20, padc = ' ') {
  const pad = Array(length).fill(padc).join('')
  return (pad + value).slice(-length)
}

function line(humanStatus: string, data = { count: 0, comments: { unique: [] as string[], unique_templates: [] as string[] }, runtimes: { total: BigInt(0), average: BigInt(0), median: BigInt(0) }}) {
  const {
    count,
    comments: { unique, unique_templates },
    runtimes: { total, average, median }
  } = data
  return `| ${pad(humanStatus, 20)} | ${pad(count, 5)} | ${pad(unique.length, 8)} | ${pad(unique_templates.length, 6)} | ${pad((average / BigInt(1000000)), 4)}ms | ${pad((median / BigInt(1000000)), 4)}ms | ${pad((total / BigInt(10000000000)), 6)}s |`
}

const rootTimeStamp = process.hrtime.bigint()
logger.log(`=> start batch runner for ${exercise.slug}`)

readDir(FIXTURES_ROOT)
  .then(async (fixtureDirs) => Promise.all(fixtureDirs.map(async (fixtureDir) => {
      try {
        const inputDir     = path.join(FIXTURES_ROOT, fixtureDir)
        const input        = new DirectoryInput(inputDir, exercise.slug)
        const analyzer     = new AnalyzerClass()

        const fixtureStamp = process.hrtime.bigint()
        const analysis     = await analyzer.run(input)
        const runtime      = process.hrtime.bigint() - fixtureStamp

        await FileOutput(analysis.toProcessable(options), { ...options, inputDir, output: './analysis.json' })

        return { result: analysis, runtime }
      } catch (_ignore) {
        return undefined
      }
    }))
  )
  .then((results) => results.filter(Boolean) as ReadonlyArray<{ result: Output, runtime: bigint }>)
  .then((results) => {
    return results.reduce((groups, { result: { status, comments }, runtime }) => {
      groups[status] = (groups[status] || { runtimes: [], comments: [], count: 0 })

      groups[status].runtimes.push(runtime)
      groups[status].comments.push(...comments)
      groups[status].count += 1

      return groups
    }, {} as { [K in Output['status']]: { runtimes: bigint[], count: number, comments: Comment[] } })
  })
  .then((grouped) => {
    const aggregatedGroups = (Object.keys(grouped) as Output['status'][]).reduce((aggregated, status) => {
      const { count, comments, runtimes } = grouped[status]

      const sortedRuntimes = runtimes.sort()

      const totalRuntime = runtimes.reduce((result, time) => result + time, BigInt(0))
      const averageRuntime = totalRuntime / BigInt(sortedRuntimes.length)
      const medianRuntime = sortedRuntimes[(sortedRuntimes.length / 2) | 0]

      const uniqueComments = [...new Set(comments.filter(Boolean).map(comment => comment.message))]
      const uniqueTemplates = [...new Set(comments.filter(Boolean).map(comment => comment.template))]

      return { ...aggregated,
        [status]: {
          count,
          comments: {
            unique: uniqueComments,
            unique_templates: uniqueTemplates
          },
          runtimes: {
            total: totalRuntime,
            average: averageRuntime,
            median: medianRuntime
          }
        }
      }
    }, {} as { [K in Output['status']]: { count: number, comments: { unique: string[], unique_templates: string[] }, runtimes: { total: bigint, average: bigint, median: bigint }}})

    const groupKeys = (Object.keys(aggregatedGroups) as Output['status'][])
    const allRuntimesSorted = groupKeys.reduce((runtimes, status) => runtimes.concat(grouped[status].runtimes), [] as bigint[]).sort()

    const totalCount = groupKeys.reduce((result, status) => result + aggregatedGroups[status].count, 0)
    const totalRuntime = groupKeys.reduce((result, status) => result + aggregatedGroups[status].runtimes.total, BigInt(0))
    const totalAverageRuntime = totalRuntime / BigInt(allRuntimesSorted.length)
    const totalMedianRuntime = allRuntimesSorted[(allRuntimesSorted.length / 2) | 0]
    const totalTotalRuntime = groupKeys.reduce((result, status) => result + aggregatedGroups[status].runtimes.total, BigInt(0))

    const allComments = groupKeys.reduce((comments, status) => comments.concat(grouped[status].comments), [] as Comment[])
    const allUniqueComments = [...new Set(allComments.filter(Boolean).map(comment => comment.message))]
    const allUniqueTemplates = [...new Set(allComments.filter(Boolean).map(comment => comment.template))]

    const totalData = {
      count: totalCount,
      comments: {
        unique: allUniqueComments,
        unique_templates: allUniqueTemplates
      },
      runtimes: {
        total: totalTotalRuntime,
        average: totalAverageRuntime,
        median: totalMedianRuntime
      }
    }

    process.stdout.write(`
## Raw

\`\`\`json
${JSON.stringify(groupKeys.reduce((serializable, status) => {
  return {
    ...serializable,
    [status]: {
      ...aggregatedGroups[status],
      runtimes: {
        total: Number(aggregatedGroups[status].runtimes.total.toString()),
        average: Number(aggregatedGroups[status].runtimes.average.toString()),
        median: Number(aggregatedGroups[status].runtimes.median.toString())
      }
    }
  }
}, {
  toolRuntime: ((process.hrtime.bigint() - rootTimeStamp) / BigInt(1000000)).toString() + 'ms'
}), null, 2)}
\`\`\``)


    process.stdout.write('\n\n')
    process.stdout.write(`
## Statistics

|               Status | Count | Comments | Unique |    Avg | Median |   Total |
| --------------------:| -----:| --------:| ------:| ------:|-------:|--------:|
${line('Approve (optimal)', aggregatedGroups['approve_as_optimal'])}
${line('Approve (comment)', aggregatedGroups['approve_with_comment'])}
${line('Disapprove (comment)', aggregatedGroups['disapprove_with_comment'])}
${line( 'Refer to mentor', aggregatedGroups['refer_to_mentor'])}
${line('Total', totalData)}
`.trim())
  })
