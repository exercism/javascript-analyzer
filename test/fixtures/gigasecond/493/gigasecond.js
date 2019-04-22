module.exports = {
    gigasecond
}

function gigasecond(dateObj){
    const expectedMomentInMilliSeconds = Date.parse(dateObj.toUTCString()) + (Math.pow(10, 9) * 1000);
    const expectedMoment = new Date();
    expectedMoment.setTime(expectedMomentInMilliSeconds);
    return expectedMoment;
}