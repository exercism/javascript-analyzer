interface MockedFs {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __setMockFiles: (files: { [path: string]: string }) => void
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __getWrittenFiles: () => { [dir: string]: { [file: string]: string } }
}
