export const toRna = (str) => {

 let newRNA = '';
 for (let i = 0; i < str.length; i++) {
   switch (str[i]) {
     case 'G': newRNA += 'C';
	       break;
     case 'C': newRNA += 'G';
	       break;
     case 'T': newRNA += 'A';
	       break;
     case 'A': newRNA += 'U';
               break;
	   default: throw new Error('Invalid input DNA.');
   }
 }   return newRNA;
}

