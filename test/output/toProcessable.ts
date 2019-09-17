import { AnalyzerOutput } from  '~src/output/AnalyzerOutput'
import { factory } from '~src/comments/comment';

const COMMENT_WITHOUT_PARAMS_IDENTIFIER = 'javascript.test.output.to-processable.simple'
const COMMENT_WITH_PARAMS_IDENTIFIER = 'javascript.test.output.to-processable.parameters'

const COMMENT_SIMPLE = factory`
simple comment without parameters
`(COMMENT_WITHOUT_PARAMS_IDENTIFIER)

const COMMENT_PARAMETERS = factory<'foo' | 'bar'>`
${'foo'} is foo, given also ${'bar'}
`(COMMENT_WITH_PARAMS_IDENTIFIER)

const PARAMS = { foo: 'actual-foo', bar: 'actual-bar' }

describe('AnalyzerOutput#toProcessable', () => {
  describe('with noTemplates flag passed', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.add(COMMENT_PARAMETERS(PARAMS))
      output.approve()

      const result = await output.toProcessable({ noTemplates: true, pretty: false })
      expect(JSON.parse(result)).toEqual({
        status: 'approve',
        comments: [
          'simple comment without parameters',
          {
            comment: '%{foo} is foo, given also %{bar}',
            params: PARAMS
          }
        ]
      })
    })
  })

  describe('without noTemplates flag passed', () => {
    it('generates the correct output', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.add(COMMENT_PARAMETERS(PARAMS))
      output.approve()

      const result = await output.toProcessable({ noTemplates: false, pretty: false })
      expect(JSON.parse(result)).toEqual({
        status: 'approve',
        comments: [
          COMMENT_WITHOUT_PARAMS_IDENTIFIER,
          {
            comment: COMMENT_WITH_PARAMS_IDENTIFIER,
            params: PARAMS
          }
        ]
      })
    })
  })

  describe('when approved without comments', () => {
    it('outputs the correct status', async () => {
      const output = new AnalyzerOutput()
      output.approve()

      const result = await output.toProcessable({ noTemplates: false, pretty: false })
      expect(JSON.parse(result)).toMatchObject({ status: 'approve' })

    })
  })

  describe('when approved with comments', () => {
    it('outputs the correct status', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.approve()

      const result = await output.toProcessable({ noTemplates: false, pretty: false })
      expect(JSON.parse(result)).toMatchObject({ status: 'approve' })
    })
  })

  describe('when disapproved with comments', () => {
    it('outputs the correct status', async () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT_SIMPLE())
      output.disapprove()

      const result = await output.toProcessable({ noTemplates: false, pretty: false })
      expect(JSON.parse(result)).toMatchObject({ status: 'disapprove' })
    })
  })

  describe('when redirected', () => {
    it('outputs the correct status', async () => {
      const output = new AnalyzerOutput()
      output.redirect()

      const result = await output.toProcessable({ noTemplates: false, pretty: false })
      expect(JSON.parse(result)).toMatchObject({ status: 'refer_to_mentor' })
    })
  })
})
