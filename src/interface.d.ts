import type { Input } from '@exercism/static-analysis'

export interface ExecutionOptions {
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
  /** Unless true, expects website-copy to provide the contents of the templates */
  noTemplates: boolean
  /** If true, outputs the JSON using 2 space-indentation (pretty-print) */
  pretty: boolean
}

export interface Exercise {
  readonly slug: string
}

export interface Comment {
  /**
   * The constructed message with all the template variables applied
   */
  message: string

  /**
   * The message with the template variables in there
   */
  template: string

  /**
   * The provided variables as array or name (key), value (value) map
   */
  variables: Readonly<{
    [name: string]: string | undefined
    [name: number]: string | undefined
  }>

  /**
   * The identifier for the template on website-copy
   */
  externalTemplate: string

  /**
   * The type of the comment
   */
  type?: 'essential' | 'actionable' | 'informative' | 'celebratory'
}

export interface Output {
  summary?: string
  comments: Comment[]

  /**
   * Makes the output ready to be processed
   * @param options the execution options
   * @returns the output as string
   */
  toProcessable(options: Readonly<ExecutionOptions>): Promise<string>
}

export interface WritableOutput extends Output {
  /**
   * @deprecated use {WritableOutput#add} + {WritableOutput#finish}
   */
  approve(comment?: Comment): never
  /**
   * @deprecated use {WritableOutput#add} + {WritableOutput#finish}
   */
  disapprove(comment?: Comment): never
  /**
   * @deprecated use {WritableOutput#add} + {WritableOutput#finish}
   */
  redirect(comment?: Comment): never

  add(comment: Comment): void

  finish(summary?: string): never

  hasCommentary: boolean
  commentCount: number
}

export interface OutputProcessor {
  (
    previous: Promise<string>,
    options: Readonly<ExecutionOptions>
  ): Promise<string>
}

export interface Analyzer {
  run(input: Input, options: ExecutionOptions): Promise<Output>
}

export interface Runner {
  call(
    analyzer: Analyzer,
    input: Input,
    options: Readonly<ExecutionOptions>
  ): Promise<Output>
}
