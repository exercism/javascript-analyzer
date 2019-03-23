export const twoFer = (word) => {

    if (word == "Alice") {

        return (`One for ${word}, one for me.`);

    } else if (word.length == 0) {

        return (`One for you, one for me.`);

    } else {

        return (`One for ${word}, one for me.`);

    }

}