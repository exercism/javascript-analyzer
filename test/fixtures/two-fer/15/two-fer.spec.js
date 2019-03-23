function twoFer(name) {
  if (!name) {
    return ('One for you, one for me.');
  }
  return (`One for ${name} ,one for me.`);
}

describe('twoFer()', () => {
  test('no name given', () => {
    const name = '';
    expect(twoFer(name)).toEqual('One for you, one for me.');
  });

  xtest('a name given', () => {
    const name = 'Alice';
    expect(twoFer(name)).toEqual('One for Alice, one for me.');
  });

  xtest('another name given', () => {
    const name = 'Bob';
    expect(twoFer(name)).toEqual('One for Bob, one for me.');
  });
});
