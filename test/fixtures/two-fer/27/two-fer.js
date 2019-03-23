export const twoFer = (name) => {
    var string = "One for ";
    if (name) {
        string += name + ", one for me.";
    } else {
        string += "you, one for me.";
    }
    return string
}