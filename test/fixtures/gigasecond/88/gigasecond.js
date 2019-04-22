var gigasecond = function(date){
    
    date.startDate = date;
    var startTime = date.startDate.getTime();
	var endDate = new Date(startTime + 1000000000000);
	return endDate;
    
}



export { gigasecond };