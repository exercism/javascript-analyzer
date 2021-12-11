import {
  AstParser,
  extractExports,
  extractFunctions,
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

/* getCardPosition */
class CardPosition extends PublicApi {
  public get isOptimal(): boolean {
    return true
  }
}

/* doesStackIncludeCard */
class StackIncludesCard extends PublicApi {
  public get isOptimal(): boolean {
    return true
  }
}

/* isEachCardEven */
class CardsAreEven extends PublicApi {
  public get isOptimal(): boolean {
    return true
  }
}

/* doesStackIncludeOddCard */
class StackIncludesOdd extends PublicApi {
  public get isOptimal(): boolean {
    return true
  }
}

/* getFirstOddCard */
class FirstOddCard extends PublicApi {
  public get isOptimal(): boolean {
    return true
  }
}

/* getFirstEvenCardPosition */
class FirstEvenCard extends PublicApi {
  public get isOptimal(): boolean {
    return true
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
