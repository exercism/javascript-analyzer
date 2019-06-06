export const value = function([color1, color2]){
	const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
	return (parseInt(COLORS.indexOf(color1).toString() + COLORS.indexOf(color2).toString()))
}