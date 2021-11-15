import {
  AstParser,
  ExtractedFunction,
  extractExports,
  extractFunctions,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { readFileSync } from 'fs'
import path from 'path'
import { Source } from '~src/analyzers/SourceImpl'
import { assertPublicApi } from '~src/asserts/assert_public_api'
import { PublicApi } from '../../PublicApi'
import { parameterName } from '../../utils/extract_parameter'

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
  public readonly discountParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.ratePerHourParameter = parameterName(this.implementation.params[1])
    this.discountParameter = parameterName(this.implementation.params[2])
  }

  // return Math.floor(budget / dayRate(ratePerHour));
}

class MonthRate extends PublicApi {
  public get ratePerHourParameter(): string {
    return this.parameter
  }

  public readonly discountParameter: string

  constructor(implementation: ExtractedFunction) {
    super(implementation)

    this.discountParameter = parameterName(this.implementation.params[1])
  }

  // Expect ceil
}

export class FreelancerRatesSolution {
  private readonly source: Source

  public readonly dayRate: DayRate
  public readonly monthRate: MonthRate
  public readonly daysInBudget: DaysInBudget

  private exemplar!: Source

  constructor(public readonly program: TSESTree.Program, source: string) {
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
