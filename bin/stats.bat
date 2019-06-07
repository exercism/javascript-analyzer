@REM Usage:
@REM ./bin/stats.bat two-fer

node -r esm -r module-alias/register ./dist/stats.js %*
