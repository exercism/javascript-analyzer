import { readFile } from "../utils/fs";

export class FileInput implements Input {
  constructor(private readonly path: string) {}

  async read(n = 1): Promise<string[]> {
    const buffer = await readFile(this.path)
    return [buffer.toString("utf8")]
  }
}
