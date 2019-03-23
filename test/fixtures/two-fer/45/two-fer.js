// The specs for a name are not defined. 
// Including if it should be a normal name (so rapper names like 6ix 9ine??).
// Going to accept any string, that is not empty, as a name.
export const twoFer = (name) => {
    let you = "";
    if(typeof name == "string" && name.length > 0)
        you = name;
    else
        you = "you";
    return `One for ${you}, one for me.`;
}