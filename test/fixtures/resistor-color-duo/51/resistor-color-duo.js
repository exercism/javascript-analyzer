import {
  flip,
  indexOf,
  join,
  map,
  pipe,
  toString
} from 'ramda'

const colors = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
]

const colorToIndex = flip(indexOf)(colors)
const toNumber = x => +x

export const decodedValue = pipe(
  map(colorToIndex),
  map(toString),
  join(''),
  toNumber
)
