import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'

export const NEEDS_LICENSE = 'needsLicense'
export const CHOOSE_VEHICLE = 'chooseVehicle'
export const CALCULATE_RESELL_PRICE = 'calculateResellPrice'

class NeedsLicense extends PublicApi {
  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    let foundSuboptimalNode = false

    this.traverse({
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        foundSuboptimalNode = false
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }
}
class ChooseVehicle extends PublicApi {
  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 2) {
      return false
    }

    let foundSuboptimalNode = false

    this.traverse({
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        foundSuboptimalNode = false
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }
}
class CalculateResellPrice extends PublicApi {
  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 2) {
      return false
    }

    let foundSuboptimalNode = false

    this.traverse({
      enter() {
        foundSuboptimalNode = true
      },

      [AST_NODE_TYPES.ReturnStatement]() {
        foundSuboptimalNode = false
      },

      [AST_NODE_TYPES.BlockStatement]() {
        foundSuboptimalNode = false
      },

      exit() {
        if (foundSuboptimalNode) {
          this.break()
        }
      },
    })

    return !foundSuboptimalNode
  }
}

export class VehiclePurchaseSolution {
  private readonly source: Source

  public readonly needsLicense: NeedsLicense
  public readonly chooseVehicle: ChooseVehicle
  public readonly calculateResellPrice: CalculateResellPrice

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.needsLicense = new NeedsLicense(
      assertPublicApi(NEEDS_LICENSE, exports, functions)
    )
    this.chooseVehicle = new ChooseVehicle(
      assertPublicApi(CHOOSE_VEHICLE, exports, functions)
    )
    this.calculateResellPrice = new CalculateResellPrice(
      assertPublicApi(CALCULATE_RESELL_PRICE, exports, functions)
    )
  }

  public readExemplar(directory: string): void {
    const configPath = path.join(directory, '.meta', 'config.json')
    const config = JSON.parse(readFileSync(configPath).toString())

    const exemplarPath = path.join(directory, config.files.exemplar[0])
    this.exemplar = new Source(readFileSync(exemplarPath).toString())
  }

  public get isExemplar(): boolean {
    const sourceAst = AstParser.REPRESENTER.parseSync(this.source.toString())
    const exemplarAst = AstParser.REPRESENTER.parseSync(
      this.exemplar.toString()
    )

    return (
      JSON.stringify(sourceAst[0].program) ===
      JSON.stringify(exemplarAst[0].program)
    )
  }
}
