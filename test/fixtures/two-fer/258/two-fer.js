export const twoFer = (name) => {
    if (name.length == 0) {
        return "One for you, one for me."
    } else {
        return `One for ${name}, one for me.`
    }
}