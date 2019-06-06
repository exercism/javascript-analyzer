export const COLORS = [
	"black","brown","red","orange","yellow","green","blue","violet","grey","white"
]

export const colorCode = (color) => {
	let colorIndex

	COLORS.find((array, index) => {
		if(array === color) {
			colorIndex = index
		}
	})

	return colorIndex
}
