"use strict";

function gigasecond(){
	var age = prompt("Please, enter your age.");
	var gigasecond = 10;
	for(var i = 1; i < 9; i++){
		gigasecond *= 10;
	};
	var gigasecondToYears = gigasecond *= (1 / (365 * 24 * 60 * 60));
	var gigasecondLived = age / gigasecondToYears;
	var total = Math.round(gigasecondLived * 100) / 100;
	return "You have lived approximately " + total + " gigaseconds.";
};