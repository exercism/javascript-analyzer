module.exports.twoFer = function(name) {
    var X = "you"
    if (name){
        X = name
    }
    return `One for ${X}, one for me.`
}

console.log(module.exports.twoFer("Peter"))
console.log(module.exports.twoFer())
