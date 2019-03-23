//  Solution 1
export const twoFer = (name) =>{
  // using Template literals
  return `One for ${name?name:'you'}, one for me.`;
}

/* Solution 2
function twoFer(name){
  // using Template literals
  return `One for ${name?name:'you'}, one for me.`;
}

export {twoFer};
*/