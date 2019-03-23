function twoFer(x) {
  if (x === undefined || x === '') {
    x = 'you';
  }
  return 'One for '+ x +', one for me.';
}

export { twoFer };
