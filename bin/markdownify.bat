@REM Usage:
@REM ./bin/markdownify.sh ~/folder/to/solution/with/analysis.json --copy ~/website-copy/automated-mentoring

node -r esm -r module-alias/register ./dist/markdownify.js %*
