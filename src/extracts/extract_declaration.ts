import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'
import { ExtractedFunction } from '@exercism/static-analysis'
import { Source } from '~src/analyzers/SourceImpl'

export function extractSignature(
  fn: Readonly<ExtractedFunction>,
  source: Readonly<Source>
): string {
  const signatureRange: [number, number] = [
    fn.node.range[0],
    fn.body.range[0] - 1,
  ]
  const signature = {
    ...fn.node,
    range: signatureRange,
  }

  // In this case, fn.node doesn't have the entire source that needs to be
  // extracted. Manually prefix it with the variable.
  //
  // This will mutate const { definition } = init to const definition = init,
  // leaving other items inside the object- (or array-) expression alone.
  if (fn.node.type === AST_NODE_TYPES.VariableDeclarator) {
    return `${fn.metadata.variable?.kind || 'const'} ${source.getOuter(
      signature
    )} ...`
  }
  return source.getOuter(signature) + ' ...'
}
