import { readFile } from '@exercism/static-analysis'
import { spawnSync } from 'child_process'
import path from 'path'
import type { Output } from './interface'
import { Bootstrap } from './utils/bootstrap'

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
      JSON.parse(jsonString.toString()) as Pick<Output, 'comments'>
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

    spawned.error && logger.log(spawned.error.message)
    const [, out, err] = spawned.output
    if (out) {
      logger.log(out.toString().trim())
    }

    if (err) {
      logger.error(err.toString().trim())
    }
  })
  .catch((err): void => void logger.error(err))
