export const decodedValue = ([i, n]) => {
	let COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
	let vys  = (COLORS.indexOf(i).toString() + COLORS.indexOf(n).toString())
	return parseInt(vys)
 }
