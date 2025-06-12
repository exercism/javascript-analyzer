import { describe, expect, it } from '@jest/globals'
import { factory } from '~src/comments/comment.js'

describe(`Comment Factory (simple)`, () => {
  const templatable = factory`
    simple example
  `

  it('generates a templatable factory', () => {
    // Takes two arguments
    expect(templatable).toBeInstanceOf(Function)
    expect(templatable).toHaveLength(2)
  })

  describe('templatable factory', () => {
    const parametrizable = templatable('test.javascript.simple')

    it('generates a parametrized comment factory', () => {
      expect(parametrizable).toBeInstanceOf(Function)
    })

    describe('comment generation', () => {
      const comment = parametrizable()

      it('generates the message', () => {
        expect(comment.message).toBe('simple example')
      })

      it('assigns the external template identifier', () => {
        expect(comment.externalTemplate).toBe('test.javascript.simple')
      })

      it("doesn't modify the original template", () => {
        expect(comment.template).toBe('simple example')
      })

      it('has an empty set of variables if none are passed', () => {
        expect(comment.variables).toEqual({})
      })
    })
  })
})
