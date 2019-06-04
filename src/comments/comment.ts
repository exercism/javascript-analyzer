type TemplateKeys = Array<number | string>

export type FactoryResultParameter<R extends string = string> = Array<string> | [Record<R, string | undefined>]

export class CommentImpl implements Comment {

  constructor(
    public readonly message: string,
    public readonly template: string,
    public readonly variables: Readonly<{ [name: string]: string | undefined, [name: number]: string | undefined }>,
    public readonly externalTemplate: string
  ) {}

  toString() {
    return this.message
  }
}

export type CommentFactory<R extends string> = (...values: FactoryResultParameter<R>) => Comment

/**
 * Creates a comment factory that can be used to generate a comment.
 *
 * @example
 *
 * const NO_PARAMETER = factory<'function_name'>`
 * Your function \`${'function_name'}\` does not have a parameter.
 * The tests won't pass without it.
 * `('javascript.generic.no_parameter')
 *
 * NO_PARAMETER({ function_name: 'foo' })
 * //
 * // Generates a comment object that holds enough information to be output
 * // correctly, regardless of the current ExecutionOptions.
 * //
 * // => Comment({
 * //      message: "Your function \`foo\` does not have a parameter.\nThe tests won't pass without it.",
 * //      template: "Your function \`{function_name}\` does not have a parameter",
 * //      variables: {
 * //        function_name: "foo"
 * //      },
 * //      external_template: "javascript.generic.no_parameter"
 * //    })
 *
 * @template R A list of keys 'key' | 'another_key' that are necessary
 * @param {TemplateStringsArray} strings automatically assigned
 * @param {...TemplateKeys} keys automatically assigned
 * @returns the factory that can generate Comments
 */
export function factory<R extends string = ''>(strings: TemplateStringsArray, ...keys: TemplateKeys) {
  return (externalTemplate: string): CommentFactory<R> => {
    return (function(...values: FactoryResultParameter<R>): Comment {
      const dict = ((values.splice(values.length - 1, 1)[0]) || {}) as Record<R, string | undefined>
      let template = strings[0].trimLeft()
      let message = strings[0].trimLeft()

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        const value = typeof key === 'number' ? values[key] as string : dict[key as R]
        const tag = typeof key === 'number' ? `%${key}$s` : `%<${key}>s`

        const next = strings[i + 1]
        message += (value || tag) + next
        template += tag + next
      }

      return new CommentImpl(
        message.trimRight(),
        template.trimRight(),
        dict as any,
        externalTemplate
      )
    })
  }
}
