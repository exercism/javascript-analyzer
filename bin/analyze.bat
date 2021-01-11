@REM Usage:
@REM ./bin/analyze.bat two-fer ~/folder/to/solution
@REM ./bin/analyze.bat two-fer ~/folder/to/solution/input ~/folder/to/analyzer/output

node -r esm -r module-alias/register ./dist/analyze.js %*
