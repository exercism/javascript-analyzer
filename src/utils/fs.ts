import fs from 'fs'

/**
 * Reads a file from a path and resolves when it's done
 *
 * @param {string} filePath the path
 * @returns the promise
 */
export async function readFile(filePath: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject): void => {
    fs.readFile(filePath, (err, data): void => {
      err ? reject(err) : resolve(data)
    })
  })
}

export async function readDir(dirPath: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject): void => {
    fs.readdir(dirPath, (err, files): void => {
      if (err) {
        return reject(err)
      }

      resolve(files)
    })
  })
}

export async function exists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve): void => {
    fs.exists(path, (exists): void => {
      resolve(exists)
    })
  })
}

export async function writeFile<T>(filePath: string, data: T): Promise<T> {
  return new Promise((resolve, reject): void => {
    fs.writeFile(filePath, data, (err): void => {
      err ? reject(err) : resolve(data)
    })
  })
}
