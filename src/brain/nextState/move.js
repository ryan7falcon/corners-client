
import { isTargetEmpty, isOwnTarget } from '../checks'
import { validateState, validateStartAndTargetPos } from '../validateStateAndTarget'
import { jumpingMessage } from './messages'

const updateBoard = (board, playerTurn, startPos, targetPos) => {
  const newBoard = JSON.parse(JSON.stringify(board))

  const [ x, y ] = startPos
  const [ newX, newY ] = targetPos

  newBoard[ newX ][ newY ] = playerTurn
  newBoard[ x ][ y ] = 0

  return newBoard
}

// Get next state: Move
function move(state, target) {
  // checks for valid input data format
  validateState(state)
  const startPos = state.selectedCell.position
  const targetPos = target.position
  validateStartAndTargetPos(startPos, targetPos)

  return {
    ...JSON.parse(JSON.stringify(state)),
    board: updateBoard(state.board, state.playerTurn, startPos, targetPos),
    message: jumpingMessage(state, startPos, targetPos),
    actionsHistory: [ ...state.actionsHistory, [ startPos, targetPos ] ],
    endTurnAllowed: true
  }
}

export { move }