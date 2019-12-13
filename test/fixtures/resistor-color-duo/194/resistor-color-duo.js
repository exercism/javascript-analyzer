
//these are given as is
const Colors = {
		Black: 0,
	  Brown: 1,
		Red: 2,
		Orange: 3,
		Yellow: 4,
		Green: 5,
		Blue: 6,
		Violet: 7,
		Grey: 8,
		White: 9
};


export function decodedValue(arr) {
	let result = '';

  arr.map(color => {
  	let initCap = color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
    result += (Colors[initCap].toString());
  });

  return parseInt(result);
}
