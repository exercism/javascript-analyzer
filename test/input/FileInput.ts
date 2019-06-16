import { FileInput } from '~src/input/FileInput'
import fs from 'fs'

jest.mock('fs');

const mockedFs = fs as unknown as MockedFs

function mockFiles(files: { [path: string]: string }): void {
  mockedFs.__setMockFiles(files)
}

describe('FileInput', () => {

  describe('a path that exists', () => {
    const SOLUTION_FILES = {
      '/path/to/solution/two-fer.js': 'export const twoFer() {}',
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('can find a source file', async () => {
      const input = new FileInput('/path/to/solution/two-fer.js')
      const [file, ...other] = await input.read()

      expect(file).toBe(SOLUTION_FILES['/path/to/solution/two-fer.js'])
      expect(other.length).toBe(0);
    });
  })

  describe('a path that doesn\'t exist', () => {

    const SOLUTION_FILES = {
      '/not/path/to/solution/two-fer.js': 'export const nope = {}'
    };

    beforeEach(() => {
      mockFiles(SOLUTION_FILES)
    });

    test('bubbles the error', async () => {
      const input = new FileInput('/path/to/solution/two-fer.js')
      await expect(input.read()).rejects.toMatchObject({
        errno: 34,
        code: 'ENOENT'
      })
    });
  })
});
