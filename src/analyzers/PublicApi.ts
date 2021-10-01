import { ExtractedFunction, traverse } from '@exercism/static-analysis'
import { parameterName } from './utils/extract_parameter'

export class PublicApi {
  public readonly parameter: string

  constructor(protected readonly implementation: ExtractedFunction) {
    this.parameter = parameterName(implementation.params[0])
  }

  public traverse(options: Parameters<typeof traverse>[1]): void {
    traverse(this.implementation.body, options)
  }
}
