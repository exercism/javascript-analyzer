
const twoFer = function (name) {
    if (name === '') {
        console.log("One for you, one for me.");
    } else {
        console.log(`One for ${name}, one for me.`);
    }
};


twoFer('Alice');


module.exports= twoFer;