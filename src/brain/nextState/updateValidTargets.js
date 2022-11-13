import { arrayEquals, trace } from '../../util'
import { hasntJumpedYet } from '../checks'


const isSafeIndex = (len) => (i) => {
  return i >= 0 && i < len
}

const getIndexArrBuilder = (step) => (start, len) => {
  return [ start - step, start, start + step ].filter(isSafeIndex(len))
}

function getValidWalks(state) {
  const walks = {}
  if (!state.selectedCell) { return walks }

  const startPos = state.selectedCell.position
  trace('startPos')(startPos)
  if (hasntJumpedYet(state)) {
    // add walk moves
    // It has to be an empty cell around startPos
    const getIndexArr = getIndexArrBuilder(1)
    const rowsIs = getIndexArr(startPos[ 0 ], state.board.length)
    const colsIs = getIndexArr(startPos[ 1 ], state.board[ 0 ].length)


    rowsIs.forEach(r => {
      colsIs.forEach(c => {
        if (state.board[ r ][ c ] === 0) {
          walks[ r ] ? walks[ r ].push(c) : walks[ r ] = [ c ]
        }
      })
    })
  }
  return walks
}

const jumpingOverIndex = (startIndex, targetIndex) => { return ((targetIndex + startIndex) / 2) }

function getValidJumps(state) {
  const jumps = {}
  if (!state.selectedCell) { return jumps }

  const startPos = state.selectedCell.position

  const getIndexArr = getIndexArrBuilder(2)
  const rowsIs = getIndexArr(startPos[ 0 ], state.board.length)
  const colsIs = getIndexArr(startPos[ 1 ], state.board[ 0 ].length)


  rowsIs.forEach(r => {
    colsIs.forEach(c => {

      if (
        state.board[ r ][ c ] === 0 &&
        state.board[ jumpingOverIndex(startPos[ 0 ], r) ][ jumpingOverIndex(startPos[ 1 ], c) ] !== 0
      ) {
        if (state.endTurnAllowed) {
          // previous target is the only one allowed to be the start
          if (arrayEquals(state.actionsHistory[ state.actionsHistory.length - 1 ][ 1 ], startPos)) {
            jumps[ r ] ? jumps[ r ].push(c) : jumps[ r ] = [ c ]
          }
        } else {
          jumps[ r ] ? jumps[ r ].push(c) : jumps[ r ] = [ c ]
        }
      }
    })
  })
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