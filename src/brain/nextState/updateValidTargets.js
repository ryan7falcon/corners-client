import { arrayEquals } from '../../util'
import { isTargetEmpty, isOwnTarget, hasntJumpedYet, isTargetValid } from '../checks'


function getValidWalks(state) {
  const walks = {}
  if (!state.selectedCell) { return walks }

  const startPos = state.selectedCell.position

  if (hasntJumpedYet(state)) {
    // add walk moves
    // It has to be an empty cell around startPos
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const targetRow = startPos[0] + i
        const targetCol = startPos[1] + j
        if (targetRow >= 0 && targetRow < state.board.length && targetCol >= 0 && targetCol < state.board[0].length && state.board[targetRow][targetCol] === 0) {
          walks[targetRow] ? walks[targetRow].push(targetCol) : walks[targetRow] = [targetCol]
        }
      }
    }
  }
  return walks
}

function getValidJumps(state) {
  const jumps = {}
  if (!state.selectedCell) { return jumps }

  const startPos = state.selectedCell.position

  for (let i = -2; i <= 2; i += 2) {
    for (let j = -2; j <= 2; j += 2) {
      const targetRow = startPos[0] + i
      const targetCol = startPos[1] + j
      if (targetRow >= 0 &&
        targetRow < state.board.length &&
        targetCol >= 0 &&
        targetCol < state.board[0].length &&
        state.board[targetRow][targetCol] === 0 &&
        state.board[(targetRow + startPos[0]) / 2][(targetCol + startPos[1]) / 2] !== 0
      ) {
        if (state.endTurnAllowed) {
          // previous target is the only one allowed to be the start
          if (arrayEquals(state.actionsHistory[state.actionsHistory.length - 1][1], startPos)) {
            jumps[targetRow] ? jumps[targetRow].push(targetCol) : jumps[targetRow] = [targetCol]
          }
        } else {
          jumps[targetRow] ? jumps[targetRow].push(targetCol) : jumps[targetRow] = [targetCol]
        }
      }
    }
  }
  return jumps
}

function updateValidTargets(state) {
  return {
    ...state,
    validTargets: {
      walks: getValidWalks(state),
      jumps: getValidJumps(state)
    }
  }
}

export { updateValidTargets }