const mapping = {
  'A':'U' , 'C':'G', 'G':'C' ,'T':'A'
}

function getComplement(_input){
  if (!(_input in mapping)) throw('Invalid input DNA.');

  return mapping[_input]
}

 function toRnaIterative(_dnaSequence){
  if (_dnaSequence == "") return "";

  var result_code = "";
  for (var i = 0; i < _dnaSequence.length; i++){
    result_code += getComplement(_dnaSequence[i]);
  }
  return result_code;
}

//
export function toRna(_dnaSequence){
   var helperFun = function(_input,_collector){
    if (_input === "") return _collector;
    return helperFun(_input.substr(1),
              _collector + getComplement(_input[0]));
  }
  return helperFun(_dnaSequence,"");
}
