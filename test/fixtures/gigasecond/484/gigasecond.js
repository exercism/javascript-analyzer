const getAnniversary = function (date) {

    const intervalInMilliseconds = Math.pow(10, 9) * Math.pow(10, 3);

    let aniverssaryDate = new Date(date.getTime() + intervalInMilliseconds);

    return aniverssaryDate;
}

export const gigasecond = function (date) {
    return getAnniversary(date);
}