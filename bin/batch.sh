#!/usr/bin/env sh

# Usage:
# ./bin/batch.sh two-fer

node -r esm -r module-alias/register ./dist/batch.js "$@"
