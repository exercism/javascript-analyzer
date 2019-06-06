export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function colorCode (x) {
	const color = x.toLowerCase();
	return COLORS.indexOf(color);
}
