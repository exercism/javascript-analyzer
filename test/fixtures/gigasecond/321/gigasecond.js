export const gigasecond = (date)=>{
	let oldVal = date.getTime();
	let newVal = oldVal + Math.pow(10, 12);
	return new Date(newVal);
}
