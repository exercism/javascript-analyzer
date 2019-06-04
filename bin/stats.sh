#!/usr/bin/env sh

# Usage:
# ./bin/stats.sh two-fer

node -r esm ./dist/stats.js "$@"
