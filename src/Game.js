
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
  message: 'Player 💩 turn'
}

const createInitState = (icons = ['💩', '💎']) => {
  return {
    ...START_STATE,
    icons,
    message: `Player ${icons[0]} turn`
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
  switch (action.type) {
    // MOVE
    case actions.move: {
      return move(state, action.payload.move.startPos, action.payload.move.targetPos)
    }
    // END_TURN
    case actions.endTurn: {
      return endTurn(state)
    }
    default: {
      return state
    }
  }
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

// Get next state: Move
function move (state, startPos, targetPos) {
  // checks for valid input data format
  if (!state || !isObject(state) || Object.entries(state).length === 0 || !startPos || !targetPos) {
    throw new Error('State must be a non-empty object, starting position and target must not be empty')
  }

  if (!Array.isArray(startPos) || !Array.isArray(targetPos) || startPos.length !== 2 || targetPos.length !== 2) {
    throw new Error('startPos and targetPos must be arrays of two elements')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'board') || !Array.isArray(state.board) || !Array.isArray(state.board[0])) {
    throw new Error('state must have a "board" property that is a 2-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'actionsHistory') || !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have a "actionsHistory" property that is a 1-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'icons') || !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have an "icons" property that is a 1-dimentional array')
  }

  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [...state.actionsHistory] }
  const [x, y] = startPos
  const [newX, newY] = targetPos

  // check if valid move
  if (isValidMove(getAllValidMoves(newState), [startPos, targetPos])) {
    newState.board[newX][newY] = newState.board[x][y]
    newState.board[x][y] = 0
    newState.endTurnAllowed = true
    newState.message = `Player ${newState.icons[newState.playerTurn - 1]}: ${startPos} to ${targetPos}`
    newState.actionsHistory.push([startPos, targetPos])
  } else throw new Error('invalid move')

  return newState
}

function arrayEquals (a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
}

function isValidMove (validMoves, m) {
  if (!Array.isArray(validMoves)) {
    throw new Error('validMoves must be an array')
  }
  if (!Array.isArray(m)) {
    throw new Error('m must be an array')
  }

  return validMoves.some(ar => (arrayEquals(ar[0], m[0]) && arrayEquals(ar[1], m[1])))
}

function getAllValidMoves (state) {
  const result = []
  const startPositions = getAllOwnPositions(state)
  for (const startPos of startPositions) {
    result.push(...getValidMovesFor(state, startPos))
  }
  return result
}

function getAllOwnPositions (state) {
  const positions = []
  state.board.forEach((row, i) => (row.forEach((el, j) => {
    if (el === state.playerTurn) {
      positions.push([i, j])
    }
  })))
  return positions
}

function getValidMovesFor (state, startPos) {
  // TODO: calculate valid moves
  const result = [[[6, 0], [4, 2]], [[4, 0], [4, 1]]]
  return result
}

function isValidMoveFor (state, startPos, m) {
  return isValidMove(getValidMovesFor(state, startPos), m)
}

// TODO: check for winning positions
function checkWin (state) {
  return false
}

// Get next state: end turn
function endTurn (state) {
  // checks for valid input data format
  if (!state || !isObject(state) || Object.entries(state).length === 0) {
    throw new Error('State must be a non-empty object')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'board') || !Array.isArray(state.board) || !Array.isArray(state.board[0])) {
    throw new Error('state must have a "board" property that is a 2-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'actionsHistory') || !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have a "actionsHistory" property that is a 1-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'icons') || !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have an "icons" property that is a 1-dimentional array')
  }

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
  // newState.actionsHistory.push(newState.message)
  return newState
}

export { endTurnAction, moveAction, gameBrain, createInitState, move, endTurn, START_BOARD, getAllValidMoves, isValidMove, getValidMovesFor, isValidMoveFor }
