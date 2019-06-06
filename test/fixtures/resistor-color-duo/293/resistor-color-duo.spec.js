import { getResistorValue } from './resistor-color-duo.js';

describe('Resistor Colors', () => {

  it('should prompt the user if it cannot find the colors provided', () => {
    expect(getResistorValue('blue', 'popcorn')).toEqual('Unable to match the provided colors.')
  })

  it('should return the number 10 if given the colors brown and black', () => {
    expect(getResistorValue('brown', 'black')).toEqual(10)
  })

  it('should return the number 68 if given the colors blue and grey', () => {
    expect(getResistorValue('blue', 'grey')).toEqual(68)
  })

  it('should return the number 47 if given the colors yellow and violet', () => {
    expect(getResistorValue('yellow', 'violet')).toEqual(47)
  })

  it('should return the number 33 if given the colors orange and orange', () => {
    expect(getResistorValue('orange', 'orange')).toEqual(33)
  })
})
