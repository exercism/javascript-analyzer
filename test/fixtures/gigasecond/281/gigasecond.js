// Calculate the moment when someone has lived for 10^9 seconds.

// A gigasecond is 10^9 (1,000,000,000) seconds.

function addTimeToDate(date, time) {
    return new Date(date.getTime() + time);
}

export const gigasecond = (date) => {
    try {
        return addTimeToDate(date, 1000000000000);
    } catch (error) {
        console.log("Input is not a valid date.");
        console.log(error);
    }
}
