 function twoFer(name) 
  {
    return `One for ${name || 'you'}, one for me.`;
  };

module.exports.twoFer = twoFer;