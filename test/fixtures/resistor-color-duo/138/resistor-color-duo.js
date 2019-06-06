export const value = ([color1, color2]) => {
	var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
	return Number(String(COLORS.indexOf(color1)) + String(COLORS.indexOf(color2)));
}