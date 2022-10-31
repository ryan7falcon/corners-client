import { isObject, objHasProperty, isArray } from '../util'

const validateState = (state) => {
  // checks for valid input data format
  if (!state || !isObject(state) || Object.entries(state).length === 0) {
    throw new Error('State must be a non-empty object')
  }

  if (!objHasProperty(state, 'board') || !isArray(state.board) || !isArray(state.board[0])) {
    throw new Error('state must have a "board" property that is a 2-dimentional array')
  }

  if (!objHasProperty(state, 'actionsHistory') || !isArray(state.actionsHistory)) {
    throw new Error('state must have a "actionsHistory" property that is a 1-dimentional array')
  }

  if (!objHasProperty(state, 'icons') || !isArray(state.icons)) {
    throw new Error('state must have an "icons" property that is a 1-dimentional array')
  }
}

const validateStartAndTargetPos = (startPos, targetPos) => {
  if (!startPos || !targetPos) {
    throw new Error('Starting position and target must not be empty')
  }

  if (!isArray(startPos) || !isArray(targetPos) ||
    startPos.length !== 2 || targetPos.length !== 2) {
    throw new Error('startPos and targetPos must be arrays of two elements')
  }
}

export { validateStartAndTargetPos, validateState }