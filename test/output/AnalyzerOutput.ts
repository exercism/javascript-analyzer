import { AnalyzerOutput } from  '~src/output/AnalyzerOutput'
import { factory } from '~src/comments/comment';

const COMMENT_TEMPLATE_IDENTIFIER = 'javascript.test.output'
const COMMENT = factory`something to test with`(COMMENT_TEMPLATE_IDENTIFIER)

describe('AnalyzerOutput', () => {
  describe('when unchanged', () => {
    it('refers to mentor', () => {
      const output = new AnalyzerOutput()
      expect(output.status).toBe('refer_to_mentor')
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
      expect(output.comments[0]).toMatchObject({ externalTemplate: COMMENT_TEMPLATE_IDENTIFIER })
      expect(output.comments[1]).toMatchObject({ externalTemplate: COMMENT_TEMPLATE_IDENTIFIER })
    })
  })

  describe('when approved', () => {
    describe('without a comment', () => {
      const output = new AnalyzerOutput()
      output.approve()

      it('approves as optimal', () => {
        expect(output.status).toBe('approve')
      })

      it('has no comments', () => {
        expect(output.comments).toEqual([])
      })
    })

    describe('with a pre-existing comment', () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT())
      output.approve()

      it('approves with comment', () => {
        expect(output.status).toBe('approve')
      })

      it('has that comment', () => {
        expect(output.comments).toHaveLength(1)
        expect(output.comments[0]).toMatchObject({ externalTemplate: COMMENT_TEMPLATE_IDENTIFIER })
      })
    })

    it('can not be approved again', () => {
      const output = new AnalyzerOutput()
      output.approve()

      expect(output.approve).toThrow()
    })

    it('can not add more comments', () => {
      const output = new AnalyzerOutput()
      output.approve()

      expect(() => output.add(COMMENT())).toThrow()
    })

    it('can not disapprove', () => {
      const output = new AnalyzerOutput()
      output.approve()

      expect(() => output.disapprove()).toThrow()
    })

    it('can not redirect', () => {
      const output = new AnalyzerOutput()
      output.approve()

      expect(() => output.redirect()).toThrow()
    })
  })

  describe('when disapproved', () => {
    describe('without a comment', () => {
      const output = new AnalyzerOutput()
      output.disapprove()

      it('disapproves with comment', () => {
        expect(output.status).toBe('disapprove')
      })

      it('has no comments', () => {
        expect(output.comments).toEqual([])
      })
    })

    describe('with a pre-existing comment', () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT())
      output.disapprove()

      it('disapproves with comment', () => {
        expect(output.status).toBe('disapprove')
      })

      it('has that comment', () => {
        expect(output.comments).toHaveLength(1)
        expect(output.comments[0]).toMatchObject({ externalTemplate: COMMENT_TEMPLATE_IDENTIFIER })
      })
    })

    it('can not be approved', () => {
      const output = new AnalyzerOutput()
      output.disapprove()

      expect(output.approve).toThrow()
    })

    it('can not add more comments', () => {
      const output = new AnalyzerOutput()
      output.disapprove()

      expect(() => output.add(COMMENT())).toThrow()
    })

    it('can not disapprove again', () => {
      const output = new AnalyzerOutput()
      output.disapprove()

      expect(() => output.disapprove()).toThrow()
    })

    it('can not redirect', () => {
      const output = new AnalyzerOutput()
      output.disapprove()

      expect(() => output.redirect()).toThrow()
    })
  })

  describe('when redirected', () => {
    describe('without a comment', () => {
      const output = new AnalyzerOutput()
      output.redirect()

      it('refers to mentor', () => {
        expect(output.status).toBe('refer_to_mentor')
      })

      it('has no comments', () => {
        expect(output.comments).toEqual([])
      })
    })

    describe('with a pre-existing comment', () => {
      const output = new AnalyzerOutput()
      output.add(COMMENT())
      output.redirect()

      it('refers to mentor', () => {
        expect(output.status).toBe('refer_to_mentor')
      })

      it('has that comment', () => {
        expect(output.comments).toHaveLength(1)
        expect(output.comments[0]).toMatchObject({ externalTemplate: COMMENT_TEMPLATE_IDENTIFIER })
      })
    })

    it('can not be approved', () => {
      const output = new AnalyzerOutput()
      output.redirect()

      expect(output.approve).toThrow()
    })

    it('can not add more comments', () => {
      const output = new AnalyzerOutput()
      output.redirect()

      expect(() => output.add(COMMENT())).toThrow()
    })

    it('can not disapprove', () => {
      const output = new AnalyzerOutput()
      output.redirect()

      expect(() => output.disapprove()).toThrow()
    })

    it('can not redirect again', () => {
      const output = new AnalyzerOutput()
      output.redirect()

      expect(() => output.redirect()).toThrow()
    })
  })
})
