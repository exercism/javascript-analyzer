import { AnalyzerOutput } from '~src/output/AnalyzerOutput'
import { CommentType, factory } from '~src/comments/comment'

const COMMENT_WITHOUT_PARAMS_IDENTIFIER =
  'javascript.test.output.to-processable.simple'
const COMMENT_WITH_PARAMS_IDENTIFIER =
  'javascript.test.output.to-processable.parameters'

const COMMENT_SIMPLE = factory`
simple comment without parameters
`(COMMENT_WITHOUT_PARAMS_IDENTIFIER)

const COMMENT_PARAMETERS = factory<'foo' | 'bar'>`
${'foo'} is foo, given also ${'bar'}
`(COMMENT_WITH_PARAMS_IDENTIFIER)

const COMMENT_BLOCKING_IDENTIFIER = 'javascript.test.blocking'
const COMMENT_ACTIONABLE_IDENTIFIER = 'javascript.test.actionable'
const COMMENT_INFORMATIVE_IDENTIFIER = 'javascript.test.informative'
const COMMENT_PARTY_IDENTIFIER = 'javascript.test.party'

const COMMENT_BLOCKING = factory`
YOU. SHALL. NOT. PAAAAAAAS.
`(COMMENT_BLOCKING_IDENTIFIER, CommentType.Essential)

const COMMENT_ACTIONABLE = factory`
X ALL THE Y
`(COMMENT_ACTIONABLE_IDENTIFIER, CommentType.Actionable)

const COMMENT_INFORMATIVE = factory`
wElL AcKtUaLlY
`(COMMENT_INFORMATIVE_IDENTIFIER, CommentType.Informative)

const COMMENT_PARTY = factory`
Winner Winner. Chicken Dinner.
`(COMMENT_PARTY_IDENTIFIER, CommentType.Celebratory)

const PARAMS = { foo: 'actual-foo', bar: 'actual-bar' }

describe('AnalyzerOutput#toProcessable', () => {
  describe('with noTemplates flag passed', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.add(COMMENT_PARAMETERS(PARAMS))
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: true,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          { comment: 'simple comment without parameters', type: 'informative' },
          {
            comment: '%{foo} is foo, given also %{bar}',
            params: PARAMS,
            type: 'informative',
          },
        ],
      })
    })
  })

  describe('without noTemplates flag passed', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.add(COMMENT_PARAMETERS(PARAMS))
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          { comment: COMMENT_WITHOUT_PARAMS_IDENTIFIER, type: 'informative' },
          {
            comment: COMMENT_WITH_PARAMS_IDENTIFIER,
            params: PARAMS,
            type: 'informative',
          },
        ],
      })
    })
  })

  describe('with a blocking comment', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_BLOCKING())
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          {
            comment: COMMENT_BLOCKING_IDENTIFIER,
            type: 'essential',
          },
        ],
      })
    })
  })

  describe('with an actionable comment', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_ACTIONABLE())
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          {
            comment: COMMENT_ACTIONABLE_IDENTIFIER,
            type: 'actionable',
          },
        ],
      })
    })
  })

  describe('with an informative comment', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_INFORMATIVE())
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          {
            comment: COMMENT_INFORMATIVE_IDENTIFIER,
            type: 'informative',
          },
        ],
      })
    })
  })

  describe('with an informative comment', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_PARTY())
      output.freeze()

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        comments: [
          {
            comment: COMMENT_PARTY_IDENTIFIER,
            type: 'celebratory',
          },
        ],
      })
    })
  })

  describe('with multiple comments and a summary', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_BLOCKING())
      output.add(COMMENT_ACTIONABLE())
      output.add(COMMENT_INFORMATIVE())
      output.add(COMMENT_PARTY())
      output.freeze('Here is a lot of commentary')

      const result = await output.toProcessable({
        noTemplates: false,
        pretty: false,
      })
      expect(JSON.parse(result)).toEqual({
        summary: 'Here is a lot of commentary',
        comments: [
          {
            comment: COMMENT_BLOCKING_IDENTIFIER,
            type: 'essential',
          },
          {
            comment: COMMENT_ACTIONABLE_IDENTIFIER,
            type: 'actionable',
          },
          {
            comment: COMMENT_INFORMATIVE_IDENTIFIER,
            type: 'informative',
          },
          {
            comment: COMMENT_PARTY_IDENTIFIER,
            type: 'celebratory',
          },
        ],
      })
    })
  })
})
