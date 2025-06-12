// @ts-check

import config from '@exercism/eslint-config-tooling'

export default [
  ...config,
  {
    ignores: [
      '.appends/**/*',
      '.github/**/*',
      '.vscode/**/*',
      'bin/**/*',
      'dist/**/*',
      'test/fixtures/**/*',
      'test_exercises/**/*',
      'babel.config.js',
      'jest.runner.config.js',
    ],
  },
]
