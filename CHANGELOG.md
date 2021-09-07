# Changelog

## 0.17.0

- Add check for no value returned in `two-fer`

## 0.16.0

- Add exemplary analyzer for `amusement-park`
- Add exemplary analyzer for `bird-watcher`
- Add exemplary analyzer for `coordinate-transformation`
- Add exemplary analyzer for `elyses-analytic-enchantments`
- Add exemplary analyzer for `elyses-destructured-enchantments`
- Add exemplary analyzer for `elyses-enchantments`
- Add exemplary analyzer for `elyses-looping-enchantments`
- Add exemplary analyzer for `elyses-transformative-enchantments`
- Add exemplary analyzer for `factory-sensors`
- Add exemplary analyzer for `high-score-board`
- Add exemplary analyzer for `lasagna-master`
- Add exemplary analyzer for `lucky-numbers`
- Add exemplary analyzer for `mixed-juices`
- Add exemplary analyzer for `nullability`
- Add exemplary analyzer for `ozans-playlist`
- Add exemplary analyzer for `pizza-order`
- Add exemplary analyzer for `translation-service`
- Add exemplary analyzer for `vehicle-purchase`

## 0.15.0

- Allow non-optimal constants in `resistor-color-duo`

## 0.14.0

- Update dependencies

## 0.13.1

- Update dependencies

## 0.13.0

- Use generic ExemplarAnalyzer for `poetry-club-door-analyzer`

## 0.12.0

- Add generic ExemplarAnalyzer
- Use generic ExemplarAnalyzer for `annalyns-infiltration`
- Use generic ExemplarAnalyzer for `freelancer-rates`

## 0.11.2

- Improve `concept/lasagna` analysis
- Add various generic comments

## 0.11.1

- Remove `console.log` from EarlyFinalisation code path

## 0.11.0

- Add initial implementation for `concept/lasagna`

## 0.10.0

- Use `.meta/config.json` when its available

## 0.9.0

- Change to compile using babel
- Change relative paths to module paths for cleaner imports
- Change analyzer folders to include practice/concept
- Add e2e test for CI

## 0.8.2

- Upgrade dependencies

## 0.8.1

- Upgrade dependencies

## 0.8.0

- Use `@exercism/static-analysis`
- Add workflows
- Add `prettier`
- Add `plugin/import` for `eslint`
- Reimplement analyzers using new library

## 0.7.0

- Add main entrypoint in `package.json`
- Add `web` run
- Upgrade dependencies

## 0.6.1

- Update dependencies
- Change `resistor-color-duo` expected export name to `decodedValue`

## 0.6.0

- Fix various `shared` comments which had `generic` instead of `general` in their name.
- Fix a bug with the parser that caused some solutions to blow up
- Add `makeParseErrorOutput` and `makeNoSourceOutput` to redirect to a mentor with helpful information

## 0.5.3

- Fix `resistor-color` constant lookup, when name doesn't match "probably"
- Fix `resistor-color-duo` constant lookup, when name doesn't match "probably"
- Add message to `resistor-color-duo` for `param.shift()`

## 0.5.2

- Cleanup imports and exports

## 0.5.1

- Fix `resistor-color-duo` helper code (with `resistor-color` rewrite changed)

## 0.5.0

- Rewrite analyzer for `resistor-color` to match `resistor-color-duo`
- Fix `findTopLevelConstants` (which fixes a snapshot for `gigasecond` as well)

## 0.4.2

- Add `typescript` as `dependency` because of https://github.com/typescript-eslint/typescript-eslint/issues/828

## 0.4.1

- Add message (fix) to `reduce` solutions without `slice`
- Add `limit_number_of_colors` extra message when `slice` is an `must_add_missing_call`.

## 0.4.0

- Add analyzer for `resistor-color-duo`
- Fix snapshot name for `resistor-color`

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
