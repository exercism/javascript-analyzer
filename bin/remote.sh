#!/usr/bin/env sh

# Usage:
# ./bin/remote.sh https://exercism.io/solutions/8710d0d5953247848afd8bd6ae9dae04

node -r esm -r module-alias/register ./dist/remote-analyze.js __remote__ "$@"
