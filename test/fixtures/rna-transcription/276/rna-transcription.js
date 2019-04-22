export const toRna = (x) =>
{
  var convertFrom = ['G','C','T','A'];
  var convertTo = ['C','G','A','U'];

  var dna = x.split('');
  var rna = [];

  for (var i = 0; i < dna.length; i++)
  {
    if (convertFrom.includes(dna[i]))
    {
      rna.push(convertTo[convertFrom.indexOf(dna[i])]);
    }
    else if (dna[i] == "")
    {
      rna.push("");
    }
    else
    {
      throw 'Invalid input DNA.';
    }
  }

  return(rna.join(''));
}