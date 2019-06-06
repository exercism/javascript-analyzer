//import { colorCode, COLORS } from './resistor-color'
//
//describe('ResistorColor', () => {
//  describe('Color codes', () => {
//    test('Black', () => {
//      expect(colorCode("black")).toEqual(0)
//    })
//
//    xtest('White', () => {
//      expect(colorCode("white")).toEqual(9)
//    })
//
//    xtest('Orange', () => {
//      expect(colorCode("orange")).toEqual(3)
//    })
//  })
//
//  xtest('Colors', () => {
//    expect(COLORS).toEqual(["black","brown","red","orange","yellow","green","blue","violet","grey","white"])
//  })
//})



var colors = [{Black: 0,
					  Brown: 1,
					  Red: 2,
					  Orange: 3,
					  Yellow: 4,
					  Green: 5,
					  Blue: 6,
					  Violet: 7,
					  Grey: 8,
					  White: 9
					 }];

for (var i = 0; i < colors.length; i++) {
	console.log(colors[i]);
}
