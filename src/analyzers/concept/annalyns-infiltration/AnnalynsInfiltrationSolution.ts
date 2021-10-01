import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findFirst,
  findFirstOfType,
  guardBinaryExpression,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  guardLogicalExpression,
  guardReturnBlockStatement,
  guardUnaryExpression,
} from '@exercism/static-analysis'
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'
import { parameterName } from '../../utils/extract_parameter'

export const CAN_EXECUTE_FAST_ATTACK = 'canExecuteFastAttack'
export const CAN_SPY = 'canSpy'
export const CAN_SIGNAL_PRISONER = 'canSignalPrisoner'
export const CAN_FREE_PRISONER = 'canFreePrisoner'

class FastAttack extends PublicApi {
  public get knightIsAwakeParameter(): string {
    return this.parameter
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    const body = this.implementation.body

    if (!guardReturnBlockStatement(body)) {
      return false
    }

    const statement = body.body[0].argument!

    if (!guardUnaryExpression(statement, '!')) {
      return false
    }

    // !knightIsAwake
    return guardIdentifier(statement.argument, this.knightIsAwakeParameter)
  }

  public get hasConditional(): boolean {
    return !!findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.IfStatement
    )
  }

  public get hasLiteralBoolean(): boolean {
    const literal = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.Literal
    )
    return (
      Boolean(literal) &&
      Boolean(guardLiteral(literal!, true) || guardLiteral(literal!, false))
    )
  }

  public get hasBooleanCast(): boolean {
    const callExpression = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.CallExpression
    )
    return !!callExpression && guardCallExpression(callExpression, 'Boolean')
  }
}

class Spy extends PublicApi {
  public get knightIsAwakeParameter(): string {
    return this.parameter
  }

  public readonly archerIsAwakeParameter: string
  public readonly prisonerIsAwakeParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.archerIsAwakeParameter = parameterName(this.implementation.params[1])
    this.prisonerIsAwakeParameter = parameterName(this.implementation.params[2])
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 3) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    // a || b || c
    const statement = body.body[0].argument!
    return (
      guardLogicalExpression(statement, '||') &&
      guardLogicalExpression(statement.left, '||') &&
      guardIdentifier(statement.right) &&
      guardIdentifier(statement.left.left) &&
      guardIdentifier(statement.left.right)
    )
  }

  public get hasConditional(): boolean {
    return !!findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.IfStatement
    )
  }

  public get hasLiteralBoolean(): boolean {
    const literal = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.Literal
    )
    return (
      Boolean(literal) &&
      Boolean(guardLiteral(literal!, true) || guardLiteral(literal!, false))
    )
  }

  public get hasBitwise(): boolean {
    return !!findFirst(
      this.implementation.body,
      (node): node is TSESTree.Node =>
        guardBinaryExpression(node, '&') || guardBinaryExpression(node, '|')
    )
  }

  public get hasBooleanCast(): boolean {
    const callExpression = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.CallExpression
    )
    return !!callExpression && guardCallExpression(callExpression, 'Boolean')
  }
}

class SignalPrisoner extends PublicApi {
  public get archerIsAwakeParameter(): string {
    return this.parameter
  }

  public readonly prisonerIsAwakeParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.prisonerIsAwakeParameter = parameterName(this.implementation.params[1])
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 2) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    // !archerIsAwake && prisonerIsAwake
    const statement = body.body[0].argument!
    if (
      guardLogicalExpression(statement, '&&') &&
      guardUnaryExpression(statement.left, '!') &&
      guardIdentifier(statement.left.argument, this.archerIsAwakeParameter) &&
      guardIdentifier(statement.right, this.prisonerIsAwakeParameter)
    ) {
      return true
    }

    // prisonerIsAwake && !archerIsAwake
    if (
      guardLogicalExpression(statement, '&&') &&
      guardUnaryExpression(statement.right, '!') &&
      guardIdentifier(statement.right.argument, this.archerIsAwakeParameter) &&
      guardIdentifier(statement.left, this.prisonerIsAwakeParameter)
    ) {
      return true
    }

    return false
  }

  public get hasConditional(): boolean {
    return !!findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.IfStatement
    )
  }

  public get hasLiteralBoolean(): boolean {
    const literal = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.Literal
    )
    return (
      Boolean(literal) &&
      Boolean(guardLiteral(literal!, true) || guardLiteral(literal!, false))
    )
  }

  public get hasBitwise(): boolean {
    return !!findFirst(
      this.implementation.body,
      (node): node is TSESTree.Node =>
        guardBinaryExpression(node, '&') || guardBinaryExpression(node, '|')
    )
  }

  public get hasBooleanCast(): boolean {
    const callExpression = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.CallExpression
    )
    return !!callExpression && guardCallExpression(callExpression, 'Boolean')
  }
}

class FreePrisoner extends PublicApi {
  public get knightIsAwakeParameter(): string {
    return this.parameter
  }

  public readonly archerIsAwakeParameter: string
  public readonly prisonerIsAwakeParameter: string
  public readonly petDogIsPresentParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.archerIsAwakeParameter = parameterName(this.implementation.params[1])
    this.prisonerIsAwakeParameter = parameterName(this.implementation.params[2])
    this.petDogIsPresentParameter = parameterName(this.implementation.params[3])
  }

  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 4) {
      return false
    }

    const body = this.implementation.body

    //
    // (!knightIsAwake && !archerIsAwake && prisonerIsAwake) ||
    //   (petDogIsPresent && !archerIsAwake)
    //
    if (
      guardReturnBlockStatement(body) &&
      guardLogicalExpression(body.body[0].argument!, '||')
    ) {
      const { left, right } = body.body[0].argument

      if (!guardLogicalExpression(left, '&&')) {
        return false
      }

      if (!guardLogicalExpression(right, '&&')) {
        return false
      }

      const leftIsCompound = guardLogicalExpression(left.left, '&&')
      const rightIsCompound = guardLogicalExpression(right.left, '&&')

      if (!leftIsCompound && !rightIsCompound) {
        return false
      }

      // ... && ...
      const dogConditional = rightIsCompound ? left : right

      // petDogIsPresent
      if (
        !guardLiteral(dogConditional.left, this.petDogIsPresentParameter) &&
        !guardLiteral(dogConditional.right, this.petDogIsPresentParameter)
      ) {
        return false
      }

      // !archerIsAwake
      if (
        (!guardUnaryExpression(dogConditional.left, '!') ||
          !guardLiteral(
            dogConditional.left.argument,
            this.archerIsAwakeParameter
          )) &&
        (!guardUnaryExpression(dogConditional.right, '!') ||
          !guardLiteral(
            dogConditional.right.argument,
            this.archerIsAwakeParameter
          ))
      ) {
        return false
      }

      // ... && ... && ...
      const compoundBody = leftIsCompound ? left : right

      if (
        !compoundBody ||
        !guardLogicalExpression(compoundBody, '&&') ||
        !guardLogicalExpression(compoundBody.left, '&&')
      ) {
        return false
      }

      const a = compoundBody.left.left
      const b = compoundBody.left.right
      const c = compoundBody.right

      // prisonerIsAwake
      if (
        !(
          guardIdentifier(a, this.prisonerIsAwakeParameter) ||
          guardIdentifier(b, this.prisonerIsAwakeParameter) ||
          guardIdentifier(c, this.prisonerIsAwakeParameter)
        )
      ) {
        return false
      }

      // !archerIsAwake
      if (
        !(
          (guardUnaryExpression(a, '!') &&
            guardIdentifier(a.argument, this.archerIsAwakeParameter)) ||
          (guardUnaryExpression(b, '!') &&
            guardIdentifier(b.argument, this.archerIsAwakeParameter)) ||
          (guardUnaryExpression(c, '!') &&
            guardIdentifier(c.argument, this.archerIsAwakeParameter))
        )
      ) {
        return false
      }

      // !knightIsAwake
      if (
        !(
          (guardUnaryExpression(a, '!') &&
            guardIdentifier(a.argument, this.knightIsAwakeParameter)) ||
          (guardUnaryExpression(b, '!') &&
            guardIdentifier(b.argument, this.knightIsAwakeParameter)) ||
          (guardUnaryExpression(c, '!') &&
            guardIdentifier(c.argument, this.knightIsAwakeParameter))
        )
      ) {
        return false
      }

      return true
    }

    // if (petDogIsPresent) {
    //   return !archerIsAwake;
    // }
    //
    // return prisonerIsAwake && !archerIsAwake && !knightIsAwake
    if (body.type === AST_NODE_TYPES.BlockStatement && body.body.length === 2) {
      const [dogConditional, compound] = body.body

      // if (petDogIsPresent)
      if (
        dogConditional.type !== AST_NODE_TYPES.IfStatement ||
        !guardIdentifier(dogConditional.test, this.petDogIsPresentParameter)
      ) {
        return false
      }

      // {
      //   return ...
      // }
      if (!guardReturnBlockStatement(dogConditional.consequent)) {
        return false
      }

      // !archerIsAwake
      const dogConditionalBody = dogConditional.consequent.body[0].argument
      if (
        !dogConditionalBody ||
        !guardUnaryExpression(dogConditionalBody, '!') ||
        !guardIdentifier(
          dogConditionalBody.argument,
          this.archerIsAwakeParameter
        )
      ) {
        return false
      }

      // return ...
      if (compound.type !== AST_NODE_TYPES.ReturnStatement) {
        return false
      }

      // ... && ... && ...
      const compoundBody = compound.argument
      if (
        !compoundBody ||
        !guardLogicalExpression(compoundBody, '&&') ||
        !guardLogicalExpression(compoundBody.left, '&&')
      ) {
        return false
      }

      const a = compoundBody.left.left
      const b = compoundBody.left.right
      const c = compoundBody.right

      // prisonerIsAwake
      if (
        !(
          guardIdentifier(a, this.prisonerIsAwakeParameter) ||
          guardIdentifier(b, this.prisonerIsAwakeParameter) ||
          guardIdentifier(c, this.prisonerIsAwakeParameter)
        )
      ) {
        return false
      }

      // !archerIsAwake
      if (
        !(
          (guardUnaryExpression(a, '!') &&
            guardIdentifier(a.argument, this.archerIsAwakeParameter)) ||
          (guardUnaryExpression(b, '!') &&
            guardIdentifier(b.argument, this.archerIsAwakeParameter)) ||
          (guardUnaryExpression(c, '!') &&
            guardIdentifier(c.argument, this.archerIsAwakeParameter))
        )
      ) {
        return false
      }

      // !knightIsAwake
      if (
        !(
          (guardUnaryExpression(a, '!') &&
            guardIdentifier(a.argument, this.knightIsAwakeParameter)) ||
          (guardUnaryExpression(b, '!') &&
            guardIdentifier(b.argument, this.knightIsAwakeParameter)) ||
          (guardUnaryExpression(c, '!') &&
            guardIdentifier(c.argument, this.knightIsAwakeParameter))
        )
      ) {
        return false
      }

      return true
    }

    return false
  }

  public get hasLiteralBoolean(): boolean {
    const literal = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.Literal
    )
    return (
      Boolean(literal) &&
      Boolean(guardLiteral(literal!, true) || guardLiteral(literal!, false))
    )
  }

  public get hasBitwise(): boolean {
    return !!findFirst(
      this.implementation.body,
      (node): node is TSESTree.Node =>
        guardBinaryExpression(node, '&') || guardBinaryExpression(node, '|')
    )
  }

  public get hasBooleanCast(): boolean {
    const callExpression = findFirstOfType(
      this.implementation.body,
      AST_NODE_TYPES.CallExpression
    )
    return !!callExpression && guardCallExpression(callExpression, 'Boolean')
  }
}

export class AnnalynsInfiltrationSolution {
  private readonly source: Source

  public readonly fastAttack: FastAttack
  public readonly spy: Spy
  public readonly signalPrisoner: SignalPrisoner
  public readonly freePrisoner: FreePrisoner

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.fastAttack = new FastAttack(
      assertPublicApi(CAN_EXECUTE_FAST_ATTACK, exports, functions)
    )

    this.spy = new Spy(assertPublicApi(CAN_SPY, exports, functions))

    this.signalPrisoner = new SignalPrisoner(
      assertPublicApi(CAN_SIGNAL_PRISONER, exports, functions)
    )

    this.freePrisoner = new FreePrisoner(
      assertPublicApi(CAN_FREE_PRISONER, exports, functions)
    )
  }

  public get isOptimal(): boolean {
    return (
      this.fastAttack.isOptimal &&
      this.spy.isOptimal &&
      this.signalPrisoner.isOptimal &&
      this.freePrisoner.isOptimal
    )
  }

  public get hasLiteralBoolean(): boolean {
    return (
      this.fastAttack.hasLiteralBoolean ||
      this.spy.hasLiteralBoolean ||
      this.signalPrisoner.hasLiteralBoolean ||
      this.freePrisoner.hasLiteralBoolean
    )
  }

  public get hasBooleanCast(): boolean {
    return (
      this.fastAttack.hasBooleanCast ||
      this.spy.hasBooleanCast ||
      this.signalPrisoner.hasBooleanCast ||
      this.freePrisoner.hasBooleanCast
    )
  }

  public get hasBitwise(): boolean {
    return (
      this.spy.hasBitwise ||
      this.signalPrisoner.hasBitwise ||
      this.freePrisoner.hasBitwise
    )
  }

  public get hasUnnecessaryConditional(): boolean {
    return (
      this.fastAttack.hasConditional ||
      this.spy.hasConditional ||
      this.signalPrisoner.hasConditional
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
