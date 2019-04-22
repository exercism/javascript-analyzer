const addSecondsToDate = (date, seconds) => {
    const input = new Date(date)
    return new Date(input.setSeconds(input.getSeconds()+seconds))
}

export const gigasecond = date => addSecondsToDate(date, Math.pow(10, 9));
