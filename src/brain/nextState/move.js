
import { isTargetEmpty, isOwnTarget } from '../checks'
import { validateState, validateStartAndTargetPos } from '../validateStateAndTarget'
// Get next state: Move
function move(state, target) {
  // checks for valid input data format
  validateState(state)
  const startPos = state.selectedCell.position
  const targetPos = target.position
  validateStartAndTargetPos(startPos, targetPos)

  const newState = {
    ...state,
    board: JSON.parse(JSON.stringify(state.board)),
    actionsHistory: [...state.actionsHistory]
  }
  const [x, y] = startPos
  const [newX, newY] = targetPos

  newState.board[newX][newY] = state.playerTurn
  newState.board[x][y] = 0
  newState.message = `Player ${newState.icons[newState.playerTurn - 1]}: 
    ${startPos} to ${targetPos}`
  newState.actionsHistory.push([startPos, targetPos])
  newState.endTurnAllowed = true
  console.log('action history', newState.actionsHistory)
  return newState
}

export { move }