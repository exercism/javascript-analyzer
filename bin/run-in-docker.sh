#!/usr/bin/env sh

# Synopsis:
# Run the analyzer on a solution using the analyzer Docker image.
# The analyzer Docker image is built automatically.

# Arguments:
# $1: exercise slug
# $2: path to solution folder
# $3: path to output directory

# Output:
# Run the analyzer on a solution using the analyzer Docker image.
# The analyzer Docker image is built automatically.

# Example:
# ./bin/run-in-docker.sh two-fer path/to/solution/folder/ path/to/output/directory/

# Stop executing when a command returns a non-zero return code
set -e

# If any required arguments is missing, print the usage and exit
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ]; then
    echo "usage: ./bin/run-in-docker.sh exercise-slug path/to/solution/folder/ path/to/output/directory/"
    exit 1
fi

slug="$1"
solution_dir=$(realpath "${2%/}")
output_dir=$(realpath "${3%/}")

# Create the output directory if it doesn't exist
mkdir -p "${output_dir}"

# Build the Docker image
docker build --rm -t exercism/javascript-analyzer .

# Run the Docker image using the settings mimicking the production environment
docker run \
    --rm \
    --network none \
    --read-only \
    --mount type=bind,src="${solution_dir}",dst=/solution \
    --mount type=bind,src="${output_dir}",dst=/output \
    --mount type=tmpfs,dst=/tmp \
    exercism/javascript-analyzer "${slug}" /solution /output 
