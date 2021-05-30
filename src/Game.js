
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

const START_STATE = {
  board: START_BOARD,
  playerTurn: 1,
  endTurnAllowed: false,
  win: 0,
  gameOver: false,
  actionsHistory: [],
  message: 'Player 💩 turn',
  icons: ['💩', '💎']
}

const createInitState = (icons) => {
  return {
    ...START_STATE,
    icons,
    message: `player ${icons[0]} turn`
  }
}

const actions = {
  move: 'MOVE',
  endTurn: 'END_TURN'
}

// actions
function moveAction (startPos, targetPos) {
  return {
    // move action
    type: actions.move,
    payload: {
      move: {
        startPos,
        targetPos
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

// reducer
function gameBrain (state, action) {
  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [...state.actionsHistory] }

  switch (action.type) {
    // MOVE
    case actions.move: {
      const [x, y] = action.payload.move.startPos
      const [newX, newY] = action.payload.move.targetPos

      // TODO: check if valid move
      newState.board[newX][newY] = newState.board[x][y]
      newState.board[x][y] = 0
      newState.endTurnAllowed = true
      newState.message = `Player ${newState.playerTurn}: ${action.payload.move.startPos} to ${action.payload.move.targetPos}`
      newState.actionsHistory.push(newState.message)

      return newState
    }
    // END_TURN
    case actions.endTurn: {
      if (newState.endTurnAllowed) {
        // switch turns
        newState.playerTurn = newState.playerTurn === 2 ? 1 : 2
        newState.endTurnAllowed = false

        // TODO: check win
        newState.message = `Player ${newState.icons[newState.playerTurn - 1]} turn`
      } else {
        newState.message = 'End Turn is not allowed'
      }
      newState.actionsHistory.push(newState.message)
      return newState
    }
    default: {
      return newState
    }
  }
}

export { endTurnAction, moveAction, gameBrain, START_STATE, ONE_WIN_MASK, TWO_WIN_MASK, createInitState }
