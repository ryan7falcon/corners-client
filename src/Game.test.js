import { move, endTurn, START_BOARD, isValidMove, createInitState, getValidTargetsForStateAndStartPos } from './Game'

/*
beforeEach(()=>{

})
*/
// =============== MOVE =================
describe('Testing move', () => {
  test('Move function with empty state', () => {
    const state = {}
    const startPos = []
    const targetPos = []

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('State must be a non-empty object, starting position and target must not be empty')
  })

  test('Move function with empty pos', () => {
    const state = { a: 1 }
    const startPos = [1]
    const targetPos = []

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('startPos and targetPos must be arrays of two elements')
  })

  test('move with state without a board', () => {
    const state = { a: 1 }
    const startPos = [1, 2]
    const targetPos = [2, 2]

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('state must have a "board" property that is a 2-dimentional array')
  })

  test('move with state without actionsHistory', () => {
    const state = { board: START_BOARD }
    const startPos = [1, 2]
    const targetPos = [2, 2]

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('state must have a "actionsHistory" property that is a 1-dimentional array')
  })

  test('move with state with an improper board', () => {
    const state = { board: [1, 2, 3], actionsHistory: [] }
    const startPos = [1, 2]
    const targetPos = [2, 2]

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('state must have a "board" property that is a 2-dimentional array')
  })

  test('move without icons', () => {
    const state = { board: START_BOARD, actionsHistory: [] }
    const startPos = [1, 2]
    const targetPos = [2, 2]

    expect(() => {
      move(state, startPos, targetPos, true)
    }).toThrow('state must have an "icons" property that is a 1-dimentional array')
  })

  test('move: valid', () => {
    const state = { board: START_BOARD, actionsHistory: [], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [6, 0]
    const targetPos = [4, 2]

    expect(move(state, startPos, targetPos, false)).toEqual(expect.objectContaining({
      board: [[0, 0, 0, 0, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 2],
        [1, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0]]
    }))
  })

  test('move: invalid - wrong player', () => {
    const state = { board: START_BOARD, actionsHistory: [], icons: ['1', '2'], playerTurn: 2 }
    const startPos = [6, 0]
    const targetPos = [4, 2]

    expect(() => move(state, startPos, targetPos, false)).toThrow('invalid move')
  })

  test('move: invalid - target not empty', () => {
    const state = { board: START_BOARD, actionsHistory: [], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [6, 0]
    const targetPos = [5, 1]

    expect(() => move(state, startPos, targetPos, false)).toThrow('invalid move')
  })

  test('move: invalid - start is empty', () => {
    const state = { board: START_BOARD, actionsHistory: [], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [0, 0]
    const targetPos = [1, 1]

    expect(() => move(state, startPos, targetPos, true)).toThrow('invalid move')
  })

  test('move: invalid - illigal move/jump', () => {
    const state = { board: START_BOARD, actionsHistory: [], icons: ['1', '2'], playerTurn: 1 }
    let startPos = [6, 0]
    let targetPos = [4, 4]

    expect(() => move(state, startPos, targetPos, false)).toThrow('invalid move')

    startPos = [6, 0]
    targetPos = [5, 2]

    expect(() => move(state, startPos, targetPos, false)).toThrow('invalid move')
  })

  test('move: invalid - must continue to jump with the same piece', () => {
    const board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]
    ]
    const state = { board, endTurnAllowed: true, actionsHistory: [[[6, 0], [4, 2]]], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [7, 0]
    const targetPos = [5, 2]

    expect(() => move(state, startPos, targetPos, false)).toThrow('invalid move')
  })

  test('move: invalid - cant walk after jumping', () => {
    const board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]
    ]
    const state = { board, endTurnAllowed: true, actionsHistory: [[[6, 0], [4, 2]]], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [4, 2]
    const targetPos = [4, 3]

    expect(() => move(state, startPos, targetPos, true)).toThrow('invalid move')
  })

  test('move: walking must force end of turn', () => {
    const state = { board: START_BOARD, endTurnAllowed: false, actionsHistory: [], icons: ['1', '2'], playerTurn: 1 }
    const startPos = [4, 0]
    const targetPos = [4, 1]

    expect(move(state, startPos, targetPos, true)).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2
    }))
  })
})

// =============== END TURN =================
describe('Testing End Turn', () => {
  test('End Turn without the state', () => {
    const state = {}

    expect(() => {
      endTurn(state)
    }).toThrow('State must be a non-empty object')
  })

  test('End Turn with state without a board', () => {
    const state = { a: 1 }

    expect(() => {
      endTurn(state)
    }).toThrow('state must have a "board" property that is a 2-dimentional array')
  })

  test('End Turn with state without actionsHistory', () => {
    const state = { board: START_BOARD }

    expect(() => {
      endTurn(state)
    }).toThrow('state must have a "actionsHistory" property that is a 1-dimentional array')
  })

  test('End Turn without icons', () => {
    const state = { endTurnAllowed: false, playerTurn: 1, board: START_BOARD, actionsHistory: [] }
    expect(() => {
      endTurn(state)
    }).toThrow('state must have an "icons" property that is a 1-dimentional array')
  })

  test('End Turn with endTurnAllowed: false', () => {
    const state = { endTurnAllowed: false, playerTurn: 1, board: START_BOARD, actionsHistory: [], icons: ['1', '2'] }

    expect(() => endTurn(state)).toThrow('End Turn is not allowed')
  })

  test('End Turn with endTurnAllowed: true', () => {
    const state = { endTurnAllowed: true, playerTurn: 1, board: START_BOARD, actionsHistory: [], icons: ['1', '2'] }

    expect(endTurn(state)).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2
    }))
  })

  test('End Turn with win position must end the game', () => {
    let board = [
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 2, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0]
    ]
    let state = { endTurnAllowed: true, playerTurn: 1, board, actionsHistory: [], icons: ['1', '2'] }

    expect(endTurn(state)).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 1,
      win: 1,
      gameOver: true
    }))

    board = [
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0, 0],
      [2, 2, 2, 2, 0, 0, 0, 0]
    ]
    state = { endTurnAllowed: true, playerTurn: 2, board, actionsHistory: [], icons: ['1', '2'] }

    expect(endTurn(state)).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 2,
      gameOver: true
    }))
  })
})

describe('Testing getValidTargetsForStateAndStartPos', () => {
  test('targets for wrong player or null', () => {
    const state = createInitState()

    expect(() =>
      getValidTargetsForStateAndStartPos(state, [0, 0])
    ).toThrow()
  })

  test('should not allow walks after jump', () => {
    const state = createInitState()
    state.board[6][0] = 0
    state.board[4][2] = 1
    state.endTurnAllowed = true
    state.actionsHistory = [[[6, 0], [4, 2]]]
    expect(
      getValidTargetsForStateAndStartPos(state, [4, 2])
    ).toEqual({ jumps: [[6, 0]], walks: [] })
  })

  // TODO: debug this
  test('should allow jumps and walks in the beginning of the turn', () => {
    const state = createInitState()
    expect(
      getValidTargetsForStateAndStartPos(state, [5, 0])
    ).toEqual({ jumps: [[3, 0], [5, 2]], walks: [[4, 1]] })
  })

  test('must jump over pieces on empty space', () => {
    const state = createInitState()
    state.board = [[0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]]
    expect(
      getValidTargetsForStateAndStartPos(state, [5, 2])
    ).toEqual({ jumps: [[5, 4]], walks: [[4, 1], [4, 2], [4, 3], [6, 1], [6, 2], [6, 3]] })
  })

  test('must allow jumping after jumping with the same piece', () => {
    const state = createInitState()
    state.board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]]
    state.actionsHistory = [[6, 1], [4, 1]]
    state.endTurnAllowed = true
    expect(
      getValidTargetsForStateAndStartPos(state, [4, 1])
    ).toEqual({ jumps: [[4, 3], [6, 1]], walks: [] })
  })

  test('must not allow jumping after jumping with the different piece', () => {
    const state = createInitState()
    state.board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]]
    state.actionsHistory = [[6, 1], [4, 1]]
    state.endTurnAllowed = true
    expect(
      getValidTargetsForStateAndStartPos(state, [5, 1])
    ).toEqual({ jumps: [], walks: [] })
  })
}

)
