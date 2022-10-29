import { move } from './move'
import { positionIsInArray } from './util'

// Check if allowed to deselct
const allowedToDeselect = (state, rowIndex, columnIndex) => {
  const selectedCell = state.selectedCell
  // (active) selected cell is the same as target cell and the piece hasn't jumped yet (end turn is not allowed yet)
  return (selectedCell[0] === rowIndex && selectedCell[1] === columnIndex && !state.endTurnAllowed)
} 

// Check if allowed to select another cell of the same player
const allowedToSelectAnother = (state, piece) => {
  // target must be of the same player and the player hasnt made any jumps yet
  return (piece === state.playerTurn && !state.endTurnAllowed)
}

const isTargetEmpty = (piece) => piece === 0

const getPosition = (target) => [target.rowIndex, target.columnIndex]
 
const maybeMakeAMove = (state, target) => {
  const position = getPosition(target)

  if (positionIsInArray(state.validTargets.walks, position)) {
    const newState = move(state, position, true)
    // deselect
    return {
      ...newState,
      selectedCell: undefined,
    }
  } else if (positionIsInArray(state.validTargets.jumps, position)) {
    const newState = move(state, position, false)
    return {
      ...newState,
      selectedCell: position,
    }
  }
  return state
}

const handleSelection = (state, target) => {
 

  if (state.selectedCell) {
    // deselect selected cell
    if (allowedToDeselect(state, target.rowIndex, target.columnIndex)) {
      return {
        ...state,
        selectedCell: undefined,
      }
    // Select another one
    } else if (allowedToSelectAnother(state, target.piece)) {
      return {
        ...state,
        selectedCell: [target.rowIndex, target.columnIndex],
      }
    } else if (isTargetEmpty(target.piece)) {
      // make a move
      return maybeMakeAMove(state, target)
    }
  // if there is no active selection
  } else if (target.piece === state.playerTurn) {
    return {
      ...state,
      selectedCell: [target.rowIndex, target.columnIndex],
    }
  }
  return state
}

export { handleSelection }