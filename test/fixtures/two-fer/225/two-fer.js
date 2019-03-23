export const twofer = () => {
	const readline = require('readline');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('What is your name? ', (answer) => {
		// TODO: Log the answer in a database
		if(answer != null) {
			console.log(`one for ${answer}, one for me`);
		} else {
			console.log("one for you, one for me");
		}

	rl.close();
	});
};