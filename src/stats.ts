
import path from 'path'

import { Bootstrap } from './utils/bootstrap'
import { readDir } from './utils/fs';
import { DirectoryInput } from './input/DirectoryInput'
import { AstParser } from './parsers/AstParser';
import { Node } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree';

const { exercise, options, logger } = Bootstrap.call()

const FIXTURES_ROOT = path.join(options.inputDir || path.join(__dirname, '..', 'test', 'fixtures'), exercise.slug)

function pad(value: string | number, pad = '       ') {
  return (pad + value).slice(-pad.length)
}

logger.log(`=> start statistics collection for ${exercise.slug}`)

const parser = new AstParser({ comment: false, tokens: false, loc: false, range: false })

readDir(FIXTURES_ROOT)
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
      logger.error(`=> skipping ${inputDirectory}`)
      logger.error(`   ${message}${Object.keys(other).length > 0 ? ` (${JSON.stringify(other)})` : ''}\n`)
      return undefined
    }
  })))
  .then((trees) => trees.filter(Boolean) as ReadonlyArray<string>)
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
