import { factory } from "./comment"

/**
 * The factories here SHOULD be kept in sync with exercism/website-copy. Under
 * normal use, they do NOT dictate the actual commentary output of the analyzer,
 * as that is provided by the website-copy repo.
 *
 * https://github.com/exercism/website-copy/tree/master/automated-comments/javascript/general
 */

export const NO_METHOD = factory<'method.name'>`
No method called \`${'method.name'}\`. The tests won't pass without it.
`('javascript.general.no_method')

export const NO_NAMED_EXPORT = factory<'export.name'>`
No [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) called \`${'export.name'}\`.
The tests won't pass without it.

Did you forget adding: \`export ${'export.name'}\`?
`('javascript.general.no_named_export')

export const NO_DEFAULT_EXPORT = factory`
No [default](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/default)
[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).
The tests won't pass without it.

Did you forget adding: \`export default ...\`?
`('javascript.general.no_default_export')

export const NO_PARAMETER = factory<'function.name'>`
Your function \`${'function.name'}\` does not have a parameter.
The tests won't pass without it.
`('javascript.general.no_parameter')

export const UNEXPECTED_PARAMETER = factory<'type'>`
Did not find a parameter of type \`${'type'}\`.
`('javascript.general.unexpected_parameter')

export const UNEXPECTED_SPLAT_ARGS = factory<'splat-arg.name' | 'parameter.type'>`
Instead of using \`...${'splat-arg.name'}: ${'parameter.type'}[]\`, you should
define a parameter called \`${'splat-arg.name'}\` with the type \`${'parameter.type'}\`.

[Rest parameters / splat arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
are great if you don't know how many values you will receive and it can be an
arbitrary number, but in this case you know how many values you want.
`('javascript.general.unexpected_splat_args')

export const PREFER_TEMPLATED_STRINGS = factory`
You're manually building a string using string concatenation. You can use a
[templated string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
instead and interpolate dynamic values:

\`\`\`javascript
"Hello there \${firstName}, I will give you \${calculateInventory()} apples."
\`\`\`

`('typescrypt.general.prefer_templated_strings')

export const PREFER_STRICT_EQUALITY = factory`
In _JavaScript_, always prefer [strict (identity and non-identity) equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity)
such as \`===\` and \`!==\` over the forms that use implicit type coercion,
such as [\`==\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality)
and [\`!=\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Inequality),
unless you explicitly want to coerce the type of one of the two operands.

There are definitely cases where you'll want to use non-strict equality, but
that's not the case in this exercise.
`('javascript.general.prefer_strict_equality')

export const PREFER_UNPREFIXED_UNDERSCORE_PARAMETERS = factory<'parameter.name'>`
Unlike other languages, \`_parameter\` does not signify a *private* variable.

Instead, in Javascript, prefixing a parameter with an underscore will stop
most IDEs from highlighting that parameter if it's unused, which is actually a
tool you probably want to keep in this case. Remove the underscore \`_\` from
${'parameter.name'} in order to fix this.
`('javascript.generic.prefer_unprefixed_underscore_parameters')

export const PARSE_ERROR = factory<'error' | 'details'>`
There is something wrong with your submission, most likely a Syntax Error:

Message: "${'error'}"

\`\`\`
${'details'}
\`\`\`
`('javascript.general.parse_error')
