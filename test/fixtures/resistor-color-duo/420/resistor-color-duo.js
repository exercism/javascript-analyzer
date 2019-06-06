'use strict'

const COLORS = {
	"black": 0,
	"brown": 1,
	"red": 2,
	"orange": 3,
	"yellow": 4,
	"green": 5,
	"blue": 6,
	"violet": 7,
	"grey": 8, 
	"white": 9,
}

export const value = (arrOfColors) => {
	const i = arrOfColors
							.map(x => COLORS[x])
							.map(i => i.toString())
							.reduce((acc, n) => acc += n);
	return parseInt(i, 10);
}
