import { colorCode } from './resistor-color-duo.js';

describe('Resistor Colors', () => {
  test('Brown and black', () => {
    expect(colorCode(['brown', 'black'])).toEqual(10);
  });

  test('Blue and grey', () => {
    expect(colorCode(['blue', 'grey'])).toEqual(68);
  });

  test('Yellow and violet', () => {
    expect(colorCode(['yellow', 'violet'])).toEqual(47);
  });

  test('Orange and orange', () => {
    expect(colorCode(['orange', 'orange'])).toEqual(33);
  });
});
