export const twoFer = ( name ) => {
    name = name.length > 0 ? name : 'you';
    return `One for ${name}, one for me.`;
}