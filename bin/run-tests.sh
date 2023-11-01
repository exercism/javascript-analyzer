#!/usr/bin/env sh

# Synopsis:
# Test the analyzer by running it against a predefined set of solutions 
# with an expected output.

# Output:
# Outputs the diff of the expected analysis against the actual analysis
# generated by the analyzer.

# Example:
# ./bin/run-tests.sh

exit_code=0

# We need to copy the fixtures to a temp directory as the user
# running within the Docker container does not have permissions 
# to run the sed command on the fixtures directory
fixtures_dir="test/fixtures"
tmp_fixtures_dir="test/fixtures"
# tmp_fixtures_dir="/tmp/test/fixtures"
# rm -rf "${tmp_fixtures_dir}"
# mkdir -p "${tmp_fixtures_dir}"
# cp -R ${fixtures_dir}/* "${tmp_fixtures_dir}"

# Iterate over all test directories
for analysis_file in $(find "${tmp_fixtures_dir}" -name expected_analysis.json); do
    slug=$(echo "${analysis_file:${#tmp_fixtures_dir}+1}" | cut -d / -f 1)
    test_dir=$(dirname "${analysis_file}")
    test_dir_name=$(basename "${analysis_file}")
    test_dir_path=$(realpath "${test_dir}")
    bin/run.sh "${slug}" "${test_dir_path}" "${test_dir_path}"

    file="analysis.json"
    expected_file="expected_${file}"
    echo "${test_dir}: comparing ${file} to ${expected_file}"

    if ! diff "${test_dir}/${file}" "${test_dir}/${expected_file}"; then
        exit_code=1
    fi
done

exit ${exit_code}
