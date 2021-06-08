function arrayEquals (a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
}

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
    message: `Player ${icons[0]} turn`
  }
}

const actions = {
  move: 'MOVE',
  endTurn: 'END_TURN'
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
    default: {
      return state
    }
  }
}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
// ===================================MOVE===================================
// Get next state: Move
function move (state, startPos, targetPos, isWalk) {
  // checks for valid input data format
  if (!state || !isObject(state) || Object.entries(state).length === 0 ||
  !startPos || !targetPos) {
    throw new Error('State must be a non-empty object, starting position and target must not be empty')
  }

  if (!Array.isArray(startPos) || !Array.isArray(targetPos) ||
  startPos.length !== 2 || targetPos.length !== 2) {
    throw new Error('startPos and targetPos must be arrays of two elements')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'board') ||
  !Array.isArray(state.board) || !Array.isArray(state.board[0])) {
    throw new Error('state must have a "board" property that is a 2-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'actionsHistory') ||
  !Array.isArray(state.actionsHistory)) {
    throw new Error('state must have a "actionsHistory" property that is a 1-dimentional array')
  }

  if (!Object.prototype.hasOwnProperty.call(state, 'icons') ||
  !Array.isArray(state.icons)) {
    throw new Error('state must have an "icons" property that is a 1-dimentional array')
  }

  const newState = { ...state, board: JSON.parse(JSON.stringify(state.board)), actionsHistory: [...state.actionsHistory] }
  const [x, y] = startPos
  const [newX, newY] = targetPos

  // check if valid move
  if (isValidMoveForState(newState, [startPos, targetPos])) {
    newState.board[newX][newY] = newState.board[x][y]
    newState.board[x][y] = 0
    newState.message = `Player ${newState.icons[newState.playerTurn - 1]}: 
    ${startPos} to ${targetPos}`
    newState.actionsHistory.push([startPos, targetPos])
    newState.endTurnAllowed = true
    if (isWalk) {
      return endTurn(newState)
    }
  } else throw new Error('invalid move')

  return newState
}
// ===============================================================================

function positionIsInArray (arr, position) {
  if (!Array.isArray(position) || !Array.isArray(arr)) {
    throw new Error('arr and position must be arrays')
  }
  return arr.some(ar => arrayEquals(ar, position))
}

// function getAllValidMoves (state) {
//   const result = {}
//   const startPositions = getAllOwnPositions(state)
//   for (const startPos of startPositions) {
//     result[startPos.toString()] = getValidTargetsForStateAndStartPos(state, startPos)
//   }
//   return result
// }

function getAllOwnPositions (state) {
  const positions = [] // [[6,0],[7,0],...]
  state.board.forEach((row, i) => (row.forEach((el, j) => {
    if (el === state.playerTurn) {
      positions.push([i, j])
    }
  })))
  return positions
}

function getValidTargetsForStateAndStartPos (state, startPos) {
  // TODO: calculate valid moves
  // start must be own piece for the player who's turn it is
  if (!positionIsInArray(getAllOwnPositions(state), startPos)) {
    throw new Error('invalid move')
  }
  const walks = []
  const jumps = []
  // can walk if didn't jump yet
  if (!state.endTurnAllowed) {
    // add walk moves
    // It has to be an empty cell around startPos
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const targetRow = startPos[0] + i
        const targetCol = startPos[1] + j
        if (targetRow >= 0 && targetRow < state.board.length && targetCol >= 0 && targetCol < state.board[0].length && state.board[targetRow][targetCol] === 0) {
          walks.push([targetRow, targetCol])
        }
      }
    }
  }

  // jumps
  for (let i = -2; i <= 2; i += 2) {
    for (let j = -2; j <= 2; j += 2) {
      const targetRow = startPos[0] + i
      const targetCol = startPos[1] + j
      if (targetRow >= 0 &&
          targetRow < state.board.length &&
          targetCol >= 0 &&
          targetCol < state.board[0].length &&
          state.board[targetRow][targetCol] === 0 &&
          state.board[(targetRow + startPos[0]) / 2][(targetCol + startPos[1]) / 2] !== 0
      ) {
        if (state.endTurnAllowed) {
          // previous target is the only one allowed to be the start
          if (arrayEquals(state.actionsHistory[state.actionsHistory.length - 1][1], startPos)) {
            jumps.push([targetRow, targetCol])
          }
        } else {
          jumps.push([targetRow, targetCol])
        }
      }
    }
  }

  // console.log('allowedMoves for ', startPos, walks, jumps)
  return {
    walks,
    jumps
  }
}

function isValidMoveForState (state, m) {
  const targets = getValidTargetsForStateAndStartPos(state, m[0])
  return (positionIsInArray(targets.walks, m[1]) || positionIsInArray(targets.jumps, m[1]))
}

// TODO: check for winning positions
function checkWin (state) {
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

  function checkPlayer (player) {
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
// ========================END TURN=============================
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

  if (!Object.prototype.hasOwnProperty.call(state, 'icons') || !Array.isArray(state.icons)) {
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
// ===============================================================================

export { endTurnAction, moveAction, gameBrain, createInitState, move, endTurn, positionIsInArray, getValidTargetsForStateAndStartPos }
