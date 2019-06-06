import { colorCode, COLORS } from './resistor-color'

describe('ResistorColor', () => {
  describe('Color codes', () => {
    test('Black', () => {
      expect(colorCode("black")).toEqual(0)
    })

    test('White', () => {
      expect(colorCode("white")).toEqual(9)
    })

    test('Orange', () => {
      expect(colorCode("orange")).toEqual(3)
    })

    test('Orange Uppercase', () => {
      expect(colorCode("ORANGE")).toEqual(3)
    })
  })

  describe('Invalid Color codes', () => {
    test('Ultraviolet', () => {
      try {
        colorCode("Ultraviolet");
      } catch (error) {
        expect(error.message).toEqual('Color ultraviolet is not a valid resistor color');
      }
    })
  });

  test('Colors', () => {
    expect(COLORS).toEqual(["black","brown","red","orange","yellow","green","blue","violet","grey","white"])
  })
})
