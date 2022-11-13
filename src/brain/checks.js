import { arrayEquals, trace } from '../util'

// check if target is an empty cell
const isTargetEmpty = (target) => target.piece === 0

// check if positions of two target obj are the same
const isTargetEqual = (t1, t2) => arrayEquals(t1.position, t2.position)

// check if target piece belongs to the player whose turn it is
const isOwnTarget = (state, target) => target.piece === state.playerTurn

// check if player hasn't made any jumps in this turn yet
const hasntJumpedYet = (state) => !state.endTurnAllowed

// Check if player is allowed to select another piece
const allowedToSelectAnother = (state, target) => isOwnTarget(state, target) && hasntJumpedYet(state)

// Check if player is allowed to deselect the piece
const allowedToDeselect = (state, target) => isSelected(state, target) && hasntJumpedYet(state)


const isSelected = (state, target) => !!state.selectedCell && isTargetEqual(state.selectedCell, target)

// using a walk or jump tree of valid targets, check if target is valid 
const isTargetValid = (validTree, target) => {
  if (!target.position || !validTree[ target.position[ 0 ] ]) return false
  return validTree[ target.position[ 0 ] ].indexOf(target.position[ 1 ]) !== -1
}

// check if target is a valid walk for the player
const isValidWalk = (state, target) => isTargetValid(state.validTargets.walks, target)


// check if target is a valid jump for the player
const isValidJump = (state, target) => isTargetValid(state.validTargets.jumps, target)


export { isTargetEmpty, isOwnTarget, hasntJumpedYet, allowedToSelectAnother, allowedToDeselect, isValidWalk, isValidJump, isSelected }