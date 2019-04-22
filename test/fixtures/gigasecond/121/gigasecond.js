const moment = require('moment');

export const gigasecond = date => new Date(
  moment(date).add(10 ** 9, 'seconds').valueOf(),
);
