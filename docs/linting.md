# 💅🏽 Linting

This project is `lint`ing via [`eslint`][web-eslint] using the [`@typescript-eslint/parser`][git-tseslint-parser]
parser and [`@typescript-eslint/eslint`][git-tseslint-plugin] plugin. In this document
you can find the reasoning why certain rules are what they are.

## Defaults

The default ruleset is as follows:

- `eslint:recommended`: the default [recommended][web-eslint-recommended] set;
- `plugin:@typescript-eslint/eslint-recommended`: turn-off rules that are
  provided by typescript;
- `plugin:@typescript-eslint/recommended`: a set of [recommended][web-tseslint-recommended]
  rules using type annotations and information.

We believe the default recommended rules capture most of the issues that will
lead to bugs, as well as syntax errors or unexpected behaviour, whilst _mostly_
not dictating a certain style.

## Overrides

The rules that are changed from their default setting, in alphabetical order.

### [`explicit-function-return-type`][rule-explicit-function-return-type]

Public API should always be marked with an explicit return type in order to
ensure a clear expectation for consumers. The overriden settings is lenient with
higher order functions, as the type definition will just be duplicated, and
typed variables because those also assign intent of type.

### [`explicit-member-accessibility`][rule-explicit-member-accessibility]

In order to mark which methods can _safely be refactored_, which methods are
_at the boundary_ and thus need to be tested, and indicate what is meant to be
accessed, this rule enforces that `private` and `protected` keywords are used.

It specifically removes the need to denote constructors as `public`, because by
default they are. You should only mark a constructor if it's not public, such as
when you're creating a Singleton (with a `private` constructor).

It turns off the rule for parameter properties as `no-parameter-properties` will
deal with that.

### [`indent`][rule-indent]

The indentation is set to 2 spaces, simply because the project is already in a
2 spaces format. This rule will be enforced by automatic formatters, once/if
that is in place. Various styleguides prefer various indentation. There is no
preference over one or another, so this is just what it is going forward.

### [`no-non-null-assertion`][rule-no-non-null-assertion]

Whilst using non-null assertions cancels the benefits of the strict
null-checking mode, it is also overly restrictive as their are many valid cases
where a typeguard is not applicable:

```typescript
class Foo {
  private param: string!

  constructor() {
    this.init()
  }

  init() {
    this.param = 'always a value'
  }
}
```

In the example above, the property has to be marked as "will be initialised
before it is accessed", using the non null assertion `!`. Usage of the non null
assertion in order examples is generally discouraged, but the rule can not yet
be turned on or off based on the different usages.

### [`no-parameter-properties`][rule-no-parameter-properties]

Parameter Properties are clean and fine. This rule exists because some beginners
don't understand that this creates a property on the instance. This repository
is not necessarily targeted at new TypeScript writers, and the usage (that these
are instance properties) is usually pretty clear.

The rule is changed to enforce that these properties _always_ have their
encapsulation denoted with `private`, `protected` or `public`.

### [`no-unused-vars`][rule-no-unused-vars]

This rule is covered by `--noUnusedParameters` and can also be enforced further
by `--noUnusedLocals`. Since the latter is marked in vscode and atom (slightly
different color) and unused parameters can be caught by the compilation, there
is no need for this rule.

### [`no-use-before-define`][rule-no-use-before-define]

Those features that are hoisted are turned off (for this rule) and those that
are not safe are turned on (for this rule).

[web-eslint]: https://eslint.org
[web-eslint-recommended]: https://eslint.org/docs/rules/
[web-tseslint-recommended]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
[git-tseslint-parser]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser
[git-tseslint-plugin]: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
[rule-explicit-function-return-type]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
[rule-explicit-member-accessibility]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
[rule-indent]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
[rule-no-non-null-assertion]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion
[rule-no-parameter-properties]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
[rule-no-unused-vars]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/rule-no-unused-vars
[rule-no-use-before-define]: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/rule-no-use-before-define
