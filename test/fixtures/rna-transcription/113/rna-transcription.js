export const toRna = (input) => {
  if (input) {
    const firstPhaseConversionDictionary = {
      A: '1',
      C: '2',
      G: '3',
      T: '4',
    };
    const secondPhaseConversionDictionary = {
      1: 'U',
      2: 'G',
      3: 'C',
      4: 'A',
    };
    const DNArray = Object.keys(firstPhaseConversionDictionary);
    const IntermediateArray = Object.values(firstPhaseConversionDictionary);
    const RNArray = Object.values(secondPhaseConversionDictionary);
    const inputArray = input.split('');
    const validCharNumber = DNArray.reduce((previousResult, currentValue) => previousResult
      + inputArray.filter(inputChar => inputChar === currentValue).length,
    0);
    if (validCharNumber !== inputArray.length) {
      throw new Error('Invalid input DNA.');
    }
    const firstPhaseResult = DNArray.reduce(
      (previousResult, currentValue, index) => {
        const regEx = new RegExp(currentValue, 'gi');
        // if first argument is string, then only replace first occurence
        return previousResult.replace(
          regEx, IntermediateArray[index],
        );
      },
      input,
    );
    const result = IntermediateArray.reduce(
      (previousResult, currentValue, index) => {
        const regEx = new RegExp(currentValue, 'gi');
        return previousResult.replace(
          regEx, RNArray[index],
        );
      },
      firstPhaseResult,
    );
    return result;
  }
  return '';
};
