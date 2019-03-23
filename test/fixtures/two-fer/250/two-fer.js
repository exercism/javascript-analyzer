// ES6
let twoFer = (name = "you") => {
    if (name) return `One for ${name}, one for me.`
 }
 
 twoFer("Alice");
 
 // ES5
 // function twoFer(name) {
 //   if (name) return `One for ${name}, one for me.`
 
 //   return "One for you, one for me"
 // }
 
 // twoFer("Alice");