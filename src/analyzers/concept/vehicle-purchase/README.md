## Analyzer

This exercise could benefit from the following rules in the [analyzer][analyzer]:

- Verify that `needsLicense` does not include an unnecessary if-statement where the student returns `true`/`false`.
- Verify that in `chooseVehicle` the string `' is clearly the better choice'` only appears once.
- Verify that in `chooseVehicle` and `calculateResellPrice` the student actually practiced if/else and did not use early returns. E.g., show a comment like this
  ```
  Nice.
  That's an _early return_.
  For the purpose of the Concept that this exercise aims to teach, try solving this using an `else` statement.
  ```
