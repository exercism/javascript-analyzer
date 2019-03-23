
export const twoFer = (val = null) => {
    let x = val;
    if (val === null || val === '') {
        x = "you";
    }
    return `One for ${x}, one for me.`;
};