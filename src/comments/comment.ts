import { Comment } from '~src/interface'

type TemplateKeys = (number | string)[]
type NamedTags<R extends string> = Record<R, string | undefined>

export type FactoryResultParameter<R extends string = string> =
  | [] // ()
  | [string[]] // (['a', 'b'])
  | [string, ...string[]] // ('a', 'b')
  | [string[], NamedTags<R>] // (['a', 'b'], { foo: 'foo' })
  | [NamedTags<R>] // ({ foo: foo })

export enum CommentType {
  /**
   * We will soft-block students until they have addressed this comment
   */
  Essential = 'essential',

  /**
   * Any comment that gives a specific instruction to a user to improve their
   * solution
   */
  Actionable = 'actionable',

  /**
   * Comments that give information, but do not necessarily expect students to
   * use it. For example, in Ruby, if someone uses String Concatenation in
   * TwoFer, we also tell them about String Formatting, but don't suggest that
   * it is a better option.
   */
  Informative = 'informative',

  /**
   * Comments that tell users they've done something right, either as a general
   * comment on the solution, or on a technique.
   */
  Celebratory = 'celebratory',
}

export class CommentImpl implements Comment {
  constructor(
    public readonly message: string,
    public readonly template: string,
    public readonly variables: CommentVariables,
    public readonly externalTemplate: string,
    public readonly type: CommentType = CommentType.Informative
  ) {}

  public toString(): string {
    return this.message
  }
}

export type CommentFactory<R extends string> = (
  ...values: FactoryResultParameter<R>
) => Comment
type CommentVariables = Readonly<{
  [key: number]: string
  [key: string]: string
}>

/**
 * Creates a comment factory that can be used to generate a comment.
 *
 * @example
 *
 * const NO_PARAMETER = factory<'function_name'>`
 * Your function \`${'function_name'}\` does not have a parameter.
 * The tests won't pass without it.
 * `('javascript.generic.no_parameter', CommentType.Essential)
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
 * //      external_template: "javascript.generic.no_parameter",
 * //      type: "essential"
 * //    })
 *
 * @template R A list of keys 'key' | 'another_key' that are necessary
 * @param {TemplateStringsArray} strings automatically assigned
 * @param {...TemplateKeys} keys automatically assigned
 * @returns the factory that can generate Comments
 */
export function factory<R extends string = ''>(
  strings: TemplateStringsArray,
  ...keys: TemplateKeys
) {
  return (externalTemplate: string, type?: CommentType): CommentFactory<R> => {
    return function (...values: FactoryResultParameter<R>): Comment {
      const { positionalValues, dictionary } = separateValues(...values)

      // Throw away leading whitespace. This allows us to define factories and
      // start the first line of comment on a new line  (see example).
      let template = strings[0].trimLeft()
      let message = strings[0].trimLeft()

      // This replaces all the template tags with the actual values passed into
      // the templatable factory.
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        const value =
          typeof key === 'number'
            ? (positionalValues[key] as string)
            : dictionary[key as R]

        const tag = buildTemplateTag(key)

        const next = strings[i + 1]
        message += (value || tag) + next
        template += tag + next
      }

      return new CommentImpl(
        // Trim the right side of the output, so that the closing statement of
        // the factory can be made on a new line (see example).
        message.trimRight(),
        template.trimRight(),
        // Widen the type so we don't need to make `Comment` a generic
        combineValues({ dictionary, positionalValues }),
        externalTemplate,
        type
      )
    }
  }
}

/**
 * Builds a template tag based on a "tag".
 *
 * **Note**: Change this once the comment interface is defined properly.
 *
 * @param tag
 */
function buildTemplateTag(tag: string | number): string {
  return typeof tag === 'number' ? `%${tag}$s` : `%{${tag}}`
}

function separateValues<R extends string>(
  ...values: FactoryResultParameter<R>
): { dictionary: NamedTags<R>; positionalValues: string[] } {
  // Get the last value in the splat and coerce it as a dictionary.
  const last = values[values.length - 1]

  // This allows the positional arguments to be passed in as array or as list of
  // rest parameters or as list of arrays.
  const positionalValues = (values as (string | string[])[])
    .map((item): string[] => (typeof item === 'string' ? [item] : item))
    .filter(Array.isArray)
    .reduce((total, array): string[] => total.concat(array), []) as string[]

  // When there is no dictionary
  if (
    !last ||
    typeof last === 'string' ||
    Array.isArray(last) ||
    Object.keys(last).length === 0
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dictionary: NamedTags<R> = {} as any
    return {
      dictionary,
      positionalValues,
    }
  }

  // Removes the dictionary from the original array. Probably unnecessary as we
  // filter out the dictionary in positionalValues anyway.
  return {
    dictionary: (values.splice(values.length - 1, 1)[0] || {}) as NamedTags<R>,
    positionalValues,
  }
}

function combineValues<R extends string>({
  dictionary,
  positionalValues,
}: {
  dictionary: NamedTags<R>
  positionalValues: string[]
}): CommentVariables {
  if (positionalValues.length === 0) {
    return (Object.freeze(dictionary) as unknown) as CommentVariables
  }

  // Assigns the positional variables as keys
  return (Object.freeze(
    Object.assign({}, dictionary, positionalValues)
  ) as unknown) as CommentVariables
}
