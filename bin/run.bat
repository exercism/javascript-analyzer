@REM Alias of generate.bat
@REM
@REM Usage:
@REM ./bin/run.bat two-fer ~/folder/to/solution
@REM ./bin/run.bat two-fer ~/folder/to/solution/input ~/folder/to/analyzer/output

node ./dist/represent.js %*
