type TemplateKeys = Array<number | string>
type TemplatedValues = { [key: string]: string | undefined }

export type FactoryResultParameter<R extends string = string> = Array<string> | [Record<R, string | undefined>]

export class Comment {

  constructor(
    public readonly message: string,
    public readonly template: string,
    public readonly variables: { [name: string]: string | undefined, [name: number]: string | undefined },
    public readonly externalTemplate: string
  ) {}

  toString() {
    return this.message
  }
}

export type CommentFactory<R extends string> = (...values: FactoryResultParameter<R>) => Comment

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

      return new Comment(
        message.trimRight(),
        template.trimRight(),
        dict as any,
        externalTemplate
      )
    })
  }
}
