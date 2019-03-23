import fs from 'fs'

export async function readFile(filePath: string) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}

export async function readDir(dirPath: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err)
      }

      resolve(files)
    })
  })
}

export async function exists(path: string) {
  return new Promise<boolean>((resolve) => {
    fs.exists(path, (exists) => {
      resolve(exists)
    })
  })
}
