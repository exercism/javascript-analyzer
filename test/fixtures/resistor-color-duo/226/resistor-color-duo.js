const arr=['black','brown','red','orange',
                    'yellow','green','blue','violet',
                  'grey','white']
export function decodedValue(x,y){

  return arr.indexOf(x)*10+arr.indexOf(y)
}
