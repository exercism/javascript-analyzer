// function twoFer(name) {
//     return (name !== '' || name === undefined || name === 'you') ? 
//         'One for you, one for me.': 
//         'One for ' + name + ',' + ' one for me.';
// };

const twoFer = (name) => {
    if (name === '' || name === undefined || name === 'you') {
        return 'One for you, one for me.';
    } else {
        return 'One for ' + name + ',' + ' one for me.';
    }
}

let name = 'Alice';
console.log(twoFer(name));