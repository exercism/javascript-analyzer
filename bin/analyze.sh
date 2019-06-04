#!/usr/bin/env sh

# Usage:
# ./bin/analyze.sh two-fer ~/folder/to/solution

node -r esm ./dist/analyze.js "$@"
