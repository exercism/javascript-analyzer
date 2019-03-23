export const twoFer = (name) => {

    var forMe = "one for me.";

    if (name === '' || name === null) {
        return "One for you, " + forMe;
    } else if (name === 'Alice') {
        return "One for Alice, " + forMe;
    } else if (name === "Bob") {
        return "One for Bob, " + forMe;
    }
}