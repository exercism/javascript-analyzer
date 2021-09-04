import path from 'path'
import {
  BaseEncodingOptions,
  Dirent,
  Mode,
  OpenMode,
  PathLike,
  Stats,
} from 'fs'
import type { promises } from 'fs'
type FileHandle = promises.FileHandle

const fs = jest.createMockFromModule('fs') as Omit<
  typeof import('fs'),
  never
> & {
  __setMockFiles: typeof __setMockFiles
  __getWrittenFiles: typeof __getWrittenFiles
}

fs.promises = {} as typeof fs.promises

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles: { [dir: string]: { [file: string]: string } } =
  Object.create(null)
let writtenFiles: { [dir: string]: { [file: string]: string } } =
  Object.create(null)

class NotMocked extends Error {
  public readonly code: string
  public readonly errno: 34

  constructor(key: string) {
    super(
      `${key} does not exist (because it has not been mocked)\n` +
        `Mocked are: \n${JSON.stringify(mockFiles, null, 2)}`
    )

    this.code = 'ENOENT'
    this.errno = 34

    Error.captureStackTrace(this, this.constructor)
  }
}

class CanOnlyWriteUnmockedFiles extends Error {
  public readonly code: string
  public readonly errno: 47

  constructor(key: string) {
    super(`${key} already exists as readonly (because it has been mocked)`)

    this.code = 'EEXIST'
    this.errno = 47

    Error.captureStackTrace(this, this.constructor)
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
      mockFiles[dir] = {}
    }

    mockFiles[dir][file] = newMockFiles[fullPath]
  }
}

function __getWrittenFiles(): typeof writtenFiles {
  return JSON.parse(JSON.stringify(writtenFiles))
}

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
function readdir(
  path: PathLike,
  options?:
    | (BaseEncodingOptions & { withFileTypes?: false })
    | BufferEncoding
    | null
): Promise<string[]>

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
function readdir(
  path: PathLike,
  options: { encoding: 'buffer'; withFileTypes?: false } | 'buffer'
): Promise<Buffer[]>

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
 */
function readdir(
  path: PathLike,
  options?:
    | (BaseEncodingOptions & { withFileTypes?: false })
    | BufferEncoding
    | null
): Promise<string[] | Buffer[]>

/**
 * Asynchronous readdir(3) - read a directory.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * @param options If called with `withFileTypes: true` the result data will be an array of Dirent.
 */
function readdir(
  path: PathLike,
  options: BaseEncodingOptions & { withFileTypes: true }
): Promise<Dirent[]>

async function readdir(
  dirPath: PathLike
): Promise<string[] | Buffer[] | Dirent[]> {
  const key = path.normalize(dirPath.toString())

  if (key in mockFiles) {
    return Promise.resolve(Object.keys(mockFiles[key]))
  }

  throw new NotMocked(key)
}

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a `FileHandle` is provided, the underlying file will _not_ be closed automatically.
 * @param options An object that may contain an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
function readFile(
  path: PathLike | FileHandle,
  options?: { encoding?: null; flag?: OpenMode } | null
): Promise<Buffer>

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a `FileHandle` is provided, the underlying file will _not_ be closed automatically.
 * @param options An object that may contain an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
function readFile(
  path: PathLike | FileHandle,
  options: { encoding: BufferEncoding; flag?: OpenMode } | BufferEncoding
): Promise<string>

/**
 * Asynchronously reads the entire contents of a file.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * If a `FileHandle` is provided, the underlying file will _not_ be closed automatically.
 * @param options An object that may contain an optional flag.
 * If a flag is not provided, it defaults to `'r'`.
 */
function readFile(
  path: PathLike | FileHandle,
  options?: (BaseEncodingOptions & { flag?: OpenMode }) | BufferEncoding | null
): Promise<string | Buffer>

async function readFile(
  filePath: PathLike | FileHandle
): Promise<string | Buffer> {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  if (dir in mockFiles && file in mockFiles[dir]) {
    return Buffer.from(mockFiles[dir][file])
  }

  throw new NotMocked(key)
}

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * It is unsafe to call `fsPromises.writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 * URL support is _experimental_.
 * If a `FileHandle` is provided, the underlying file will _not_ be closed automatically.
 * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
 * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
 * If `encoding` is not supplied, the default of `'utf8'` is used.
 * If `mode` is not supplied, the default of `0o666` is used.
 * If `mode` is a string, it is parsed as an octal integer.
 * If `flag` is not supplied, the default of `'w'` is used.
 */
function writeFile(
  path: PathLike | FileHandle,
  data: string | Uint8Array,
  options?:
    | (BaseEncodingOptions & { mode?: Mode; flag?: OpenMode })
    | BufferEncoding
    | null
): Promise<void>

async function writeFile(
  filePath: PathLike | FileHandle,
  data: string | Uint8Array
): Promise<void> {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  if (dir in mockFiles && file in mockFiles[dir]) {
    throw new CanOnlyWriteUnmockedFiles(key)
  }

  if (!writtenFiles[dir]) {
    writtenFiles[dir] = {}
  }

  writtenFiles[dir][file] = String(data)
}

/**
 * Asynchronous stat(2) - Get file status.
 * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
 */
function stat(path: PathLike): Promise<Stats>

async function stat(filePath: PathLike): Promise<Stats> {
  const key = path.normalize(filePath.toString())
  const dir = path.dirname(key)
  const file = path.basename(key)

  const exists =
    key in mockFiles || (dir in mockFiles && file in mockFiles[dir])

  if (exists) {
    return {} as Stats
  }

  throw new NotMocked(key)
}

fs.__getWrittenFiles = __getWrittenFiles
fs.__setMockFiles = __setMockFiles

fs.promises.readdir = readdir
fs.promises.readFile = readFile
fs.promises.writeFile = writeFile
fs.promises.stat = stat

export default fs
