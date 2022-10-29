function arrayEquals (a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function positionIsInArray (arr, position) {
  if (!Array.isArray(position) || !Array.isArray(arr)) {
    throw new Error('arr and position must be arrays')
  }
  return arr.some(ar => arrayEquals(ar, position))
}


export { arrayEquals, isObject, positionIsInArray }