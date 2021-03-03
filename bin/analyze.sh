#!/usr/bin/env sh

# Usage:
# ./bin/analyze.sh two-fer ~/folder/to/solution
# ./bin/analyze.sh two-fer ~/folder/to/solution/input ~/folder/to/analyzer/output

node ./dist/analyze.js "$@"
