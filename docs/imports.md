# Imports

This project uses 2 TypeScript projects:

- `src`: the source code for the binary execution
- `test`: the tests for this source code

Because relative imports can get unwieldy quickly, both projects have defined
`paths` in their `tsconfig.json`:

- `~src` points to the root of `src` (both projects can access this)
- `~test` points to the root of `test` (only `test` can access this)

## Configuration

### Jest

Because `.babelrc` does not automatically pick-up these rules, and `jest`
supports this out of the box, the `jest.config.js` has the `moduleNameMapper`
set up to be exactly like the paths above.

### Production (compiled typescript)

Because compilation via `tsc` does not rewrite paths (which, according to the
`tsc` developer team is because that is a _loader_'s task), `module-alias` has
also been set-up to rewrite these paths:

- `~src` points to the root of `dist`

## Development

When developing for this repository, use `~src/path/to/file` whenever you need
a module from that project and `~test/path/to/file` when you're in the test
project. This also allows you to have the same module name in both projects.

The only exception is loading a dependency that is a sibling or a direct child.
For example:

`~src/comments/shared.ts` defines shared comment factories. It loads the factory
from its sibling `./comment.ts`. This is fine, because it's likely that they'll
be moved in unison if they ever are.
