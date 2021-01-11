#!/usr/bin/env sh

# Usage:
# ./bin/stats.sh two-fer

node -r esm -r module-alias/register ./dist/stats.js "$@"
