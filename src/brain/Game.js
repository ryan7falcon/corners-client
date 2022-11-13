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
  return {
    board: START_BOARD,
    playerTurn: 1,
    endTurnAllowed: false,
    win: 0,
    winnerFinished: false,
    actionsHistory: [],
    icons,
    message: startMessage(getPlayerIcon(icons)),
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
  endTurn: 'END_TURN',
  selectCell: 'SELECT_CELL',
  restart: 'RESTART'
}

// actions
function endTurnAction() {
  return {
    // end turn action
    type: actions.endTurn,
    payload: {}
  }
}

function selectCellAction(target) {
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

export { endTurnAction, selectCellAction, restartGameAction, gameBrain, createInitState, getPlayerIcon }
