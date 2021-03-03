#!/usr/bin/env sh

# Usage:
# ./bin/markdownify.sh ~/folder/to/solution/with/analysis.json --copy ~/website-copy/automated-mentoring

node ./dist/markdownify.js __ "$@"
