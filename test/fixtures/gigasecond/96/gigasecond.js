export const gigasecond = (date) => {
    var sec = date.getTime();
    sec += Math.pow(10,12);
    return new Date(sec);
}

// Date.UTC() method returns the number of milliseconds since January 1, 1970, 00:00:00 UTC

// 1 milliseconds = 0.001 seconds, 1 second = 1000 milliseconds

// add 1,000,000,000(1 billion) seconds, which equals 1,000,000,000,000(1 trillion) milliseconds, to the Date

// new Date() method creates a new date object, and return a date.

// getTime() method returns the number of milliseconds
