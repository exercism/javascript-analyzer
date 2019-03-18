type TemplateKeys = Array<number | string>
type TemplatedValues = { [key: string]: string | undefined }

export type FactoryResultParameter = Array<string | TemplatedValues>

export class Comment {

  constructor(
    public readonly message: string,
    public readonly template: string,
    public readonly variables: { [name: string]: string | undefined, [name: number]: string | undefined }) { }

  toString() {
    return this.message
  }
}

export function factory(strings: TemplateStringsArray, ...keys: TemplateKeys) {
  return (function(...values: FactoryResultParameter): Comment & { message: string } {
    const dict = ((values.splice(values.length - 1, 1)[0]) || {}) as TemplatedValues
    let template = strings[0]
    let message = strings[0]

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      const value = typeof key === 'number' ? values[key] as string : dict[key]
      const tag = typeof key === 'number' ? `%${key}$s` : `%<${key}>s`

      const next = strings[i + 1]
      message += (value || tag) + next
      template += tag + next
    }

    return new Comment(message, template, dict)
  })
}
