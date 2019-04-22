function toRna(string)
{
var rna="";
if(string.length==0)
return '';
var dna = string.split("");
for(let i=0; i<dna.length;i++){
if(dna[i]=='G'){
rna+='C';
}

else if(dna[i]=='C')
{
rna+='G';
}

else if(dna[i]=='T'){
rna+='A';
}
else if(dna[i]=='A'){
rna+='U';}
else
return 'Invalid input DNA.'
}
return rna;

}
module.exports=toRna;   