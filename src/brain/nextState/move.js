
import { isTargetEmpty, isOwnTarget } from '../checks'
import { validateState, validateStartAndTargetPos } from '../validateStateAndTarget'
// Get next state: Move
function move(state, target) {
  // checks for valid input data format
  validateState(state)
  const startPos = state.selectedCell.position
  const targetPos = target.position
  validateStartAndTargetPos(startPos, targetPos)


  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [...state.actionsHistory] }
  const [x, y] = startPos
  const [newX, newY] = targetPos

  // check if valid move
  // if (isValidMoveForState(newState, [startPos, targetPos])) {
  newState.board[newX][newY] = newState.board[x][y]
  newState.board[x][y] = 0
  newState.message = `Player ${newState.icons[newState.playerTurn - 1]}: 
    ${startPos} to ${targetPos}`
  newState.actionsHistory.push([startPos, targetPos])
  newState.endTurnAllowed = true
  // } else throw new Error('invalid move')

  return newState
}

export { move }