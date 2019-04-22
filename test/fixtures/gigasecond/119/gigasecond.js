// a gigasecond is one billion seconds

module.exports.gigasecond = (birthDate) => {
  const gigaSec = 1e9; // 1B seconds
  let ageSecs = birthDate.getTime() / 1000;
  ageSecs += gigaSec;
  return new Date(ageSecs * 1000);
};
