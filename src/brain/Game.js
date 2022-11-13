import { move } from './nextState/move'
import { endTurn } from './nextState/endTurn'
import { selectCell } from './nextState/selectCell'
import { startMessage } from './nextState/messages'

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
    icons,
    actionsHistory: [],
    board: START_BOARD,
    playerTurn: 1,
    endTurnAllowed: false,
    message: startMessage(icons),

    selectedCell: undefined,
    validTargets: {
      walks: {},
      jumps: {}
    },

    winnerFinished: false,
    win: 0,
    loserFinished: false,
    score: 0,
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

export { endTurnAction, selectCellAction, restartGameAction, gameBrain, createInitState }
