#!/usr/bin/env bash

if [ -z "$EXERCISM_PRETTIER_VERSION" ]; then
	echo "Pulling prettier version from package.json"
	EXERCISM_PRETTIER_VERSION=$(npm list prettier | grep -Po '.*prettier@\K.*')
fi

if [ -z "$EXERCISM_PRETTIER_VERSION" ]; then
	echo "This script requires the EXERCISM_PRETTIER_VERSION variable to work."
	echo "Please see https://github.com/exercism/v3/blob/master/docs/maintainers/style-guide.md for guidance."
	exit 1
else
	echo "Running format with prettier@$EXERCISM_PRETTIER_VERSION"
fi

npx "prettier@$EXERCISM_PRETTIER_VERSION" --write "**/*.{js,jsx,ts,tsx,css,sass,scss,html,json,md,yml}"
