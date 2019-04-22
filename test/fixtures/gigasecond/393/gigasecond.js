module.exports = {
  gigasecond: function (startDateTime) {
    if (!(startDateTime instanceof Date) || isNaN(startDateTime.valueOf())) {
      throw "startDateTime must be of type Date";
    }

    const GIGASECOND_IN_MILLISECONDS = 1000000000000;
    const startDateTimeInMilliseconds = startDateTime.getTime();

    const gigaSecondDate = new Date();
    gigaSecondDate.setTime(startDateTimeInMilliseconds + GIGASECOND_IN_MILLISECONDS);

    return gigaSecondDate;
  }
};