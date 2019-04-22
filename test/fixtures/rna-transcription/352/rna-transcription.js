module.exports.toRna = function(dna){

    var dnaArr = ['G', 'C', 'T', 'A'];
    var rnaArr = ['C', 'G', 'A', 'U'];

    var rna = '';
    for(var i = 0; i < dna.length; i++)
    {
        
        var item = dna.charAt(i);
        var index = dnaArr.indexOf(item);
            
        if(index == -1)
        {
            throw new Error('Invalid input DNA.');
        }
        else
        {
            rna += rnaArr[index];
        }
    }
    return rna;
};