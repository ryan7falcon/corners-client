
import { isTargetEmpty, isOwnTarget } from '../checks'
import { validateState, validateStartAndTargetPos } from '../validateStateAndTarget'
import { jumpingMessage } from './messages'

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
    actionsHistory: [ ...state.actionsHistory ]
  }
  const [ x, y ] = startPos
  const [ newX, newY ] = targetPos

  newState.board[ newX ][ newY ] = state.playerTurn
  newState.board[ x ][ y ] = 0
  newState.message = jumpingMessage(newState, startPos, targetPos)
  newState.actionsHistory.push([ startPos, targetPos ])
  newState.endTurnAllowed = true
  return newState
}

export { move }