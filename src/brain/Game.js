

import { move } from './nextState/move'
import { endTurn } from './nextState/endTurn'
import { selectCell } from './nextState/selectCell'
import { startMessage } from './nextState/messages'
import { restartGame } from './api'

const actions = {
  callAPI: 'CALL_API',
  success: "SUCCESS",
  error: "ERROR",
  endTurn: 'END_TURN',
  selectCell: 'SELECT_CELL',
  restart: 'RESTART'
}

// actions
function callAPIAction() {
  return {
    // end turn action
    type: actions.callAPI,
    payload: {}
  }
}

function successAction(game) {
  return {
    // end turn action
    type: actions.success,
    payload: { game }
  }
}
function errorAction(error) {
  return {
    // end turn action
    type: actions.success,
    payload: { error }
  }
}

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
    case actions.callAPI: {
      return {
        ...state,
        loading: true
      }
    }
    case actions.success: {
      return {
        ...state,
        game: action.payload.game,
        loading: false,
        error: undefined
      }
    }
    case actions.error: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    }
    // END_TURN
    case actions.endTurn: {
      return {
        ...state,
        game: endTurn(state.game)
      }
    }
    // SELECT_CELL
    case actions.selectCell: {
      return {
        ...state,
        game: selectCell(state.game, action.payload.target)
      }
    }
    // RESTART
    case actions.restart: {
      return {
        ...state,
        game: restartGame(state.icons)
      }
    }
    default: {
      return state
    }
  }
}

export { callAPIAction, successAction, errorAction, endTurnAction, selectCellAction, restartGameAction, gameBrain }
