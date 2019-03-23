export const twoFer = (name) => {
  let currentName = 'you';
  name ? currentName = name : null
  return `One for ${currentName}, one for me.` 
} 

// *** Doesn't work with test conditions
// export const twoFer = (name = 'you') => {
//   return `One for ${name}, one for me.`
// }

// *** Slower solution 
// export const twoFer = (name) => {
//   return name ? 
//   `One for ${name}, one for me.`
//   : 'One for you, one for me.'
// }