interface ExecutionOptions {
  /** If true, logger.debug messages are displayed */
  debug: boolean
  /** If true, logger messages are sent to the console */
  console: boolean
  /** If true, does a dry run and does not output anything to file */
  dry: boolean
  /** The output file name */
  output: string
  /** The input directory path */
  inputDir: string
  /** The exercise slug */
  exercise: string
  /** If true, expects website-copy to provide the contents of the templates */
  templates: boolean
}

interface AstParser<T extends object> {
  /**
   * Parse an input to an Abstract Syntax Tree
   * @param input the input
   * @returns the AST
   */
  parse(input: Input): Promise<T>
}

interface Input {
  /**
   * Read in a number of strings
   * @param n the number
   * @returns at most `n` strings
   */
  read(n?: number): Promise<string[]>
}


interface Exercise {
  readonly slug: string
}

interface Comment {
  /** The constructed message with all the template variables applied */
  message: string
  /** The message with the template variables in there */
  template: string
  /** The provided variables as array or name (key), value (value) map */
  variables: Readonly<{ [name: string]: string | undefined, [name: number]: string | undefined }>
  /** The identifier for the template on website-copy */
  externalTemplate: string
}

interface Output {
  status: 'refer_to_mentor' | 'approve_as_optimal' | 'approve_with_comment' | 'disapprove_with_comment'
  comments: Comment[]

  /**
   * Makes the output ready to be processed
   * @param options the execution options
   * @returns the output as string
   */
  toProcessable(options: Readonly<ExecutionOptions>): Promise<string>
}

interface OutputProcessor {
  (previous: Promise<string>, options: Readonly<ExecutionOptions>): Promise<string>
}

interface Analyzer {
  run(input: Input): Promise<Output>
}

interface Runner {
  call(analyzer: Analyzer, input: Input, options: Readonly<ExecutionOptions>): Promise<Output>
}
