
export const twoFer = (name) => {
    let nameSpace = name;
    if (!name) {
        nameSpace= 'you';
    }
    return `One for ${nameSpace}, one for me.`;
};