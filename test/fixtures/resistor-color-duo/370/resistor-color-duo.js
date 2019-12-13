export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = colors => {
    let result = '';
	for (let color of colors) {
		result = result + (COLORS.indexOf(color))
	}
	return parseInt(result)
}
