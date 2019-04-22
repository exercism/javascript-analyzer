

function toRna(d) {
  var arr=[],d1="";

  for(var i=0;i<d.length;i++)
  {
    arr[i]=d[i];
    if(arr[i]==="C")
    {
      arr.splice(i,1,"G");
    }else if(arr[i]==="G")
    {
      arr.splice(i,1,"C");
    }else if(arr[i]==="T")
    {
      arr.splice(i,1,"A");

    }else if(arr[i]==="A")
    {
      arr.splice(i,1,"U");
    }
    
  }
  d1=arr.join("");
  return d1;
}
module.exports = {toRna};

