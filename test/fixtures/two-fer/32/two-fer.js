/**
 * Returns a 2-fer expression based on a name
 * @param {string} name The passed name
 * @returns {string}
 */
const twoFer = (name) => `One for ${ name ? name : 'you' }, one for me.`
export {twoFer}