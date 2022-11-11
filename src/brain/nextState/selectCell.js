import { move } from './move'
import { endTurn } from './endTurn'
import { updateValidTargets } from './updateValidTargets'
import { isTargetEmpty, isOwnTarget, allowedToSelectAnother, allowedToDeselect, isValidWalk, isValidJump } from '../checks'

// clear selection
function deselect(state) {
  return updateValidTargets({
    ...state,
    selectedCell: undefined
  })
}

// update selection
function select(state, target) {
  return updateValidTargets({
    ...state,
    selectedCell: target,
  })
}

// make a walk move
const walk = (state, target) => {
  return endTurn(move(state, target))
}

// make a jump move
const jump = (state, target) => {
  return select(move(state, target), target)
}

// triage move - walk, jump, nothing
const maybeMakeAMove = (state, target) => {
  if (isValidWalk(state, target)) {
    return walk(state, target)
  } else if (isValidJump(state, target)) {
    return jump(state, target)
  }

  return state
}

// triage selection - select, deselct, move, nothing
function selectCell(state, target) {
  // if second player finished, game is over
  if (state.looserFinished) {
    return state
  }
  // if there is an active selection
  if (state.selectedCell) {
    // deselect selected cell
    if (allowedToDeselect(state, target)) {
      return deselect(state)
      // Select another piece
    } else if (allowedToSelectAnother(state, target)) {
      return select(state, target)
      // try to make a move
    } else if (isTargetEmpty(target)) {
      return maybeMakeAMove(state, target)
    }
    // if there is no active selection and target is player's own piece
  } else if (isOwnTarget(state, target)) {
    return select(state, target)
  }
  return state
}

export { selectCell, deselect }