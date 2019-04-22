const gigasecond = (birthdate) => {
    return new Date(birthdate.getTime() + 1000 * 10 ** 9);

}


export { gigasecond }; 