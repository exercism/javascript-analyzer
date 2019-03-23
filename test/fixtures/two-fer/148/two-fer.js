export const twoFer = (name) => {
    //check if name is supplied display string with name 
    //else display genre string
    return name ? `One for ${name}, one for me.` :
           name == '' ? 'One for you, one for me.': '' ;
}