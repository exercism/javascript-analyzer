import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
  findAll,
  findFirst,
  guardCallExpression,
  SpecificPropertyCall,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'

export const GET_CARD_POSITION = 'getCardPosition'
export const DOES_STACK_INCLUDE_CARD = 'doesStackIncludeCard'
export const IS_EACH_CARD_EVEN = 'isEachCardEven'
export const DOES_STACK_INCLUDE_ODD_CARD = 'doesStackIncludeOddCard'
export const GET_FIRST_ODD_CARD = 'getFirstOddCard'
export const GET_FIRST_EVEN_CARD_POSITION = 'getFirstEvenCardPosition'

/* getCardPosition */
class CardPosition extends PublicApi {
  public usesIndexOf: boolean

  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesIndexOf = usesCorrectArrayMethod(
      this.implementation.body,
      'indexOf'
    )
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
}

/* doesStackIncludeCard */
class StackIncludesCard extends PublicApi {
  public usesIncludes: boolean

  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesIncludes = usesCorrectArrayMethod(
      this.implementation.body,
      'includes'
    )
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
}

/* isEachCardEven */
class CardsAreEven extends PublicApi {
  public usesEvery: boolean

  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesEvery = usesCorrectArrayMethod(this.implementation.body, 'every')
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
}

/* doesStackIncludeOddCard */
class StackIncludesOdd extends PublicApi {
  public usesSome: boolean
  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesSome = usesCorrectArrayMethod(this.implementation.body, 'some')
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
}

/* getFirstOddCard */
class FirstOddCard extends PublicApi {
  public usesFind: boolean

  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesFind = usesCorrectArrayMethod(this.implementation.body, 'find')
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
}

/* getFirstEvenCardPosition */
class FirstEvenCard extends PublicApi {
  public usesFindIndex: boolean

  constructor(public readonly implementation: ExtractedFunction) {
    super(implementation)
    this.usesFindIndex = usesCorrectArrayMethod(
      this.implementation.body,
      'findIndex'
    )
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
}

export class ElysesAnalyticEnchantmentsSolution {
  private readonly source: Source

  public readonly cardPosition: CardPosition
  public readonly stackIncludesCard: StackIncludesCard
  public readonly cardsAreEven: CardsAreEven
  public readonly stackIncludesOdd: StackIncludesOdd
  public readonly firstOddCard: FirstOddCard
  public readonly firstEvenCard: FirstEvenCard

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.cardPosition = new CardPosition(
      assertPublicApi(GET_CARD_POSITION, exports, functions)
    )
    this.stackIncludesCard = new StackIncludesCard(
      assertPublicApi(DOES_STACK_INCLUDE_CARD, exports, functions)
    )
    this.cardsAreEven = new CardsAreEven(
      assertPublicApi(IS_EACH_CARD_EVEN, exports, functions)
    )
    this.stackIncludesOdd = new StackIncludesOdd(
      assertPublicApi(DOES_STACK_INCLUDE_ODD_CARD, exports, functions)
    )
    this.firstOddCard = new FirstOddCard(
      assertPublicApi(GET_FIRST_ODD_CARD, exports, functions)
    )
    this.firstEvenCard = new FirstEvenCard(
      assertPublicApi(GET_FIRST_EVEN_CARD_POSITION, exports, functions)
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

  public get hasImperativeLoop(): boolean {
    return (
      findAll(this.program, (node): node is SpecificPropertyCall<'forEach'> =>
        guardCallExpression(node, undefined, 'forEach')
      ).length !== 0 ||
      findAll(
        this.program,
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
      ).length !== 0
    )
  }
}

function usesCorrectArrayMethod(body: TSESTree.Node, method: string): boolean {
  return (
    findFirst(body, (node): node is SpecificPropertyCall<'${method}'> =>
      guardCallExpression(node, undefined, method)
    ) !== undefined
  )
}
