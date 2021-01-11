interface MockedFs {
  __setMockFiles(files: { [path: string]: string }): void
  __getWrittenFiles(): { [dir: string]: { [file: string]: string } }
}
