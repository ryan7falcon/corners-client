const letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
const getNumber = (rowIdx) => 8 - rowIdx
const getLetter = (colIdx) => letters[ colIdx + 1 ]
const getLocation = (pos) => `${getLetter(pos[ 1 ])}${getNumber(pos[ 0 ])}`

export { letters, getNumber, getLetter, getLocation }