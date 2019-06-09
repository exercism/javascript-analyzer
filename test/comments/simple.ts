import { factory } from '~src/comments/comment'

describe(`Comment Factory (simple)`, () => {
  const templatable = factory`
    simple example
  `

  it('generates a templatable factory', () => {
    // Takes one argument
    expect(templatable).toBeInstanceOf(Function)
    expect(templatable).toHaveLength(1)
  })

  describe('templatable factory', () => {
    const parametarable = templatable('test.javascript.simple')

    it('generates a parametered comment factory', () => {
      expect(parametarable).toBeInstanceOf(Function)
    })

    describe('comment generation', () => {
      const comment = parametarable()

      it('generates the message', () => {
        expect(comment.message).toBe('simple example')
      })

      it('assigns the external template identifier', () => {
        expect(comment.externalTemplate).toBe('test.javascript.simple')
      })

      it('doesn\'t modify the original template', () => {
        expect(comment.template).toBe('simple example')
      })

      it('has an empty set of variables if none are passed', () => {
        expect(comment.variables).toEqual({})
      })
    })
  })

})
