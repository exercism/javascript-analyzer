import { getColorCode, COLORS } from './resistor-color'

describe('Resistor colors', () => {
  it('Should return the list of resistor colors', () => {
    expect(COLORS).toEqual(['black','brown','red','orange','yellow','green','blue','violet','grey','white'])
  })
  describe('Color codes', () => {
    it('should return the index of 0 for the color black', () => {
      expect(getColorCode('black')).toEqual(0)
    })

    it('should return the index of 9 for the color white', () => {
      expect(getColorCode('white')).toEqual(9)
    })

    it('should return the index of 3 for the color orange', () => {
      expect(getColorCode('orange')).toEqual(3)
    })
    it('should return "Color not found" if the color is not included in the list of COLORS', () => {
      expect(getColorCode('MintCream')).toEqual('Color not found')
    })
  })
})
