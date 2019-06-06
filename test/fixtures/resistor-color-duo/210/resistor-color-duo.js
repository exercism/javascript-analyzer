
export const COLORS = ["black","brown","red","orange","yellow",
						"green","blue","violet","grey","white"];

export const value = (twoColors) =>
	Number('' + COLORS.indexOf(twoColors[0])
			  + COLORS.indexOf(twoColors[1]));
