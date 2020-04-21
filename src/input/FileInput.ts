import { readFile } from "~src/utils/fs";
import { Input } from "~src/interface";

export class FileInput implements Input {
  constructor(private readonly path: string) {}

  public async read(_n = 1): Promise<string[]> {
    const buffer = await readFile(this.path)
    return [buffer.toString("utf8")]
  }

  public async informativeBail(): Promise<never> {
    return Promise.reject(new Error(`Could not read file "${this.path}"`))
  }
}
