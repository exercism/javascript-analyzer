@REM Usage:
@REM ./bin/analyze.bat two-fer ~/test/

node -r esm -r module-alias/register ./dist/analyze.js %*
