export function toRna(str)
{
	var res = '';
	for (var i = 0; i < str.length; ++i)
	{
		var ch;
		switch(str[i])
		{
			case 'G': ch = 'C'; break;
			case 'C': ch = 'G'; break;
			case 'T': ch = 'A'; break;
			case 'A': ch = 'U'; break;
			default: throw new Error("Invalid input DNA.");
		}
		res += ch;
	}
	return res;
}
