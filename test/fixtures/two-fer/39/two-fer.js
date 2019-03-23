
// function twoFer(name) {e    
//     if (name == undefined) {
//         return 'One for you, one for me.';
//     } else {
//         return `One for ${name}, one for me.`;
//     }
// }


 export const twoFer = (name) => {

    if (name == '') {
        return 'One for you, one for me.';
    } else {
        return `One for ${name}, one for me.`;
    }
  
 };

 console.log(twoFer(''));
