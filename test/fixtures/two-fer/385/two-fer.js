export const twoFer = (name) => {
	const appeal = (name === '') ? 'you' : name;
	return `One for ${appeal}, one for me.`;
}