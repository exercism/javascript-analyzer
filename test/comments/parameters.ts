import { describe, expect, it } from '@jest/globals'
import { factory } from '~src/comments/comment.js'

describe(`Comment Factory (with parameters)`, () => {
  const templatable = factory<'foo' | 'bar'>`
This is a message with parameters:
---
foo => ${`foo`}.
  positional => [${0}, ${1}, ${2}]
    bar => ${`bar`}
  foo (again) => ${`foo`}
with some indentation
  `

  it('generates a templatable factory', () => {
    // Takes two arguments
    expect(templatable).toBeInstanceOf(Function)
    expect(templatable).toHaveLength(2)
  })

  describe('templatable factory', () => {
    const parametrizable = templatable('test.javascript.parameters')

    it('generates a parameterized comment factory', () => {
      expect(parametrizable).toBeInstanceOf(Function)
    })

    describe('comment generation', () => {
      describe('when passing no parameters', () => {
        const comment = parametrizable([])

        it('generates the message with template placeholders', () => {
          expect(comment.message).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('assigns the external template identifier', () => {
          expect(comment.externalTemplate).toBe('test.javascript.parameters')
        })

        it('gives the original template with template variables', () => {
          expect(comment.template).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('has an empty set of variables if none are passed', () => {
          expect(comment.variables).toEqual({})
        })
      })

      describe('when passing all named parameters', () => {
        const comment = parametrizable({
          foo: 'actual-foo',
          bar: 'actual-bar',
        })

        it('generates the message', () => {
          expect(comment.message).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => actual-foo.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => actual-bar',
              '  foo (again) => actual-foo',
              'with some indentation',
            ].join('\n')
          )
        })

        it('assigns the external template identifier', () => {
          expect(comment.externalTemplate).toBe('test.javascript.parameters')
        })

        it('gives the original template with template variables', () => {
          expect(comment.template).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('has the set of variables passed', () => {
          expect(comment.variables).toEqual({
            foo: 'actual-foo',
            bar: 'actual-bar',
          })
        })
      })

      describe('when passing some positional parameters', () => {
        const comment = parametrizable('actual-foo', 'actual-bar')

        it('generates the message', () => {
          expect(comment.message).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [actual-foo, actual-bar, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('assigns the external template identifier', () => {
          expect(comment.externalTemplate).toBe('test.javascript.parameters')
        })

        it('gives the original template with template variables', () => {
          expect(comment.template).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('has the array of positional parameters', () => {
          expect(comment.variables).toEqual({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            0: 'actual-foo',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            1: 'actual-bar',
          })
        })
      })

      describe('when passing all parameters', () => {
        const comment = parametrizable(['posi-foo', 'posi-bar', 'posi-baz'], {
          foo: 'name-foo',
          bar: 'name-bar',
        })

        it('generates the message', () => {
          expect(comment.message).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => name-foo.',
              '  positional => [posi-foo, posi-bar, posi-baz]',
              '    bar => name-bar',
              '  foo (again) => name-foo',
              'with some indentation',
            ].join('\n')
          )
        })

        it('assigns the external template identifier', () => {
          expect(comment.externalTemplate).toBe('test.javascript.parameters')
        })

        it('gives the original template with template variables', () => {
          expect(comment.template).toBe(
            [
              'This is a message with parameters:',
              '---',
              'foo => %{foo}.',
              '  positional => [%0$s, %1$s, %2$s]',
              '    bar => %{bar}',
              '  foo (again) => %{foo}',
              'with some indentation',
            ].join('\n')
          )
        })

        it('has the array of positional parameters', () => {
          expect(comment.variables).toEqual({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            0: 'posi-foo',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            1: 'posi-bar',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            2: 'posi-baz',
            foo: 'name-foo',
            bar: 'name-bar',
          })
        })
      })
    })
  })
})
