export const twoFer = (name = '') => {
	const isEmpty = name === '' || name === undefined || name === null;
	return isEmpty ?
		"One for you, one for me." :
		`One for ${name}, one for me.`;
};
