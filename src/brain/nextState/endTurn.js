import { deselect } from './selectCell'
import { validateState } from '../validateStateAndTarget'
import { playerTurnMessage, gameOverMessage } from './messages'

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

function checkPlayerWin(board, player) {
  for (const [ i, row ] of board.entries()) {
    for (const [ j, el ] of row.entries()) {
      if (el === player && el !== WIN_MASK[ player - 1 ][ i ][ j ]) {
        return false
      }
    }
  }
  return true
}

const getOtherPlayer = (playerTurn) => playerTurn === 2 ? 1 : 2

const looserFinishing = (state) => {
  const score = state.score + 1
  const result = {
    endTurnAllowed: false,
    score
  }
  // check if looser finished
  if (checkPlayerWin(state.board, state.playerTurn)) {
    result.turnMessage = gameOverMessage
    result.loserFinished = true
  } else {
    result.turnMessage = playerTurnMessage(state.icons, state.playerTurn)
  }
  return result
}

const winnerJustFinished = (state) => {
  const nextPlayer = getOtherPlayer(state.playerTurn)
  return {
    endTurnAllowed: false,
    winnerFinished: true,
    win: state.playerTurn,
    playerTurn: nextPlayer,
    turnMessage: playerTurnMessage(state.icons, nextPlayer)
  }
}

const switchTurnsAndMessage = (state) => {
  const nextPlayer = getOtherPlayer(state.playerTurn)
  return {
    endTurnAllowed: false,
    playerTurn: nextPlayer,
    turnMessage: playerTurnMessage(state.icons, nextPlayer)
  }
}

// Get next state: end turn
function endTurn(state) {
  validateState(state)
  if (!state.endTurnAllowed) {
    throw new Error('End Turn is not allowed')
  }

  let update = {}
  // if first player already finished
  if (state.winnerFinished) {
    update = looserFinishing(state)
  } else if (checkPlayerWin(state.board, state.playerTurn)) {
    // if winner just finished
    update = winnerJustFinished(state)
  } else {
    // else game continues as normal 
    update = switchTurnsAndMessage(state)
  }

  return deselect({ ...JSON.parse(JSON.stringify(state)), ...update })
}

export { endTurn }