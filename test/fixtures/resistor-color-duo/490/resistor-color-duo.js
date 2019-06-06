const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const value = ([color1, color2]) => {
	const tensDigit = COLORS.indexOf(color1)
	const onesDigit = COLORS.indexOf(color2)
	return 10*tensDigit + onesDigit
}
