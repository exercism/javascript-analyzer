const milliSecondsInBillionSeconds = 1E12;

const travelInFuture = (presentTimestamp) => {
    return new Date(presentTimestamp + milliSecondsInBillionSeconds);
}

export const gigasecond = (date) => {
    let birthDay = date.getTime();
    
    return travelInFuture(birthDay);
}