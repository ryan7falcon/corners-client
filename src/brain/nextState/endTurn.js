import { deselect } from './selectCell'
import { validateState } from '../validateStateAndTarget'

function checkWin(state) {
  const ONE_WIN_MASK = [
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]

  const TWO_WIN_MASK = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0, 0]
  ]

  const WIN_MASK = [ONE_WIN_MASK, TWO_WIN_MASK]

  function checkPlayer(player) {
    for (const [i, row] of state.board.entries()) {
      for (const [j, el] of row.entries()) {
        if (el === player) {
          if (el !== WIN_MASK[player - 1][i][j]) {
            return false
          }
        }
      }
    }
    return true
  }

  return checkPlayer(1) || checkPlayer(2)
}

// Get next state: end turn
function endTurn(state) {
  validateState(state)

  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [...state.actionsHistory] }
  if (newState.endTurnAllowed) {
    // switch turns

    newState.endTurnAllowed = false

    if (checkWin(newState)) {
      newState.gameOver = true
      newState.win = newState.playerTurn
    } else {
      newState.playerTurn = newState.playerTurn === 2 ? 1 : 2
      newState.message = `Player ${newState.icons[newState.playerTurn - 1]} turn`
    }
  } else {
    throw new Error('End Turn is not allowed')
  }
  return deselect(newState)
}

export { endTurn }