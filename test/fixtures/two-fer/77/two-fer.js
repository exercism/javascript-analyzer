export function twoFer (person){
    if (!person){
      const name = 'you'
      return `One for ${name}, one for me.`
    }else{
      const name = person;
    return `One for ${name}, one for me.`
  }
}