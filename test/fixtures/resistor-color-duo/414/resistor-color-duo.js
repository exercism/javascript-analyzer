const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

function value ([color1, color2]){
	return parseInt(COLORS.indexOf(color1) + "" + COLORS.indexOf(color2))

}

export { value }
