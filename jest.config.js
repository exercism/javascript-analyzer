module.exports = {
  verbose: true,
  projects: [
    '<rootDir>'
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/test/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/test/fixtures'
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
