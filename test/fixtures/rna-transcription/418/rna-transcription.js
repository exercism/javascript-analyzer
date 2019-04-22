//
// This is only a SKELETON file for the 'Hello World' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const toRna = (DNA) => {
  //
  // YOUR CODE GOES HERE
  //
  var DNA2RNA = {G: "C", C: "G", T: "A", A: "U"};

  
  if(DNA){
  	let RNA = "";

  	DNA.split('').forEach(function(nucleo) {
  		if(DNA2RNA[nucleo] != undefined){
  			RNA = RNA + DNA2RNA[nucleo];
  		}else{
  			throw "Invalid input DNA.";
  		}
  	});
  	return RNA;

  }else{
  	return "";
  }
};
