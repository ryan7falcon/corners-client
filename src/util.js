function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const objHasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

const isArray = (a) => Array.isArray(a)

export { arrayEquals, isObject, objHasProperty, isArray }