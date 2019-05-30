import yargs from 'yargs'

interface ExecutionOptionsArgs {
  debug: boolean
  console: boolean
  dry: boolean
  output: string
  inputDir: string
  exercise: string
  templates: boolean
}

export class ExecutionOptions {
  public debug!: boolean
  public console!: boolean
  public output!: string
  public inputDir!: string
  public exercise!: string
  public dry!: boolean
  public templates!: boolean

  public constructor(options: ExecutionOptionsArgs) {
    Object.assign(this, options);
  }

  public static create() {
    const args = yargs
      .usage('Usage: $0 <exercise> <input-directory> [options]')
      .example('$0 two-fer ~/javascript/two-fer/128/', 'Analyze the input directory "128" against the two-fer analyzer')
      .alias('d', 'debug')
      .alias('c', 'console')
      .alias('o', 'output')
      .describe('d', 'Unless given, only outputs warnings and errors')
      .describe('c', 'If given, outputs to the console')
      .describe('o', 'Path relative to the input dir where the analyzis results are stored')
      .describe('templates', 'If given, exports templates instead of messages (feature flag)')
      .describe('dry', 'If given, does not output anything to disk')
      .boolean(['d', 'c', 'dry', 'templates'])
      .string('o')
      .default('d', process.env.NODE_ENV === 'development')
      .default('c', process.env.NODE_ENV === 'development')
      .default('templates', false)
      .default('o', './analysis.json')
      .default('dry', false)
      .help('h')
      .alias('h', 'help')
      .argv

    const { d, c, o, dry, templates, _ } = args
    return new ExecutionOptions({
      debug: d,
      console: c,
      output: o,
      dry,
      templates,
      exercise: _[0],
      inputDir: _[1]
    })
  }
}
