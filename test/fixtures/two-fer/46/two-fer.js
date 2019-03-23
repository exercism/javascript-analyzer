export const twoFer = (name = '') => {

    if (name == '') {
        return 'One for you, one for me.';

    } else if (name) {

        return `One for ${name}, one for me.`;

    }

};