export function twoFer(name = 'you') {
	return name === '' ? `One for you, one for me.` : `One for ${name}, one for me.`;
}
