export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function value (x) {

	let val = "";
	val += COLORS.indexOf(x[0]);
	val += COLORS.indexOf(x[1]);

	return (parseInt(val));
}
