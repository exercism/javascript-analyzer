const DEFAULT_NAME = 'you';
export const twoFer = (name = 'you') => `One for ${!name ? DEFAULT_NAME : name}, one for me.`;
