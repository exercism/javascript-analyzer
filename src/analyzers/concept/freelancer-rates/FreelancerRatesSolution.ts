import type { ExtractedFunction } from '@exercism/static-analysis'
import {
  AstParser,
  extractExports,
  extractFunctions,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'node:fs'
import { Source } from '~src/analyzers/SourceImpl.js'
import { exemplarPath } from '~src/analyzers/utils/config.js'
import { assertPublicApi } from '~src/asserts/assert_public_api.js'
import { PublicApi } from '../../PublicApi.js'
import { parameterName } from '../../utils/extract_parameter.js'

export const DAY_RATE = 'dayRate'
export const MONTH_RATE = 'priceWithMonthlyDiscount'
export const DAYS_IN_BUDGET = 'daysInBudget'

class DayRate extends PublicApi {
  public get ratePerHourParameter(): string {
    return this.parameter
  }

  // return ratePerHour * 8;
  // return 8 * ratePerHour;
  // return ratePerHour * HOURS_IN_DAY;
  // return HOURS_IN_DAY * ratePerHour;
}

class DaysInBudget extends PublicApi {
  public get budgetParameter(): string {
    return this.parameter
  }

  public readonly ratePerHourParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.ratePerHourParameter = parameterName(this.implementation.params[1])
  }

  // return Math.floor(budget / dayRate(ratePerHour));
}

class MonthRate extends PublicApi {
  public get ratePerHourParameter(): string {
    return this.parameter
  }

  public readonly daysParameter: string
  public readonly discountParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.daysParameter = parameterName(this.implementation.params[1])
    this.discountParameter = parameterName(this.implementation.params[2])
  }

  // Expect ceil
}

export class FreelancerRatesSolution {
  private readonly source: Source

  public readonly dayRate: DayRate
  public readonly monthRate: MonthRate
  public readonly daysInBudget: DaysInBudget

  private exemplar!: Source

  constructor(
    public readonly program: TSESTree.Program,
    source: string
  ) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.dayRate = new DayRate(assertPublicApi(DAY_RATE, exports, functions))

    this.monthRate = new MonthRate(
      assertPublicApi(MONTH_RATE, exports, functions)
    )

    this.daysInBudget = new DaysInBudget(
      assertPublicApi(DAYS_IN_BUDGET, exports, functions)
    )
  }

  public readExemplar(directory: string): void {
    this.exemplar = new Source(readFileSync(exemplarPath(directory)).toString())
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
