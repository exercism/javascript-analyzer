const RESISTOR_COLOR_VALUE_MAPPING = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
}

class ResistorDuo {
  constructor(resistorColorPair) {
    this.resistorColorPair = resistorColorPair
  }

  calculateColorResistance(resistance, resistorColor, colorIndex) {
    return resistance * ResistorDuo.getDigitPlaceMultiplier(colorIndex) + ResistorDuo.getResistorColorValue(resistorColor)
  }

  calculateResistance() {
    return this.resistorColorPair.reduce(this.calculateColorResistance, 0)
  }

  static isFirstResistanceColor(resistorColorIndex) {
    return resistorColorIndex === 0
  }

  static getDigitPlaceMultiplier(resistorColorIndex) {
    const FIRST_DIGIT = 1
    const SECOND_DIGIT = 10

    return ResistorDuo.isFirstResistanceColor(resistorColorIndex) ? FIRST_DIGIT : SECOND_DIGIT
  }

  static getResistorColorValue(resistorColor) {
    const decodedValue = RESISTOR_COLOR_VALUE_MAPPING[resistorColor]

    if (decodedValue === undefined) {
      throw new Error(`invalid resistor color ${resistorColor} does not exist`)
    }

    return decodedValue
  }
}

export function decodedValue(resistorColorPair) {
  return new ResistorDuo(resistorColorPair).calculateResistance()
}
