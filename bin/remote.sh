#!/usr/bin/env sh

# Usage:
# ./bin/remote.sh https://exercism.io/tracks/javascript/exercises/two-fer/solutions/df3bb5d7131c44ea9c62206cc8d6c225
# ./bin/remote.sh https://exercism.io/tracks/javascript/exercises/two-fer/solutions/df3bb5d7131c44ea9c62206cc8d6c225 ~/folder/to/analyzer/output
#
# Solution URL can be:
# - published solution: https://exercism.io/tracks/javascript/exercises/two-fer/solutions/df3bb5d7131c44ea9c62206cc8d6c225
# - own solution: https://exercism.io/my/solutions/df3bb5d7131c44ea9c62206cc8d6c225
# - mentor solution:  https://exercism.io/mentor/solutions/df3bb5d7131c44ea9c62206cc8d6c225
# - private solution: https://exercism.io/solutions/df3bb5d7131c44ea9c62206cc8d6c225

node ./dist/remote-analyze.js __remote__ "$@"
