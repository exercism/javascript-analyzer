export const twoFer = (name) => {
    let person
    
    if(name !== '') {
        person = name
    } else {
        person = 'you'
    }
  
    return 'One for ' + person + ', one for me.'
  };
  