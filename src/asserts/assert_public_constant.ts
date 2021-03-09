import {
  ExtractedExport,
  findTopLevelConstants,
  guardIdentifier,
  ProgramConstant,
  StructureError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { assertNamedExport } from '../asserts/assert_named_export'

export class NoPublicConstantError extends StructureError {
  constructor(public name: string) {
    super(`Expected an exported constant named ${name}, but did not find it.`)

    Error.captureStackTrace(this, this.constructor)
  }
}

export function assertPublicConstant(
  exported: string,
  exports: ExtractedExport[],
  root: TSESTree.Node
): ProgramConstant {
  const namedExport = assertNamedExport(exported, exports)
  const result = findTopLevelConstants(root, ['let', 'const', 'var']).find(
    (constant) =>
      guardIdentifier(constant.id) && constant.id.name === namedExport.name
  )

  if (!result) {
    throw new NoPublicConstantError(exported)
  }

  return result
}
