

export default function toRna(strand)
{
    const DNA = ['G', 'C', 'T', 'A'];
    const RNA = ['C', 'G', 'A', 'U'];

    if (strand === '')
    {
        return '';
    }

    let converted = '';

    for(let char of strand.split(''))
    {
        let index = DNA.findIndex(r => r === char.toUpperCase());
        if (index < 0)
        {
            throw 'Invalid input DNA.';
        }
        converted += RNA[index];
    }

    return converted;
}

module.exports.toRna = toRna;


