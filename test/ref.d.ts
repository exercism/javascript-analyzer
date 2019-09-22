/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../src/interface.d.ts" />
/// <reference path="../src/declarations.d.ts" />

interface MockedFs {
  __setMockFiles(files: { [path: string]: string }): void;
  __getWrittenFiles(): { [dir: string]: { [file: string]: string }};
}
