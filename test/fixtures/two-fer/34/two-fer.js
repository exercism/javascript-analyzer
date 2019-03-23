
function twoFer(name){
    if(name.length === 0){
        name = 'you'; 
    }
    return "One for "+name+", one for me.";
}
export {twoFer};