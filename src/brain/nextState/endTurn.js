import { deselect } from './selectCell'
import { validateState } from '../validateStateAndTarget'

const ONE_WIN_MASK = [
  [ 0, 0, 0, 0, 1, 1, 1, 1 ],
  [ 0, 0, 0, 0, 0, 1, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ]
]

const TWO_WIN_MASK = [
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 2, 0, 0, 0, 0, 0, 0, 0 ],
  [ 2, 2, 0, 0, 0, 0, 0, 0 ],
  [ 2, 2, 2, 0, 0, 0, 0, 0 ],
  [ 2, 2, 2, 2, 0, 0, 0, 0 ]
]

const WIN_MASK = [ ONE_WIN_MASK, TWO_WIN_MASK ]

function checkPlayer(state, player) {
  for (const [ i, row ] of state.board.entries()) {
    for (const [ j, el ] of row.entries()) {
      if (el === player) {
        if (el !== WIN_MASK[ player - 1 ][ i ][ j ]) {
          return false
        }
      }
    }
  }
  return true
}

function checkWin(state) {
  return checkPlayer(state, 1) || checkPlayer(state, 2)
}

const switchPlayer = (playerTurn) => playerTurn === 2 ? 1 : 2

// Get next state: end turn
function endTurn(state) {
  validateState(state)

  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [ ...state.actionsHistory ] }
  if (newState.endTurnAllowed) {
    // switch turns

    newState.endTurnAllowed = false

    // if first player already finished
    if (newState.winnerFinished) {
      newState.score += 1
      // check if looser finished
      if (checkPlayer(state, newState.playerTurn)) {
        newState.message = 'Game Over!'
        newState.looserFinished = true
      } else {
        newState.message = `Player ${newState.icons[ newState.playerTurn - 1 ]} turn`
      }

    } else if (checkWin(newState)) {
      // if winner just finished
      newState.winnerFinished = true
      newState.win = newState.playerTurn
      newState.playerTurn = switchPlayer(newState.playerTurn)
    } else {
      // else game continues as normal 
      newState.playerTurn = switchPlayer(newState.playerTurn)
      newState.message = `Player ${newState.icons[ newState.playerTurn - 1 ]} turn`
    }

  } else {
    throw new Error('End Turn is not allowed')
  }
  return deselect(newState)
}

export { endTurn }