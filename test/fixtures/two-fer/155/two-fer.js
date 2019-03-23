// two-fer Implements the Two Fer Side Exercise
//
// Provide a routine that takes a name as input and outputs a
// message in the form "One for {name}, one for me."

// twoFer takes a name and outputs the desired string.
// If the name is empty then substitute "you" in its place.
export const twoFer = name => `One for ${(name === '') ? 'you' : name}, one for me.`;
