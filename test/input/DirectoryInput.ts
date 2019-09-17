import { DirectoryInput } from '~src/input/DirectoryInput'
import fs from 'fs'

jest.mock('fs');

const mockedFs = fs as unknown as MockedFs

function mockFiles(files: { [path: string]: string }): void {
  mockedFs.__setMockFiles(files)
}

describe('DirectoryInput', () => {

  describe('a valid submission with extra files', () => {
    const SOLUTION_FILES = {
      '/path/to/solution/a.js': 'export const a() {}',
      '/path/to/solution/two-fer.js': 'export const twoFer() {}',
      '/path/to/solution/two-fer.spec.js': 'describe("a test", () => { it("is true") { expect(true).toBe(true) }}})',
      '/path/to/solution/README.md': '# My Readme',
      '/path/to/solution/z.js': 'export const z() {}',
      '/random/other/path/two-fer.js': 'export const nope() {}'
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(1);
    });

    test('it excludes files that are not .js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/README.md'])
    });

    test('it excludes files that are .spec.js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/two-fer.spec.js'])
    });

    test('it prefers <slug>.js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const [file, ...others] = await input.read(1)

      expect(others.length).toBe(0);
      expect(file).toBe(SOLUTION_FILES['/path/to/solution/two-fer.js'])
    });
  });

  describe('an invalid submission with only a test file', () => {
    const SOLUTION_FILES = {
      '/path/to/solution/two-fer.spec.js': 'describe("a test", () => { it("is true") { expect(true).toBe(true) }}})',
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can not find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(0);
    });
  })

  describe('a valid submission with all files', () => {

    const SOLUTION_FILES = {
      '/path/to/solution/.exercism/metadata.json': '{"track":"javascript","exercise":"two-fer"}',
      '/path/to/solution/node_modules/@babel/cli/index.js': 'throw new Error("Use the `@babel/core` package instead of `@babel/cli`.")',
      '/path/to/solution/.eslintrc': '{ "extends": [ "eslint: recommended" ] }',
      '/path/to/solution/babel.config.js': 'module.exports = { presets: [ "@babel/env" ] }',
      '/path/to/solution/.eslintrc.js': 'module.exports = { extends: [ "eslint: recommended" ] }',
      '/path/to/solution/jest.config.js': 'module.exports = { "transform": { "^.+\\.[jt]sx?$"": "babel-jest" } }',
      '/path/to/solution/package-lock.json': '{ "name": "exercism-javascript" }',
      '/path/to/solution/package.json': '{ "name": "exercism-javascript" }',
      '/path/to/solution/two-fer.js': 'export const twoFer() {}',
      '/path/to/solution/two-fer.spec.js': 'describe("a test", () => { it("is true") { expect(true).toBe(true) }}})',
      '/path/to/solution/README.md': '# Two Fer',
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can find a source file', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(1)

      expect(files.length).toBe(1);
    });

    test('it excludes files that are not .js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/README.md'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/package.json'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/package-lock.json'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.eslintrc'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.exercism/metadata.json'])
    });

    test('it excludes files that are .spec.js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/two-fer.spec.js'])
    });

    test('it excludes files that are configuration', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const files = await input.read(Object.keys(SOLUTION_FILES).length)

      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/.eslintrc.js'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/babel.config.js'])
      expect(files).not.toContain(SOLUTION_FILES['/path/to/solution/jest.config.js'])
    });

    test('it prefers <slug>.js', async () => {
      const input = new DirectoryInput('/path/to/solution', 'two-fer')
      const [file, ...others] = await input.read(1)

      expect(others.length).toBe(0);
      expect(file).toBe(SOLUTION_FILES['/path/to/solution/two-fer.js'])
    });
  })
});
