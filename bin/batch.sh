#!/usr/bin/env sh

# Usage:
# ./bin/batch.sh two-fer

node -r esm ./dist/batch.js "$@"
