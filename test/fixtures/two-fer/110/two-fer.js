const oneForMe = ", one for me.";

const twoFer = (name) => {
	let you = "";
	if(name == ""){
		you = "One for you";
	} else {
		you = `One for ${name}`
	}
	return `${you}${oneForMe}`;
}

export {twoFer};