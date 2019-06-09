module.exports = {
  verbose: true,
  projects: [
    '<rootDir>'
  ],
  roots: [
    "<rootDir>/src/",
    "<rootDir>/test/"
  ],
  moduleNameMapper: {
    '^~src/(.*)$': '<rootDir>/src/$1',
    '^~test/(.*)$': '<rootDir>/test/$1'
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/test/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    '/(?:production_)?node_modules/',
    '.d.ts$',
    '<rootDir>/test/fixtures',
    '<rootDir>/test/helpers',
    '__mocks__'
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
