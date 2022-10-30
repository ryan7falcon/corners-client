import { isObject } from '../util'

const validateState = (state) => {
  // checks for valid input data format
  if (!state || !isObject(state) || Object.entries(state).length === 0) {
    throw new Error('State must be a non-empty object')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'board') || !Array.isArray(state.board) || !Array.isArray(state.board[0])) {
    throw new Error('state must have a "board" property that is a 2-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'actionsHistory') || !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have a "actionsHistory" property that is a 1-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'icons') || !Array.isArray(state.icons)) {
    throw new Error('state must have an "icons" property that is a 1-dimentional array')
  }
}

const validateStartAndTargetPos = (startPos, targetPos) => {
  if (!startPos || !targetPos) {
    throw new Error('Starting position and target must not be empty')
  }

  if (!Array.isArray(startPos) || !Array.isArray(targetPos) ||
    startPos.length !== 2 || targetPos.length !== 2) {
    throw new Error('startPos and targetPos must be arrays of two elements')
  }
}

export { validateStartAndTargetPos, validateState }