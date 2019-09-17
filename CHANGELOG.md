# Changelog

## 0.3.1

- Update snapshots
- Fix `comments/parameters.ts` test
- Fix `output/toProcessable.ts` test

## 0.3.0

- Add analyzer for `gigasecond`
- Add `--pretty` output to pretty print the generated output, off by default.

## 0.2.1

- Change `--noTemplates` output to use `%{tag}` for tagged template variables,
  instead of `%<tag>s`.

## 0.2.0

- Per https://github.com/exercism/automated-mentoring-support/issues/53,
  Merge "approve_as_optimal" and "approve_with_comment" into a single status
  "approve", and rename the "disapprove_with_comment" status to "disapprove".
- Switch to template output by default (changing the run flag from templates to
  noTemplates).

## 0.1.1

Fixes the build and prepare step of the Docker-based image

## 0.1.0

:baby: initial release
