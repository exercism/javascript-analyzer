import { AstParser } from '@exercism/static-analysis/dist/AstParser'
import { DirectoryInput } from '@exercism/static-analysis/dist/input/DirectoryInput'
import { readDir } from '@exercism/static-analysis/dist/utils/fs'
import path from 'path'
import { Bootstrap } from './utils/bootstrap'

// The bootstrap call uses the arguments passed to the process to figure out
// which exercise to target, where the input lives (directory input) and what
// execution options to set.
//
// stats -c two-fer ~/fixtures
//
// For example, if arguments are passed directly, the above will run the two-fer
// exercise analyzer (dry: without output) for all the folders inside the
// two-fer fixture folder, with console log output turned on
//
const { exercise, options, logger } = Bootstrap.call()

const FIXTURES_ROOT = path.join(
  options.inputDir || path.join(__dirname, '..', 'test', 'fixtures'),
  exercise.slug
)

function pad(value: string | number, pad = '       '): string {
  return (pad + value).slice(-pad.length)
}

logger.log(`=> start statistics collection for ${exercise.slug}`)

readDir(FIXTURES_ROOT)
  .then(async (fixtureDirs) =>
    Promise.all(
      fixtureDirs.map(async (fixtureDir) => {
        const inputDirectory = path.join(FIXTURES_ROOT, fixtureDir)
        try {
          const input = new DirectoryInput(inputDirectory, exercise.slug)
          const results = await AstParser.ANALYZER.parse(input)

          if (results.length === 0) {
            throw new Error(`No input source files for ${exercise.slug}`)
          }

          const [{ program: root }] = results

          return JSON.stringify(root)
        } catch ({ message, ...other }) {
          logger.error(
            `=> skipping ~${path.relative(
              path.dirname(FIXTURES_ROOT),
              inputDirectory
            )}`
          )
          logger.error(
            `   ${message}${
              Object.keys(other).length > 0 ? ` (${JSON.stringify(other)})` : ''
            }\n`
          )
          return undefined
        }
      })
    )
  )
  .then((trees) => trees.filter(Boolean) as readonly string[])
  .then((trees) => {
    const realTrees = trees.filter(Boolean)
    const counts = {
      invalid: trees.length - realTrees.length,
      valid: realTrees.length,
      total: trees.length,
      unique: Object.keys(
        realTrees.reduce((counts, tree) => {
          counts[tree] = (counts[tree] || 0) + 1
          return counts
        }, {} as { [tree: string]: number })
      ).length,
    }

    const { total, unique, valid, invalid } = counts
    process.stdout.write(
      `
## Raw output

\`\`\`json
${JSON.stringify(counts, null, 2)}
\`\`\`

## Parsing statistics

This is the number of unique Abstract Syntax Trees after stripping commentary,
location data (whitespace) and other tokens.

|   total |  unique |   valid | invalid |
|--------:|--------:|--------:|--------:|
| ${pad(total)} | ${pad(unique)} | ${pad(valid)} | ${pad(invalid)} |
  `.trim()
    )
  })
