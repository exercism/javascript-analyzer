function toRna(trans) {
    // I want to loop through the string and replace each letter with its counter part
    var yum = "";
    for(let i = 0; i < trans.length; i++)
    {
        if(trans[i] == 'G')
        {
            yum += 'C';
        }
        else if(trans[i] == 'C')
        {
            yum += 'G';
        }
        else if(trans[i] == 'T')
        {
            yum += 'A';
        }
        else if(trans[i] == 'A')
        {
            yum += 'U';
        }
        else {
            throw 'Invalid input DNA.';
        }
        
    }
    return yum;
}
toRna('ACGTXXXCTTAA');