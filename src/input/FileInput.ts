import { readFile } from "~src/utils/fs";

export class FileInput implements Input {
  constructor(private readonly path: string) {}

  public async read(_n = 1): Promise<string[]> {
    const buffer = await readFile(this.path)
    return [buffer.toString("utf8")]
  }
}
