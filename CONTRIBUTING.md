# Contributing

Automated Mentoring support for the JavaScript track is a work in progress, and
it's not uncommon that people discover incorrect analysis, have a better
approach on detecting certain code paths, report missing edge cases, factual
errors, logical errors and develop new analysers.

We welcome contributions of all sorts and sizes, from reporting issues to
submitting patches, as well as joining the current [💬 discussions][issue-discussion].

-----

This guide covers several common scenarios pertaining to **improving the
JavaScript analyzer**. There are several other guides about contributing to
other parts of the Exercism ecosystem.

* [The JavaScript track][contributing-javascript]
* [The TypeScript track][contributing-typescript]
* [Project Automated Mentoring Support][contributing-automated-mentoring-support]
* [The TypeScript Analyzer][contributing-typescript-analyzer]

## Code of Conduct

Help us keep Exercism welcoming. Please read and abide by the [Code of Conduct][coc].

## Analyzers

Before contributing code to any existing analyzer or any new analyzer, please
have a thorough look at the current analyzers and dive into [the interface][docs-interface]
and general [analyzer guidelines][docs-guidelines].

### New exercise / analyzer

Let's say you want to write a new analyzer, because you've noticed that this
exercise could benefit from automated mentoring support, or just because you
find this interesting, the first step is to [check for an open issue][issue-new-exercise].
If it's there, make sure no one is working on it, and most of all that there is
not an open Pull Request towards this exercise.

If there is no such issue, you may open one. Take [this issue][sample-resistor-color]
as a baseline of what should be in it. This serves as a starting point for
all discussion, as we now must establish a few things before starting to write
code.

#### Project Track Anatomy

If the exercise has undergone at least phase 1 of Project Track Anatomy, it is
likely that there are [mentoring notes][mentor-notes]. These are likely to
contain what the _maintainers_ of the JavaScript track _or_ the dedicated people
from the track anatomy project deem to be the set of reasonable solutions.

#### Abstract Syntax Approach

These solutions will be your baseline for `approve_as_optimal`, one of the
expected outputs. If your analyzer will be based on Abstract Syntax Tree
parsing, you can run these analyzers through the included ASTParser, or use
[AST explorer][ast-explorer] and make sure it's set to the correct parser (at
 moment of writing this is `@typescript/eslint-parser`).

 **Note**: You may write a different style analyzer, that is _not_ using ASTs.

#### Discussion 💬 and Samples

In your issue, write out how you're going to tackle the initial set of
solutions, and work on a prototype. If there are no `fixtures` yet, we will
supply you with a set of fixtures (500, if there are at least 500 submissions)
so you can run your analyzer using `batch.sh slug` on these fixtures.

It can be very fruitfull to ask current maintainers and previous authors of
analyzers how to tackle various approaches, especially since there are so many
ways to write equivalent code in JavaScript.

#### Writing comments

Comments are the output of the Analyzer. You don't need to be a great writer in
order to contribute to the analyzers. How this works inside the repository is
a guide on its own: read more about [📝 Comments][docs-comments].

#### Tests

Before you submit your PR, make sure that you follow the following docs:
- [🌫 Smoke tests][docs-smoke-tests]
- [📸 Snapshot tests][docs-snapshot-tests]

### Sync with exercise

<!-- Explain that syncs in problem-descriptions need to be synced with the analyzers,
     establish the set of rules how to update, but wait until there is proper
     versioning and how that is given at runtime -->

This section will be written once there is consensus on how the input will be
versioned. Until then, the steps are the same as for writing a new analyzer,
except that you may skip creating an issue.

### Add new behaviour

<!-- Adding new tests is mandatory -->

This section will be written once there is consensus on coverage and tests in
general.

### Commentary copy

This section will be written once there is consensus on how the commentary is
structured in `website-copy` and what the format for parameters/templates is
like.

Find all _technical_ details in [the doc about 📝 Comments][docs-comments].


[issue-discussion]: https://github.com/exercism/javascript-analyzer/issues?q=is%3Aopen+is%3Aissue+label%3A%22%3Aspeech_balloon%3A+discussion%22
[issue-new-exercise]: https://github.com/exercism/javascript-analyzer/issues?q=is%3Aopen+is%3Aissue+label%3A%22%3Asparkles%3A+new+exercise%22
[sample-resistor-color]: https://github.com/exercism/javascript-analyzer/issues/13
[contributing-javascript]: https://github.com/exercism/javascript/blob/master/CONTRIBUTING.md
[contributing-typescript]: https://github.com/exercism/typescript/
[contributing-typescript-analyzer]: https://github.com/exercism/typescript-analyzer/blob/master/CONTRIBUTING.md
[contributing-automated-mentoring-support]: https://github.com/exercism/automated-mentoring-support/
[coc]: https://exercism.io/code-of-conduct
[docs-smoke-tests]: /docs/smoke-tests.md
[docs-snapshot-tests]: /docs/snapshot-tests.md
[docs-comments]: /docs/comments.md
[docs-interface]: https://github.com/exercism/automated-mentoring-support/blob/master/docs/interface.md
[docs-guidelines]: https://github.com/exercism/automated-mentoring-support/blob/master/docs/guidelines.md
[mentor-notes]: https://github.com/exercism/website-copy/tree/master/tracks/javascript/exercises
[ast-explorer]: https://astexplorer.net/
