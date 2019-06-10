import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { extractExport } from "~src/analyzers/utils/extract_export";
import { findTopLevelConstants, ProgramConstant, ProgramConstants } from "../utils/find_top_level_constants";
import { isIdentifier } from "../utils/is_identifier";
import { NoMethodError } from "~src/errors/NoMethodError";
import { NoExportError } from "~src/errors/NoExportError";
import { extractMainBody, MainBody } from "../utils/extract_main_body";
import { isNewExpression } from "../utils/find_new_expression";
import { isBinaryExpression } from "../utils/is_binary_expression";
import { isCallExpression } from "../utils/is_call_expression";
import { parameterName } from "../utils/extract_parameter";
import { isAssignmentPattern } from "../utils/is_assignment_pattern";

type Program = TSESTree.Program
type Parameter = TSESTree.Parameter

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'gigasecond'
const EXPECTED_EXPORT = 'gigasecond'

export class GigasecondSolution {
  private mainMethod: Entry
  private mainExport: [NonNullable<MainExport[0]>, MainExport[1]]
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined

  constructor(readonly program: Program) {
    this.mainMethod = ensureExists(extractMainMethod(program, EXPECTED_METHOD))
    this.mainExport = ensureExported(extractExport(program, EXPECTED_EXPORT))

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, ['let', 'const', 'var'])
      .filter((declaration) => isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)

    this.mainConstant = this.fileConstants.length > 0 && new Constant(this.fileConstants[0]) || undefined
  }

  get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  get constant(): Readonly<Constant> | undefined {
    return this.mainConstant
  }

  get hasOneConstant(): boolean  {
    return this.fileConstants.length === 1
  }

  get hasOptimalConstant(): boolean  {
    return this.hasOneConstant && this.constant!.isOptimal()
  }

  get hasOptimalEntry(): boolean {
    return this.hasOneConstant && this.entry.isOptimal(this.constant!)
  }

  get areFileConstantsConst(): boolean  {
    return this.fileConstants.every((declaration) => declaration.kind === 'const')
  }

  get hasInlineExport(): boolean {
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return !this.mainExport[0].specifiers || this.mainExport[0].specifiers.length === 0
  }

  isOptimal(): boolean {
    return this.hasOptimalConstant && this.hasOptimalEntry
  }
}

class Entry {
  public readonly name: string

  private readonly params: ReadonlyArray<Parameter>;
  private readonly body: MainBody;

  constructor(method: Readonly<NonNullable<MainMethod>>) {
    this.name = (method.id && method.id.name) || EXPECTED_METHOD
    this.params = method.params
    this.body = extractMainBody(method)
  }

  get hasAtLeastOneParameter(): boolean {
    return this.params.length > 0
  }

  get hasExactlyOneParameter(): boolean {
    return this.params.length === 1
  }

  get hasSimpleParameter(): boolean {
    return isIdentifier(this.params[0])
  }

  get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  get parameterName(): string {
    return parameterName(this.params[0])
  }

  isOptimal(constant: Readonly<Constant>): boolean {

    // If is not a simple return
    //
    if(this.body.type !== AST_NODE_TYPES.ReturnStatement) {
      return false
    }

    // If we got here, it knows it's a return statement
    //
    // return ...
    //

    const { argument } = this.body
    if (!argument || !isNewExpression(argument, 'Date')) {
      return false
    }

    // If we got here, it knows it's a new expression of Date
    //
    // return new Date(...)
    //

    const { arguments: newDateParams } = argument

    // Make sure we're passing a single binary expression
    if (newDateParams.length !== 1) {
      return false
    }

    const [expression] = newDateParams
    if (!isBinaryExpression(expression, '+')) {
      return false
    }

    // If we got here, it knows it's a binary expression as parameter
    //
    // return new Date(a + b)
    //

    // One of the two sides needs to be the top-level constant
    //
    const identifier = isIdentifier(expression.left, constant.name)
      ? expression.left
      : isIdentifier(expression.right, constant.name) && expression.right

    // One of the two sides needs to be the argument.getTime call
    //
    const callExpression = isCallExpression(expression.left, this.parameterName, 'getTime')
      ? expression.left
      : isCallExpression(expression.right, this.parameterName, 'getTime') && expression.right

    return !!(identifier && callExpression)
  }
}

class Constant {
  public readonly name: string

  constructor(private readonly constant: Readonly<ProgramConstant>) {
    this.name = (isIdentifier(constant.id) && constant.id.name) || 'GIGASECOND_IN_MS'
  }

  get kind(): ProgramConstant['kind'] {
    return this.constant.kind
  }

  isOptimal(): boolean {
    // && isAssignmentPattern(this.constant!)
    //  && this.usesComprehension
    return isAssignmentPattern(this.constant)
  }
}

function ensureExists(method?: MainMethod<typeof EXPECTED_METHOD>): Entry {
  if (typeof method === 'undefined') {
    throw new NoMethodError(EXPECTED_METHOD)
  }
  return new Entry(method)
}

function ensureExported([declaration, node]: MainExport): [NonNullable<MainExport[0]>, MainExport[1]] {
  if (typeof declaration === 'undefined') {
    throw new NoExportError(EXPECTED_EXPORT)
  }
  return [declaration, node]
}
