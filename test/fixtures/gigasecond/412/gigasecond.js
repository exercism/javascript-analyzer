function gigasecond(date) {
    return new Date(((date / 1000) + 10**9)*1000);
}

export {gigasecond};


