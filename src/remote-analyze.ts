import { ExecutionOptionsImpl } from "./utils/execution_options";
import { registerExceptionHandler } from "./errors/handler";
import { Logger, setProcessLogger } from "./utils/logger";
import { spawnSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// The calls below uses the arguments passed to the process to figure out
// which exercise to target, where the input lives (url/solution id) and what
// execution options to set.
//
// remote https://exercism.io/mentor/solutions/11537f05a5ea4bbf8892291c6e75ec66 -dc
//
// For example, if arguments are passed directly, the above will attempt to
// use the exercism cli to download the above solution and then analyze it,
// based on where it downloads the exercise to and turning on debug and console
// logging.
//

// [Bootstrap] start
registerExceptionHandler()
const options = ExecutionOptionsImpl.create()
const logger = new Logger(options)
setProcessLogger(logger)
// [Bootstrap] end

logger.log('=> DEBUG mode is on')
logger.log(`=> input: ${options.inputDir}`)

const input = options.inputDir.trim()

let uuid = undefined
if (input.startsWith('https://exercism.io/')) {
  uuid = input.split('/').reverse()[0]
  if (uuid.length != 32) {
    process.stderr.write(`Expected a UUID (length 32), got '${uuid}' (len: ${uuid.length})`)
    process.exit(-2)
  }
} else if (input.length == 32) {
  uuid = input
} else if (fs.existsSync(input)) {
  logger.error("=> input seems to be local")
  logger.error(`=> run bin/analyse.sh <exercise> ${input}`)
  process.exit(-3)
} else {
  process.stderr.write(`Expected a UUID (length 32) or solution URL, got '${input}'`)
  process.exit(-4)
}

logger.log(`~> exercism uuid: ${uuid}`)

const downloadResult = spawnSync(
  'exercism',
  [
    'download',
    `--uuid=${uuid}`
  ],
  {
    env: process.env,
    cwd: process.cwd(),
    stdio: 'pipe'
  }
)

// Capture CLI tool errors
if (downloadResult.error) {
  logger.error(downloadResult.error.name)
  logger.error(downloadResult.error.message)
  process.exit(-5)
}

const [, downloadOut] = downloadResult.output;
const localPath = downloadOut.toString().trim()

// Capture CLI tool issues (reported but not true)
if (!fs.existsSync(localPath)) {
  logger.error(`=> cli tool reported output on ${localPath}`)
  logger.error(`=> ${localPath} does not exist / is not accessible`)
  process.exit(-6)
}

// Capture incorrect track
const [exerciseSlug, track] = localPath.split(path.sep).reverse()
if (track !== 'javascript') {
  logger.error(`=> expected a 'javascript' exercise, got '${track}'`)
  process.exit(-7)
}

const spawnable = path.join(__dirname, '..', 'dist', `analyze.js`)
logger.log(`-> executing node -r esm -r module-alias/register "${spawnable}" ${exerciseSlug} "${localPath}" ${process.argv.slice(4).join(' ')}`)

// Keep in sync with bin/analyze.sh
//
const analyzeProcess = spawn('node',
  [
    '-r', 'esm',
    '-r', 'module-alias/register',
    spawnable,
    exerciseSlug,
    localPath,
    ...process.argv.slice(4)
  ],
  { cwd: process.cwd(), env: process.env }
)

analyzeProcess.stderr.on('data', (data) => {
  logger.error(data.toString().trim())
})

analyzeProcess.stdout.on('data', (data) => {
  logger.log(data.toString().trim())
})

analyzeProcess.on('close', (code) => {
  process.exit(code)
})
