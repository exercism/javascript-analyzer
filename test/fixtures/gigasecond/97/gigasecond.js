//03-excerism



export const gigasecond =(addDate) => {

	const gigaDate = 10**12;
	const nDate = addDate.getTime();

	return new Date(nDate + gigaDate);

}

