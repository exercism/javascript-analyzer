
const gigasecond_val = 1000000000;

export const gigasecond = (initialDate) => {
    initialDate.setUTCSeconds(initialDate.getUTCSeconds() + gigasecond_val);

    return initialDate;
}