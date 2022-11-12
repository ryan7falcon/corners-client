import { move } from './nextState/move'
import { endTurn } from './nextState/endTurn'
import { selectCell } from './nextState/selectCell'
import { startMessage } from './nextState/messages'

const getPlayerIcon = (icons) => (player) => (player === 1) ? icons[ 0 ] : (player === 2) ? icons[ 1 ] : ''

const createInitState = (icons = [ '💩', '💎' ]) => {
  const START_BOARD = [
    [ 0, 0, 0, 0, 2, 2, 2, 2 ],
    [ 0, 0, 0, 0, 0, 2, 2, 2 ],
    [ 0, 0, 0, 0, 0, 0, 2, 2 ],
    [ 0, 0, 0, 0, 0, 0, 0, 2 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 0, 0, 0, 0 ]
  ]
  // const START_BOARD = [
  //   [ 0, 0, 0, 0, 1, 1, 1, 1 ],
  //   [ 0, 0, 0, 0, 0, 1, 1, 1 ],
  //   [ 0, 0, 0, 0, 0, 0, 0, 1 ],
  //   [ 0, 0, 0, 0, 0, 0, 1, 1 ],
  //   [ 2, 0, 0, 0, 0, 0, 0, 0 ],
  //   [ 2, 2, 2, 0, 0, 0, 0, 0 ],
  //   [ 2, 2, 0, 0, 0, 0, 0, 0 ],
  //   [ 2, 2, 2, 2, 0, 0, 0, 0 ]
  // ]
  const getIcon = getPlayerIcon(icons)
  return {
    board: START_BOARD,
    playerTurn: 1,
    endTurnAllowed: false,
    win: 0,
    winnerFinished: false,
    actionsHistory: [],
    icons,
    getIcon,
    message: startMessage(getIcon),
    selectedCell: undefined,
    score: 0,
    looserFinished: false,
    validTargets: {
      walks: {},
      jumps: {}
    }
  }
}

const actions = {
  move: 'MOVE',
  endTurn: 'END_TURN',
  selectCell: 'SELECT_CELL',
  restart: 'RESTART'
}

// actions
function moveAction(startPos, targetPos, isWalk) {
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

function endTurnAction() {
  return {
    // end turn action
    type: actions.endTurn,
    payload: {}
  }
}

function selectCellAction({
  rowIndex, columnIndex, piece
}) {
  const target = {
    position: [ rowIndex, columnIndex ],
    piece
  }
  return {
    type: actions.selectCell,
    payload: {
      target
    }
  }
}
const restartGameAction = () => {
  return {
    type: actions.restart,
    payload: {}
  }
}
// reducer
function gameBrain(state, action) {
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
    // RESTART
    case actions.restart: {
      return createInitState(state.icons)
    }
    default: {
      return state
    }
  }
}

export { endTurnAction, moveAction, selectCellAction, restartGameAction, gameBrain, createInitState }
