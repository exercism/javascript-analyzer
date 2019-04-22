"use strict";

function transcription(dna){
	var complements = {
		G: "C",
		C: "G",
		T: "A",
		A: "U"
	};
	var l = dna.length;
	var x = "";
	for(var i = 0; i < l; i++){
		var y = dna[i].toUpperCase();
		var z = complements[y];
		x += z;
	};
	return x;
};