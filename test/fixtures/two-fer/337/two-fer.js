
export const twoFer = (name) => {
   return name ? oneName(name) : noName()
};
  

function noName(){
    return `One for you, one for me.`
}

function oneName(name){
    return `One for ${name}, one for me.`

}