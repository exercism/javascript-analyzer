let twoFer = (name = "you") => {
	if (name === "") {
		name = "you";
	}
	return `One for ${name}, one for me.`;
}

export { twoFer }