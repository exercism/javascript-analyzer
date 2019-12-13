const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors) => {
	return parseInt(colors.reduce((prev, next) => `${COLORS.indexOf(prev)}${COLORS.indexOf(next)}`), 10);
}
