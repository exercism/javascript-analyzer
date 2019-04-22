var dna=["G","C","T","A"];
var rna="";
for(var x=0;x<=dna.length;x++){
	if(dna[x]=="G"){
		rna=rna+"C";
	}
	if(dna[x]=="C"){
		rna=rna+"G";
	}
	if(dna[x]=="T"){
		rna=rna+"A";
	}
	if(dna[x]=="A"){
		rna=rna+"U";
	}
}
console.log(rna);