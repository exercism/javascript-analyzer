#!/bin/bash

# Usage:
# ./bin/analyze.sh two_fer ~/test/

node -r esm ./dist/analyze.js "$@"
