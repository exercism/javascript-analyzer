//S3- Logical or: Easier to read, no duplication and choices are obvious

export const twoFer = (name) => {
  return `One for ${name || "you"}, one for me.`;
}


/*S2- Ternary: less code than if but harder to read, bodmas issues

export const twoFer = (name) => {
  return name ? `One for ${name}, one for me.` : `One for you, one for me.`;
}

//S1- Conditional if/else: duplication issues, but too clunky for two options

export const twoFer = (name) => {
  if(name){
    return `One for ${name}, one for me.`;
  }
  else {
    return `One for you, one for me.`;
  }
}
*/
