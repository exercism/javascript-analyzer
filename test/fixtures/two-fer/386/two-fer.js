export const twoFer = function(name){
    let nameInMessage;
    
    name == '' ? nameInMessage = 'you' :  nameInMessage = name;
   
    return ('One for ' + nameInMessage + ', one for me.');
}