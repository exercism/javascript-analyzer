import fs from 'fs'

/**
 * Reads a file from a path and resolves when it's done
 *
 * @param {string} filePath the path
 * @returns the promise
 */
export async function readFile(filePath: string): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export async function readDir(dirPath: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err)
      }

      resolve(files)
    })
  })
}

export async function exists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fs.exists(path, (exists) => {
      resolve(exists)
    })
  })
}
