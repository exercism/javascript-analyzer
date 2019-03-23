export const twofer = X => {
	if (X) {
		return `One for ${X}, one for me.`;
	} else {
		return `One for you, one for me.`;
	}
};
twofer('Alice');
