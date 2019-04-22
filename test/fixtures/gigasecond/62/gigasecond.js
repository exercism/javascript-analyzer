export default (date) => {
    return new Date(date.getTime() + (10 ** 12));
};