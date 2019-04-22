/**
 * @param {Date} givenDate The current date
 * @returns {Date} A gigasecond later than the given date
 * 
 * Returns a new date that is one gigasecond later the original.
 */
export const gigasecond = givenDate => {
    //getTime() returns milliseconds, so need to convert seconds to milliseconds
    return new Date(givenDate.getTime() + 1000000000*1000)
}