import { move } from './move'
import { endTurn } from './endTurn'
import { selectCell } from './selectCell'

const createInitState = (icons = ['💩', '💎']) => {
  const START_BOARD = [
    [0, 0, 0, 0, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 2],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0]
  ]
  return {
    board: START_BOARD,
    playerTurn: 1,
    endTurnAllowed: false,
    win: 0,
    gameOver: false,
    actionsHistory: [],
    icons,
    message: `Player ${icons[0]} turn`,
    selectedCell: undefined,
    validTargets: {
      walks: [],
      jumps: []
    }
  }
}

const actions = {
  move: 'MOVE',
  endTurn: 'END_TURN',
  selectCell: 'SELECT_CELL'
}

// actions
function moveAction (startPos, targetPos, isWalk) {
  return {
    // move action
    type: actions.move,
    payload: {
      move: {
        startPos,
        targetPos,
        isWalk
      }
    }
  }
}

function endTurnAction () {
  return {
    // end turn action
    type: actions.endTurn,
    payload: {}
  }
}

function selectCellAction (target) {
  return {
    type: actions.selectCell,
    payload: {
      target
    }
  }
}

// reducer
function gameBrain (state, action) {
  switch (action.type) {
    // MOVE
    case actions.move: {
      return move(state,
        action.payload.move.startPos,
        action.payload.move.targetPos,
        action.payload.move.isWalk)
    }
    // END_TURN
    case actions.endTurn: {
      return endTurn(state)
    }
    // SELECT_CELL
    case actions.selectCell: {
      return selectCell(state, action.payload.target)
    }
    default: {
      return state
    }
  }
}

export { endTurnAction, moveAction, selectCellAction, gameBrain, createInitState }
