// losgehts

const gigaSec = Math.pow(10, 9);

export const gigasecond = (date) => {
   new Date(date.getTime() + gigaSec * (10 ** 3));
}
