export const gigasecond = ts => {
    return new Date(ts.getTime() + gs_in_millis);
}

const gs_in_millis = Math.pow(10, 9+3);