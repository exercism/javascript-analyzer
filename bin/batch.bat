@REM Usage:
@REM ./bin/batch.bat two-fer

node -r esm -r module-alias/register ./dist/batch.js %*
