import { gameBrain, createInitState, moveAction, selectCellAction, endTurnAction } from './Game'

/*
beforeEach(()=>{

})
*/
// =============== MOVE =================
describe('selectCellAction', () => {

  test('move: valid', () => {
    const state = createInitState()

    const target1 = { rowIndex: 6, columnIndex: 0, piece: 1 }
    const selectedState = gameBrain(state, selectCellAction(target1))

    const target2 = {
      rowIndex: 4, columnIndex: 2, piece: 0
    }
    const endState = gameBrain(selectedState, selectCellAction(target2))

    expect(endState).toEqual(expect.objectContaining({
      board: [
        [0, 0, 0, 0, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 2],
        [1, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0]]
    }))
  })

  test('move: walking must force end of turn', () => {
    const state = createInitState()
    const target1 = { rowIndex: 4, columnIndex: 0, piece: 1 }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = { rowIndex: 4, columnIndex: 1, piece: 0 }

    const endState = gameBrain(selectedState, selectCellAction(target2))

    expect(endState).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2
    }))
  })

  test('must not select null cells', () => {
    const state = createInitState()
    const target = {
      rowIndex: 0, columnIndex: 0, piece: 0
    }

    expect(gameBrain(state, selectCellAction(target))
    ).toEqual(state)
  })

  test('must not select pieces of other player', () => {
    const state = createInitState()
    const target = {
      rowIndex: 0, columnIndex: 7, piece: 2
    }

    expect(gameBrain(state, selectCellAction(target))
    ).toEqual(state)
  })

  test('must not allow selecting other piece after jumping ', () => {
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
    state.selectedCell = { position: [4, 1], piece: 1 }
    const target = { position: [5, 1], piece: 1 }

    expect(
      gameBrain(state, selectCellAction(target))
    ).toEqual(state)
  })
})

// =============== END TURN =================
describe('Testing End Turn', () => {

  test('End Turn with endTurnAllowed: false', () => {
    const state = createInitState()

    expect(() => gameBrain(state, endTurnAction())).toThrow('End Turn is not allowed')
  })

  test('End Turn with endTurnAllowed: true', () => {
    const state = createInitState()
    state.endTurnAllowed = true

    expect(gameBrain(state, endTurnAction())).toEqual(expect.objectContaining({
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

    expect(gameBrain(state, endTurnAction())).toEqual(expect.objectContaining({
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

    expect(gameBrain(state, endTurnAction())).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 2,
      gameOver: true
    }))
  })
})


