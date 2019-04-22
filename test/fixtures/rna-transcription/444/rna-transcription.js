export const toRna = (s) => {
  var cm={
    "G":"C",
    "C":"G",
    "T":"A",
    "A":"U"
  };
  if(s === undefined || s === null)
    throw new Error('Invalid input DNA.');
  var r="";
  for(var i in s){
    if(!cm[s[i]])
      throw new Error('Invalid input DNA.');
    r=r+cm[s[i]]
  }
  return r;
};
