interface ExecutionOptions {
  debug: boolean
  console: boolean
  dry: boolean
  output: string
  inputDir: string
  exercise: string
  templates: boolean
}

interface AstParser<T extends object> {
  parse(input: Input): Promise<T>
}

interface Solution {}

interface Input {
  // file input
  // inline input
  read(n?: number): Promise<string[]>
}

interface Comment {
  message: string
  template: string
  variables: Readonly<{ [name: string]: string | undefined, [name: number]: string | undefined }>
  externalTemplate: string
}

interface Output {
  status: 'refer_to_mentor' | 'approve_as_optimal' | 'approve_with_comment' | 'disapprove_with_comment'
  comments: Comment[]

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
