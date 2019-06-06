export const colors = arr => {
  const templates = {
    "Black": 0,
    "Brown": 1,
    "Red": 2,
    "Orange": 3,
    "Yellow": 4,
    "Green": 5,
    "Blue": 6,
    "Violet": 7,
    "Grey": 8,
    "White": 9
    }
  return parseInt(templates[arr[0]].toString() + templates[arr[1]].toString(), 10)
}
