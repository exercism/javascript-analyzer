import { FileOutput } from '~src/output/processor/FileOutput'
import fs from 'fs'
import path from 'path'

jest.mock('fs');

function mockFiles(files: { [path: string]: string }) {
  (fs as any).__setMockFiles(files)
}

function getWrittenFiles(): { [dir: string]: { [file: string]: string }} {
  return (fs as any).__getWrittenFiles()
}

const CONTENTS = `My Fine Output`

describe('FileOutput', () => {
  describe('when the output path is writable', () => {
    const OUT_OPTIONS = { inputDir: '/path/to/input', output: 'analysis.out' } as ExecutionOptions

    beforeEach(() => {
      mockFiles({})
    })

    it('doesn\'t modify the previous stream', async () => {
      const processed = await FileOutput(Promise.resolve(CONTENTS), OUT_OPTIONS)
      expect(processed).toStrictEqual(CONTENTS)
    })

    it('writes the processable stream to disk', async () => {
      await FileOutput(Promise.resolve(CONTENTS), OUT_OPTIONS)
      const files = getWrittenFiles()
      expect(files).toMatchObject({
        [path.normalize(OUT_OPTIONS.inputDir)]: {
          [OUT_OPTIONS.output]: CONTENTS
        }
      })
    })
  })

  describe('when the output path is not writable', () => {
    const OUT_OPTIONS = { inputDir: '/path/to/input', output: 'analysis.out' } as ExecutionOptions

    beforeEach(() => {
      mockFiles({ [path.join(OUT_OPTIONS.inputDir, OUT_OPTIONS.output)]: 'Already Written' })
    })

    it('bubbles the unwritable error', async () => {
      expect(FileOutput(Promise.resolve(CONTENTS), OUT_OPTIONS)).rejects.toMatchObject({
        'errno': 47,
        'code': 'EEXIST'
      })
    })
  })

  describe('when the output is absolute', () => {
    const OUT_OPTIONS = { inputDir: '/not', output: '/path/to/output/analysis.out' } as ExecutionOptions

    beforeEach(() => {
      mockFiles({})
    })

    it('uses the output path only', async () => {
      await FileOutput(Promise.resolve(CONTENTS), OUT_OPTIONS)
      const files = getWrittenFiles()

      const outFile = path.normalize(path.basename(OUT_OPTIONS.output))

      // Written at output
      expect(files).toMatchObject({
        [path.normalize(path.dirname(OUT_OPTIONS.output))]: {
          [outFile]: CONTENTS
        }
      })

      // Not written at not/path/to/output
      expect(files).not.toMatchObject({
        [path.normalize(OUT_OPTIONS.inputDir)]: {
          [outFile]: CONTENTS
        }
      })

      // Not written at combination of the two
      expect(files).not.toMatchObject({
        [path.normalize(path.join(OUT_OPTIONS.inputDir, path.dirname(OUT_OPTIONS.output)))]: {
          [outFile]: CONTENTS
        }
      })
    })
  })

  describe('when the output is relative', () => {
    const OUT_OPTIONS = { inputDir: '/path/to/input', output: 'analysis.out' } as ExecutionOptions

    beforeEach(() => {
      mockFiles({})
    })

    it('uses the input dir to write the output file', async () => {
      await FileOutput(Promise.resolve(CONTENTS), OUT_OPTIONS)
      const files = getWrittenFiles()

      // Written at input dir
      expect(files).toMatchObject({
        [path.normalize(OUT_OPTIONS.inputDir)]: {
          [OUT_OPTIONS.output]: CONTENTS
        }
      })
    })
  })

})
