import {
  AstParser,
  extractExports,
  extractFunctions,
  findFirst,
  guardCallExpression,
  guardReturnBlockStatement,
  SpecificPropertyCall,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'

const GET_CARD_POSITION = 'getCardPosition'
const DOES_STACK_INCLUDE_CARD = 'doesStackIncludeCard'
const IS_EACH_CARD_EVEN = 'isEachCardEven'
const DOES_STACK_INCLUDE_ODD_CARD = 'doesStackIncludeOddCard'
const GET_FIRST_ODD_CARD = 'getFirstOddCard'
const GET_FIRST_EVEN_CARD_POSITION = 'getFirstEvenCardPosition'

/** getCardPosition
  export function getCardPosition(stack, card) {
    return stack.indexOf(card);
  }
  what do we analyze:
  2. two params
  3. return
  3. indexOf
**/
class CardPosition extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 2) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }
    return this.hasIndexOf
  }

  public get hasIndexOf(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'indexOf'> =>
          guardCallExpression(node, undefined, 'indexOf')
      ) !== undefined
    )
  }
}

/* doesStackIncludeCard */
class StackIncludesCard extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 2) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    return this.hasIncludes
  }

  public get hasIncludes(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'includes'> =>
          guardCallExpression(node, undefined, 'includes')
      ) !== undefined
    )
  }
}

/* isEachCardEven */
class CardsAreEven extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    return this.hasEvery
  }

  public get hasEvery(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'every'> =>
          guardCallExpression(node, undefined, 'every')
      ) !== undefined
    )
  }
}

/* doesStackIncludeOddCard */
class StackIncludesOdd extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    return this.hasSome
  }

  public get hasSome(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'some'> =>
          guardCallExpression(node, undefined, 'some')
      ) !== undefined
    )
  }
}

/* getFirstOddCard */
class FirstOddCard extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    return this.hasFind
  }

  public get hasFind(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'find'> =>
          guardCallExpression(node, undefined, 'find')
      ) !== undefined
    )
  }
}

/* getFirstEvenCardPosition */
class FirstEvenCard extends PublicApi {
  public get isOptimal(): boolean {
    if (this.implementation.params.length !== 1) {
      return false
    }

    const body = this.implementation.body
    if (!guardReturnBlockStatement(body)) {
      return false
    }

    return this.hasFindIndex
  }

  public get hasFindIndex(): boolean {
    return (
      findFirst(
        this.implementation.body,
        (node): node is SpecificPropertyCall<'findIndex'> =>
          guardCallExpression(node, undefined, 'findIndex')
      ) !== undefined
    )
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

  public get isOptimal(): boolean {
    return (
      this.cardPosition.isOptimal &&
      this.stackIncludesCard.isOptimal &&
      this.cardsAreEven.isOptimal &&
      this.stackIncludesCard.isOptimal &&
      this.firstOddCard.isOptimal &&
      this.firstEvenCard.isOptimal
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
