
/**
 * Calculates when someone has/will have lived for 1 gigasecond.
 * @param {Date} date Date of birth
 * @returns {Date} The 1 Gigasecond aniversary date
 */
const gigasecond = (date) => {
    const gs = 10 ** 9;
    const inMilis = gs /*seconds*/ * 1000 /*account for milis*/

    const aniversary = date.getTime() + inMilis;

    return new Date(aniversary);
};

export { gigasecond as whensMyBirthday };