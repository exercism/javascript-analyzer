import { readFile } from '@exercism/static-analysis'
import { spawnSync } from 'child_process'
import path from 'path'
import type { Output } from './interface.d.js'
import { Bootstrap } from './utils/bootstrap.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

// The bootstrap call uses the arguments passed to the process to figure out
// which exercise to target, where the input lives (directory input) and what
// execution options to set.
//
// markdownify -dc two-fer ~/test/
//
// For example, if arguments are passed directly, the above will take the
// analysis.json and try to convert it into markdown.
//
const { options, logger } = Bootstrap.call()

logger.log('=> DEBUG mode is on')

readFile(path.join(options.inputDir, 'analysis.json'))
  .then(
    (jsonString: Buffer | string): Pick<Output, 'comments'> =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      JSON.parse(jsonString.toString())
  )
  .then((output: Pick<Output, 'comments'>): void => {
    logger.log(`=> Got ${output.comments.length} comments`)
    const spawned = spawnSync(
      'ruby',
      [
        'bin/markdownify.rb',
        path.resolve(options.inputDir),
        path.resolve(
          path.join(
            __dirname,
            '..',
            '..',
            'exercism-website-copy',
            'automated-comments'
          )
        ),
      ],
      {
        stdio: 'pipe',
        cwd: process.cwd(),
        env: process.env,
      }
    )

    if (spawned.error) {
      logger.log(spawned.error.toString())
    }

    if (spawned.output) {
      const [, out, err] = spawned.output
      if (out) {
        logger.log(out.toString().trim())
      }

      if (err) {
        logger.error(err.toString().trim())
      }
    }
  })
  .catch((err: unknown): void => void logger.error(String(err)))
