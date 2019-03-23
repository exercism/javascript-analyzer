export const twoFer = (name) => {
  // let namespace = name ? name : 'You';
  let namespace = name;
  if (!name) {
    namespace = 'you';
  }
  return `One for ${namespace}, one for me.`;
};
