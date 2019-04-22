import { factory } from "../comment"

export const NO_METHOD = factory<'method_name'>`
  No method called \`${'method_name'}\`. The tests won't pass without it.
`('javascript.generic.no_method')

export const NO_NAMED_EXPORT = factory<'export_name'>`
  No export called \`${'export_name'}\`. The tests won't pass without it.
  Did you forget adding: \`export ${'export_name'}\`?
`('javascript.generic.no_named_export')

export const NO_PARAMETER = factory<'function_name'>`
  Your function \`${'function_name'}\` does not have a parameter. The tests
  won't pass without it.
`('javascript.generic.no_parameter')

export const UNEXPECTED_PARAMETER = factory<'type'>`
  Did not a parameter of type \`${'type'}\`.
`('javascript.generic.unexpected_parameter')

export const UNEXPECTED_SPLAT_ARGS = factory<'splat_arg_name' | 'parameter_type'>`
  Instead of using \`...${'splat_arg_name'}: ${'parameter_type'}[]\`, you should
  define a parameter called \`${'splat_arg_name'}\` with the type \`${'parameter_type'}\`.
  Splat arguments are great if you don't know how many values you will receive
  and it can be an arbitrary number, but in this case all the values after the
  first one will be thrown away.
`('javascript.generic.unexpected_splat_args')

export const PREFER_TEMPLATED_STRINGS = factory`
  You're manually building a string using string concatenation. You can use a
  templated string instead and interpolate dynamic values:

  \`\`\`javascript
  "my book has \${expression} pages"
  \`\`\`

`('typescrypt.generic.prefer_templated_strings')

export const PREFER_STRICT_EQUALITY = factory`
  In _JavaScript_, always prefer strict (identity) equality such as \`===\` and
  \`!==\` over the forms that use implicit type coercion, such as \`==\` and
  \`!=\`. The same is true for javascript, even though _javascript_ tracks the
  types, as there are many cases where javascript won't be able to guard against
  this implicit type coercion.
`('javascript.generic.prefer_strict_equality')

export const PREFER_UNPREFIXED_UNDERSCORE_PARAMETERS = factory<'parameter_name'>`
  Unlike other languages, \`_parameter\` does not signify a *private* variable.

  Instead, in Javascript, prefixing a parameter with an underscore will stop
  most IDEs from highlighting that parameter if it's unused, which is actually a
  tool you probably want to keep in this case. Remove the underscore \`_\` from
  ${'parameter_name'} in order to fix this.
`('javascript.generic.prefer_unprefixed_underscore_parameters')
