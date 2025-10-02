# @exercism/javascript-analyzer

[![javascript-analyzer / main](https://github.com/exercism/javascript-analyzer/actions/workflows/ci.js.yml/badge.svg)](https://github.com/exercism/javascript-analyzer/actions/workflows/ci.js.yml)
[![Deploy](https://github.com/exercism/javascript-analyzer/actions/workflows/deploy.yml/badge.svg)](https://github.com/exercism/javascript-analyzer/actions/workflows/deploy.yml)

Runs static analysis using [`@exercism/static-analysis`][git-static-analysis] on exercises from the [`@exercism/javascript` track][git-javascript].

## Installation

Clone this repository and then run:

```bash
yarn install
```

You'll need at least Node LTS for this to work.

```bash
yarn build
```

## Usage

You can run this either via `yarn`:

```bash
yarn analyze:bat --debug --console two-fer ~/path/to/solution/folder
```

Or directly via the provided shell script:

```bash
./bin/analyze.sh --debug --console two-fer ~/path/to/solution/folder
```

Add the `--debug` and `--console` flags to get output in the terminal window.

### Using docker

To create the image, execute the following command from the repository root:

```bash
docker build -t exercism/javascript-analyzer .
```

To `run` from docker pass in the solutions path as a volume and execute with the necessary parameters:

```bash
docker run -v $(PATH_TO_SOLUTION):/solution exercism/javascript-analyzer ${SLUG} /solution
```

Example:

```bash
docker run -v ~/solution-238382y7sds7fsadfasj23j:/solution exercism/javascript-analyzer two-fer /solution
```

## Tools

We use various tools to maintain this repository and this analyzer.
In order to contribute to the _code_ of this track, you'll need NodeJS (LTS or higher) installed, with some of the [`bin/*`][file-bin] files having extra dependencies, as listed in their file-level commentary.

### `analyze` (.sh, .bat)

```shell
./bin/analyze.sh two-fer ~/folder/to/solution -dcp
```

This runs the analyzer using `two-fer` as exercise and a path to a solution.
Most scripts, including this one, accept a wide range of flags to change or enhance the behaviour, as coded in [`execution_options.ts`][file-execution-options].

Run with the `-h` / `--help` flag to get a list of flags and their description.

```shell
./bin/analyze.sh --help
```

You'll most likely want `-dcp` (`--debug`,`--console` and `--pretty`) during development, which enables console output (instead of `stdout`/`stderr`) and shows `logger.log` as well as `logger.error` and `logger.fatal`.
It will also format the output JSON with 2 space indentation, both in the output file and the console.

If you wish to _preview_ the actual messages, pass in `--noTemplates` to use the analyzer `Comment`Factories to generate actual messages.
If the comment factories are kept in-sync with `website-copy`, it will be the exact same output as on the site.

### `batch` (.sh, .bat)

```shell
./bin/batch.sh two-fer -cp
```

Runs all the fixtures in `~/test/fixtures/two-fer` through the analyzer, giving a summary at the end with all results.
This places an `analysis.json` in the source fixture folder.

You'll most likely want `-cp` (`--console` and `--pretty`) during development, which enables console output (instead of `stdout`/`stderr`) and formats the
output JSON with 2 space indentation.

If you wish to _preview_ the actual messages, pass in `--noTemplates` to use the analyzer `Comment`Factories to generate actual messages.
If the comment factories are kept in-sync with `website-copy`, it will be the exact same output as on the site.

### `remote` (.sh, .bat)

```shell
./bin/remote.sh https://exercism.io/tracks/javascript/exercises/two-fer/solutions/df3bb5d7131c44ea9c62206cc8d6c225 -dcp --dry
```

You need the [`exercism` cli][cli] in order for this to work. It takes an _exercism solution url_ and downloads it using the `exercism` cli.
It then runs the analyzer on it.

You'll most likely want `-dcp --dry` (`--debug`, `--pretty`, `--console` and `dry run`) during development, which enables console output (instead of
`stdout`/`stderr`), shows `logger.log` as well as `logger.error` and `logger.fatal`, pretty prints the JSON output and disables writing the output
to `analysis.json`.

You can pass the following type of URLs:

- Published solutions: `/tracks/javascript/exercises/<slug>/<id>`
- Mentor solutions: `/mentor/solutions/<id>`
- Your solutions: `/my/solutions/<id>`
- Private solutions: `/solutions/<id>`

If you wish to _preview_ the actual messages, pass in `--noTemplates` to use the analyzer `Comment`Factories to generate actual messages.
If the comment factories are kept in-sync with `website-copy`, it will be the exact same output as on the site.

[cli]: https://github.com/exercism/cli
[git-static-analysis]: https://github.com/exercism/javascript-lib-static-analysis
[git-javascript]: https://github.com/exercism/javascript
[file-bin]: https://github.com/exercism/javascript-analyzer/bin
[file-execution-options]: https://github.com/exercism/javascript-analyzer/src/utils/execution_options.ts
