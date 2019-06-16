
import { Node } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';

import path from 'path';

import { DirectoryInput } from '~src/input/DirectoryInput';
import { AstParser } from '~src/parsers/AstParser';
import { Bootstrap } from '~src/utils/bootstrap';
import { readDir } from '~src/utils/fs';

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

const FIXTURES_ROOT = path.join(options.inputDir || path.join(__dirname, '..', 'test', 'fixtures'), exercise.slug)

function pad(value: string | number, pad = '       '): string {
  return (pad + value).slice(-pad.length)
}

logger.log(`=> start statistics collection for ${exercise.slug}`)

const parser = new AstParser({ comment: false, tokens: false, loc: false, range: false })

readDir(FIXTURES_ROOT)
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .then(async (fixtureDirs) => Promise.all(fixtureDirs.map(async (fixtureDir) => {
    const inputDirectory = path.join(FIXTURES_ROOT, fixtureDir)
    try {
      const input = new DirectoryInput(inputDirectory, exercise.slug)
      const results = await parser.parse(input)

      if (results.length === 0) {
        throw new Error(`No input source files for ${exercise.slug}`)
      }

      const [{ program: root }] = results

      // There can be a bug where loc and range data is not removed
      if (root.loc || root.range) {
        delete root.comments
        delete root.tokens
        delete root.loc
        delete root.range

        require('eslint/lib/util/traverser').traverse(
          root, {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            enter(node: Node) {
              delete node.loc
              delete node.range
            },

            // Use typescript visitor keys (otherwise type annotations are not removed)
            visitorKeys: require("@typescript-eslint/parser/dist/visitor-keys").visitorKeys
          }
        )
      }

      return JSON.stringify(root)
    } catch ({ message, ...other}) {
      logger.error(`=> skipping ~${path.relative(path.dirname(FIXTURES_ROOT), inputDirectory)}`)
      logger.error(`   ${message}${Object.keys(other).length > 0 ? ` (${JSON.stringify(other)})` : ''}\n`)
      return undefined
    }
  })))
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .then((trees) => trees.filter(Boolean) as readonly string[])
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .then((trees) => {
    const realTrees = trees.filter(Boolean)
    const counts = {
      invalid: trees.length - realTrees.length,
      valid: realTrees.length,
      total: trees.length,
      unique: Object.keys(
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        realTrees.reduce((counts, tree) => {
          counts[tree] = (counts[tree] || 0) + 1
          return counts
        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        }, {} as { [tree: string]: number })
      ).length
    }

    const { total, unique, valid, invalid } = counts
    process.stdout.write(`
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
  `.trim())
  })
