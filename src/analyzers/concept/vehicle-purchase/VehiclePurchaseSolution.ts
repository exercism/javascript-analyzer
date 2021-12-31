import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findAll,
  findFirst,
  findFirstOfType,
  TemplateLiteral,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'

type IfStatement = TSESTree.IfStatement

export const NEEDS_LICENSE = 'needsLicense'
export const CHOOSE_VEHICLE = 'chooseVehicle'
export const CALCULATE_RESELL_PRICE = 'calculateResellPrice'

/**
 * Verify that `needsLicense` does not include an unnecessary if-statement where
 * the student returns `true`/`false`.
 */
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

    return foundSuboptimalNode
  }

  public get hasConditional(): boolean {
    return !!findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.IfStatement
    )
  }
}

/**
 * Verify that in `chooseVehicle` the string `' is clearly the better choice'`
 * only appears once.
 * Verify the student actually practiced if/else and did not use early returns.
 */
class ChooseVehicle extends PublicApi {
  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
  }

  public get isOptimal(): boolean | undefined {
    if (this.implementation.params.length !== 2) {
      return false
    }
  }

  public get usesIfElse(): boolean | undefined {
    const body = this.implementation.body
    // Only block statements can be inspected. Use `undefined` to signal
    // the analyzer does not know if it uses if / else.
    if (body.type !== AST_NODE_TYPES.BlockStatement) {
      return undefined
    }
    const ifStatement = findFirst(
      body,
      (node): node is IfStatement => node.type === AST_NODE_TYPES.IfStatement
    )
    return Boolean(ifStatement?.alternate)
  }

  /**
   * Verify that the template literal ` is clearly the better choice`
   * only appears once.
   */
  public get isUsingSameTemplatedString(): boolean | undefined {
    const templateValue = ` is clearly the better choice.`

    // expression: "TemplateLiteral"
    return (
      // if there are multiple expressions we know the template literal appears
      // more than once
      findAll(
        this.implementation.body,
        (node): node is TSESTree.TemplateLiteral =>
          // type: "TemplateLiteral"
          node.type === AST_NODE_TYPES.TemplateLiteral
      ).filter((expression: TSESTree.TemplateLiteral) =>
        // quasis
        expression.quasis
          .map(
            // value: {raw: string; cooked: string}
            (templateElement: TSESTree.TemplateElement) =>
              templateElement.value.raw
          )
          // check for some in case there are other template literals used
          .some((value: string) => value.trim === templateValue.trim)
      ).length > 1
    )
  }

  /**
   * Verify that the literal string ` is clearly the better choice`
   * only appears once.
   */
  public get isUsingSameLiteralString(): boolean | undefined {
    const templateValue = ' is clearly the better choice.'

    // Literal
    return (
      findAll(
        this.implementation.body,
        (node): node is TSESTree.Literal =>
          // type: "Literal"
          node.type === AST_NODE_TYPES.Literal
      ).filter(
        (literal: TSESTree.Literal) =>
          // {value: string} - should it be value or raw?
          literal.value?.toString().trim === templateValue.trim
      ).length > 1
    )
  }
}

/**
 * Verify the student actually practiced if/else and did not use early returns.
 */
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

    return foundSuboptimalNode
  }

  public get usesIfElse(): boolean | undefined {
    const body = this.implementation.body
    // Only block statements can be inspected. Use `undefined` to signal
    // the analyzer does not know if it uses if / else.
    if (body.type !== AST_NODE_TYPES.BlockStatement) {
      return undefined
    }
    const ifStatement = findFirst(
      body,
      (node): node is IfStatement => node.type === AST_NODE_TYPES.IfStatement
    )
    return Boolean(ifStatement?.alternate)
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
