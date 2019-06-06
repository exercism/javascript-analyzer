const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
/*
 const COLORS = () => {
	return "Hello, World!"
  };
*/
export function colorCode(color){	
	return COLORS.indexOf(color);
}
