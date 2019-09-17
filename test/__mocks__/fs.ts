
import path from 'path'
import { PathLike } from 'fs';

const fs = jest.genMockFromModule('fs') as Omit<typeof import('fs'), 'readFile' | 'readdir' | 'exists' | 'writeFile'> & {
  __setMockFiles: typeof __setMockFiles;
  __getWrittenFiles: typeof __getWrittenFiles;

  readdir(path: PathLike, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void): void;
  readFile(path: PathLike | number, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void;
  writeFile(path: PathLike | number, data: unknown, callback: (err: NodeJS.ErrnoException | null) => void): void;
  exists(path: PathLike, callback: (exists: boolean) => void): void;
};

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles: { [dir: string]: { [file: string]: string } } = Object.create(null)
let writtenFiles: { [dir: string]: { [file: string]: string } } = Object.create(null)

class NotMocked extends Error {
  public readonly code: string;
  public readonly errno: 34;

  constructor(key: string) {
    super(
      `${key} does not exist (because it has not been mocked)\n` +
      `Mocked are: \n${JSON.stringify(mockFiles, null, 2)}`
    )

    this.code = 'ENOENT'
    this.errno = 34

    Error.captureStackTrace(this, this.constructor);
  }
}

class CanOnlyWriteUnmockedFiles extends Error {
  public readonly code: string;
  public readonly errno: 47;

  constructor(key: string) {
    super(
      `${key} already exists as readonly (because it has been mocked)`
    )

    this.code = 'EEXIST'
    this.errno = 47

    Error.captureStackTrace(this, this.constructor);
  }
}

function __setMockFiles(newMockFiles: { [path: string]: string }): void {
  mockFiles = Object.create(null)
  writtenFiles = Object.create(null)

  for (const fullPath in newMockFiles) {
    const osPath = path.normalize(fullPath)
    const dir = path.dirname(osPath)
    const file = path.basename(osPath)

    if (!mockFiles[dir]) {
      mockFiles[dir] = {};
    }

    mockFiles[dir][file] = newMockFiles[fullPath]
  }
}

function __getWrittenFiles(): typeof writtenFiles {
  return JSON.parse(JSON.stringify(writtenFiles))
}

function readdir(dirPath: PathLike, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void): void {
  const key = path.normalize(dirPath.toString())

  if (key in mockFiles) {
    return callback(null, Object.keys(mockFiles[key]))
  }
  return callback(new NotMocked(key), [])
}

function readFile(filePath: PathLike | number, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  if (dir in mockFiles && file in mockFiles[dir]) {
    return callback(null, Buffer.from(mockFiles[dir][file]))
  }
  return callback(new NotMocked(key), Buffer.from([]))
}

function writeFile(filePath: PathLike | number, data: unknown, callback: (err: NodeJS.ErrnoException | null) => void): void {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  if (dir in mockFiles && file in mockFiles[dir]) {
    return callback(new CanOnlyWriteUnmockedFiles(key))
  }

  if (!writtenFiles[dir]) {
    writtenFiles[dir] = {};
  }

  writtenFiles[dir][file] = String(data)

  return callback(null)
}

function exists(filePath: PathLike, callback: (exists: boolean) => void): void {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  callback(key in mockFiles || (dir in mockFiles && file in mockFiles[dir]))
}

fs.__setMockFiles = __setMockFiles
fs.__getWrittenFiles = __getWrittenFiles

fs.readdir = readdir
fs.readFile = readFile
fs.writeFile = writeFile
fs.exists = exists

export default fs
