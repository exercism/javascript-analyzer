import { AnalyzerOutput } from '~src/output/AnalyzerOutput'
import { factory } from '~src/comments/comment'

const COMMENT_TEMPLATE_IDENTIFIER = 'javascript.test.output'
const COMMENT = factory`something to test with`(COMMENT_TEMPLATE_IDENTIFIER)

describe('AnalyzerOutput', () => {
  describe('when unchanged', () => {
    it('has no summary', () => {
      const output = new AnalyzerOutput()
      expect(output.summary).toBeUndefined()
    })

    it('has no comments', () => {
      const output = new AnalyzerOutput()
      expect(output.comments).toEqual([])
    })
  })

  describe('when adding multiple comments', () => {
    const output = new AnalyzerOutput()
    output.add(COMMENT())
    output.add(COMMENT())

    it('has those comments', () => {
      expect(output.comments).toHaveLength(2)
      expect(output.comments[0]).toMatchObject({
        externalTemplate: COMMENT_TEMPLATE_IDENTIFIER,
      })
      expect(output.comments[1]).toMatchObject({
        externalTemplate: COMMENT_TEMPLATE_IDENTIFIER,
      })
    })
  })
})
