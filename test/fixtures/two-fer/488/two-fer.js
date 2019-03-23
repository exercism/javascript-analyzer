// Two Fer
function twoFer(name) {
	if (name == '') {
		// No name given
		name = 'you';
		return `One for ${name}, one for me.`;
	} else if (name == 'Alice') {
		// Given name
		return `One for ${name}, one for me.`;
	} else if (name == 'Bob') {
		// Another given name
		return `One for ${name}, one for me.`;
	}
}

export { twoFer }
