export var gigasecond = date => {
    return addGigasecond(date);
};

function addGigasecond(date) {
    const GIGASECOND = 1e9 * 1e3;
    const dateToConst = date.getTime();
    return new Date(dateToConst + GIGASECOND);
};
