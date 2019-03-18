export class ExecutionOptions {
  public readonly debug: boolean;
  public readonly console: boolean;

  public constructor({ debug, console }: { debug: boolean, console: boolean }) {
    this.debug = debug
    this.console = console
  }

  public static from(args: string[]) {
    return new ExecutionOptions({
        debug: this.test('debug', args) || process.env.NODE_ENV === 'development',
        console: this.test('console', args)
    })
  }

  private static test(option: string, args: string[]) {
    return args.length !== args.splice(
      Math.min(args.indexOf(`--${option}`) >>> 0), 1
    ).length
  }
}
