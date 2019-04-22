export var gigasecond = (gs) => {
    var expectedDate = new Date(gs.setSeconds(gs.getSeconds() + 10 ** 9));
    return expectedDate;
}