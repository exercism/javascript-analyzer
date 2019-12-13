import { decodedValue } from './resistor-color-duo.js';

describe('Resistor Colors', () => {
  test('Brown and black', () => {
    expect(decodedValue(['brown', 'black'])).toEqual(10);
  });

  test('Blue and grey', () => {
    expect(decodedValue(['blue', 'grey'])).toEqual(68);
  });

  test('Yellow and violet', () => {
    expect(decodedValue(['yellow', 'violet'])).toEqual(47);
  });

  test('Orange and orange', () => {
    expect(decodedValue(['orange', 'orange'])).toEqual(33);
  });
});

describe('Invalid Color codes', () => {
  test('Ultraviolet and black', () => {
    try {
      decodedValue(['ultraviolet', 'black']);
    } catch (error) {
      expect(error.message).toEqual('Color ultraviolet is not a valid resistor color');
    }
  })

  test('Black and ultraviolet', () => {
    try {
      decodedValue(['black', 'ultraviolet']);
    } catch (error) {
      expect(error.message).toEqual('Color ultraviolet is not a valid resistor color');
    }
  })
});
