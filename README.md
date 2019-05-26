# exercism-javascript-analyzer

## Installation

Clone this repository and then run:

```bash
yarn install
```

You'll need at least Node LTS for this to work.

```
yarn build
```

## Usage

You can run this either via `yarn`:
```
yarn analyze:bat --debug --console two-fer ~/path/to/solution/folder
```

Or directly via the provided shell script:
```
./bin/analyze.sh two_fer ~/path/to/solution
```

Add the `--debug` and `--console` flags to get output in the terminal window.

## Usage with docker

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
docker run -v ~/solution-238382y7sds7fsadfasj23j:/solution exercism/go-analyzer two-fer /solution
```
