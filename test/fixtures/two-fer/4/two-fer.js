export const twoFer = (argName) => {
    let name;

    if (typeof argName == 'string' && argName.length > 0) {
        name = argName;
    } else {
        name = 'you';
    }

    return `One for ${name}, one for me.`;
}
