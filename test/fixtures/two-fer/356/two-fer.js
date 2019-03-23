function twoFer(who) {
  who ? who : (who = 'you');

  return `One for ${who}, one for me.`;
}

module.exports = { twoFer };
