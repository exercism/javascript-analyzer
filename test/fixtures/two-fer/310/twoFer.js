
var twoFer = function (name) {
    if (!name){
        return "One for you, one for me.";
    } else {
        let twoFer = " One for " + name.toString() + ", and one for me."
        return twoFer;
    }

};

console.log(twoFer('Bob'));