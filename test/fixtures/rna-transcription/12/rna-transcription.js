function toRNA(dna)
{
	var RNA = "";
	var dnal = dna.length;
	for(var i = 0; i <= dnal; i++)
	{
		switch(dna[i])
		{
			case "G":
				RNA += "C";
				break;
			case "C":
				RNA += "G";
				break;
			case "T":
				RNA += "A";
				break;
			case "A":
				RNA += "U";
				break;
		}
	}
	alert(RNA);
}