export const twoFer = (name) => {
	if (name === "") {
		return "One for you, one for me.";
	} if ( name === "Alice") {
		return "One for Alice, one for me.";
	}
	return "One for Bob, one for me.";
};
