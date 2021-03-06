const GIGASECOND_IN_MS = 1e9 * 1e3;

export const gigasecond = (dateOfBirth) => {
	const birthTime = dateOfBirth.getTime();
	return new Date(birthTime + GIGASECOND_IN_MS);
};
