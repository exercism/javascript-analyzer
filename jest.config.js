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
    '.d.ts$',
    '<rootDir>/test/fixtures',
    '<rootDir>/test/helpers'
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
