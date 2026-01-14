import {
  ExtractedExport,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findFirst,
  findTopLevelConstants,
  getProcessLogger,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  guardMemberExpression,
  ProgramConstant,
  ProgramConstants,
  SpecificPropertyCall,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { Source } from '~src/analyzers/SourceImpl'
import { parameterName } from '~src/analyzers/utils/extract_parameter'
import { assertNamedExport } from '~src/asserts/assert_named_export'
import { assertNamedFunction } from '~src/asserts/assert_named_function'
import { extractSignature } from '~src/extracts/extract_declaration'

type Node = TSESTree.Node
type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression

type MainExport = ReturnType<typeof extractExports>[number]

const EXPECTED_METHOD = 'colorCode'
const EXPECTED_EXPORT_METHOD = 'colorCode'
const EXPECTED_CONSTANT = 'COLORS'
const EXPECTED_EXPORT_CONSTANT = 'COLORS'

class Constant {
  public readonly name: string
  public readonly signature: string

  constructor(
    private readonly constant: Readonly<ProgramConstant>,
    source: Source
  ) {
    this.name =
      (constant && guardIdentifier(constant.id) && constant.id.name) ||
      '<NO-CONSTANT-NAME>'
    this.signature = source.getOuter(constant.parent || constant)
  }

  public get kind(): ProgramConstant['kind'] {
    return this.constant.kind
  }

  public get isOfKindConst(): boolean {
    return this.kind === 'const'
  }

  public get isOptimalArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    const literals = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    if (init.type === AST_NODE_TYPES.ArrayExpression) {
      // Each literal needs to be present, and needs to be present exactly in this order
      return init.elements.every((value, index): boolean =>
        guardLiteral(value, literals[index])
      )
    }

    return false
  }

  public get isObjectToArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if (!guardCallExpression(init, 'Object', 'keys')) {
      return false
    }

    const [argument, second] = init.arguments

    // TODO: check that referenced object is optimal
    return !second && guardIdentifier(argument)
  }

  public isOptimalObject(node = this.constant): boolean {
    if (!node || !node.init) {
      return false
    }

    if (node.init.type !== AST_NODE_TYPES.ObjectExpression) {
      return false
    }

    const keys = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    return node.init.properties.every((property, index): boolean => {
      return (
        property.type === AST_NODE_TYPES.Property &&
        guardLiteral(property.key, keys[index]) &&
        guardLiteral(property.value, index)
      )
    })
  }

  /**
   * In the case that the top-level constant is constructed from Object.keys(argument),
   * this property holds the name of the "argument".
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof Constant
   */
  public get referencedSourceObjectName(): string | undefined {
    const { init } = this.constant

    if (!init || !guardCallExpression(init, 'Object', 'keys')) {
      return undefined
    }

    const [argument, second] = init.arguments

    if (second || !guardIdentifier(argument)) {
      return undefined
    }

    return argument.name
  }

  public isOptimal(constants: ProgramConstants): boolean {
    return (
      this.isOfKindConst &&
      (this.isOptimalArray ||
        (this.isObjectToArray &&
          this.isOptimalObject(this.getReferencedObject(constants))))
    )
  }

  private getReferencedObject(
    constants: ProgramConstants
  ): ProgramConstant | undefined {
    const name = this.referencedSourceObjectName
    return constants.find(
      (constant): boolean =>
        constant && guardIdentifier(constant.id) && constant.id.name === name
    )
  }
}

class Entry {
  public readonly name: string
  public readonly signature: string

  private readonly params: readonly Parameter[]
  private readonly body: Node

  constructor(method: Readonly<ExtractedFunction>, source: Readonly<Source>) {
    this.name = method.name || EXPECTED_METHOD
    this.params = method.params
    this.body = method.body

    this.signature = extractSignature(method, source)
  }

  public get hasAtLeastOneParameter(): boolean {
    return this.params.length > 0
  }

  public get hasExactlyOneParameter(): boolean {
    return this.params.length === 1
  }

  public get hasSimpleParameter(): boolean {
    return guardIdentifier(this.params[0])
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public get hasFindIndex(): boolean {
    return (
      findFirst(this.body, (node): node is SpecificPropertyCall<'findIndex'> =>
        guardCallExpression(node, undefined, 'findIndex')
      ) !== undefined
    )
  }

  public get hasForEach(): boolean {
    return (
      findFirst(this.body, (node): node is SpecificPropertyCall<'forEach'> =>
        guardCallExpression(node, undefined, 'forEach')
      ) !== undefined
    )
  }

  public get hasFor(): boolean {
    return (
      findFirst(
        this.body,
        (
          node
        ): node is
          | TSESTree.ForInStatement
          | TSESTree.ForOfStatement
          | TSESTree.ForStatement =>
          [
            AST_NODE_TYPES.ForInStatement,
            AST_NODE_TYPES.ForOfStatement,
            AST_NODE_TYPES.ForStatement,
          ].some((type) => type === node.type)
      ) !== undefined
    )
  }

  public get hasIncludes(): boolean {
    return (
      findFirst(this.body, (node): node is SpecificPropertyCall<'includes'> =>
        guardCallExpression(node, undefined, 'includes')
      ) !== undefined
    )
  }

  public get hasToLowerCase(): boolean {
    return (
      findFirst(
        this.body,
        (node): node is SpecificPropertyCall<'toLowerCase'> =>
          guardCallExpression(node, undefined, 'toLowerCase')
      ) !== undefined
    )
  }

  public isOptimal(constant: Readonly<Constant> | undefined): boolean {
    const logger = getProcessLogger()
    const mainBody = this.body
    let argument: Node | null = null

    // If is not a simple return
    //
    if (mainBody.type !== AST_NODE_TYPES.ReturnStatement) {
      if (this.body.type !== AST_NODE_TYPES.BlockStatement) {
        logger.log(`~> body type is: ${this.body.type}`)
        argument = this.body
      } else {
        const finalStatement = this.body.body.slice().reverse()[0]

        if (finalStatement.type !== AST_NODE_TYPES.ReturnStatement) {
          logger.log(
            `~> body type is a block with the final statement type: ${finalStatement.type}`
          )
          return false
        }

        argument = finalStatement.argument
      }
    }

    if (!constant) {
      logger.log('~> constant not found')
      return false
    }

    if (!argument) {
      logger.log('~> no main body to process')
      return false
    }

    const result = this.isOptimalHelper(argument, constant)

    if (
      !constant.isOptimalArray &&
      !constant.isOptimalObject() &&
      argument &&
      [
        AST_NODE_TYPES.MemberExpression,
        AST_NODE_TYPES.CallExpression,
        AST_NODE_TYPES.ObjectExpression,
      ].includes(argument.type)
    ) {
      return true
    }

    return result

  }

  public isOptimalHelper(func: Node, constant: Readonly<Constant>): boolean {
    const logger = getProcessLogger()

    let body: Node | null

    switch (func.type) {
      case AST_NODE_TYPES.BlockStatement: {
        body = func.body[0]
        break
      }
      case AST_NODE_TYPES.ReturnStatement: {
        body = func.argument
        break
      }
      case AST_NODE_TYPES.CallExpression: {
        body = func
        break
      }
      case AST_NODE_TYPES.MemberExpression: {
        body = func
        break
      }
      default: {
        logger.log(`~> the helper type ${func.type} is not processable`)
        return false
      }
    }

    if (!body) {
      return false
    }

    if (constant.isOptimalArray) {
      logger.log('=> constant is optimal array')

      // Only looking for:
      //
      // COLORS.indexOf(param)
      return (
        (guardCallExpression(body, constant.name, 'indexOf') &&
          this.params.length === 1 &&
          guardIdentifier(this.params[0]) &&
          body.arguments.length === 1 &&
          guardIdentifier(body.arguments[0], this.parameterName)) ||
        false
      )
    }

    if (constant.isOptimalObject()) {
      logger.log('=> constant is optimal object')

      // Only looking for:
      //
      // REF_COLORS[param]
      return (
        (this.params.length === 1 &&
          guardIdentifier(this.params[0]) &&
          constant.referencedSourceObjectName &&
          guardMemberExpression(
            body,
            constant.referencedSourceObjectName,
            this.parameterName
          ) &&
          body.computed) ||
        false
      )
    }

    logger.log(`~> constant is not optimal`)

    return false
  }
}

export class ResistorColorSolution {
  public readonly source: Source

  private mainMethod: Entry
  private mainExports: {
    function: ExtractedExport
    constant: ExtractedExport
  }
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined

  constructor(public readonly program: Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.mainMethod = new Entry(
      assertNamedFunction(EXPECTED_METHOD, functions),
      this.source
    )
    this.mainExports = {
      function: assertNamedExport(EXPECTED_EXPORT_METHOD, exports),
      constant: assertNamedExport(EXPECTED_EXPORT_CONSTANT, exports),
    }

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, [
      'let',
      'const',
      'var',

      // TODO: bug in upstream
    ] as unknown as ['let']).filter(
      (declaration): boolean =>
        declaration &&
        guardIdentifier(declaration.id) &&
        declaration.id.name !== EXPECTED_METHOD
    )

    // Find expected name
    const expectedConstant =
      this.fileConstants.find((constant) =>
        guardIdentifier(constant.id, EXPECTED_CONSTANT)
      ) ||
      // Or find the first array or object assignment
      this.fileConstants.find(
        (constant) =>
          constant.init &&
          [
            AST_NODE_TYPES.ArrayExpression,
            AST_NODE_TYPES.ObjectExpression,
          ].indexOf(constant.init.type) === -1
      )

    this.mainConstant =
      (expectedConstant && new Constant(expectedConstant, this.source)) ||
      undefined
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get constant(): Readonly<Constant> {
    return this.mainConstant!
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.mainConstant)
  }

  public get areFileConstantsConst(): boolean {
    // const foo;
    // => kind: "const"
    //
    // let foo;
    // => kind: "let"
    //
    // var foo;
    // => kind: "var"
    //
    return this.fileConstants.every(
      (declaration): boolean => declaration.kind === 'const'
    )
  }

  public get hasInlineExports(): boolean {
    // export function value
    // => no specifiers
    //
    // export { value }
    // => yes specifiers
    //
    return (
      this.mainExports.function.exportKind === 'value' &&
      this.mainExports.constant.exportKind === 'value'
    )
  }

  public isOptimal(): boolean {
    return this.hasOptimalEntry
  }
}
