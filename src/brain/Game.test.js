import { gameBrain, createInitState, moveAction, selectCellAction, endTurnAction } from './Game'

// =============== SELECT CELL =================
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
        [ 0, 0, 0, 0, 2, 2, 2, 2 ],
        [ 0, 0, 0, 0, 0, 2, 2, 2 ],
        [ 0, 0, 0, 0, 0, 0, 2, 2 ],
        [ 0, 0, 0, 0, 0, 0, 0, 2 ],
        [ 1, 0, 1, 0, 0, 0, 0, 0 ],
        [ 1, 1, 0, 0, 0, 0, 0, 0 ],
        [ 0, 1, 1, 0, 0, 0, 0, 0 ],
        [ 1, 1, 1, 1, 0, 0, 0, 0 ] ]
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
      [ 0, 0, 0, 0, 2, 2, 2, 2 ],
      [ 0, 0, 0, 0, 0, 2, 2, 2 ],
      [ 0, 0, 0, 0, 0, 0, 0, 2 ],
      [ 0, 0, 0, 0, 0, 2, 2, 0 ],
      [ 1, 1, 0, 0, 0, 0, 0, 0 ],
      [ 1, 1, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 1, 0, 0, 0, 0 ] ]
    state.actionsHistory = [ [ 6, 1 ], [ 4, 1 ] ]
    state.endTurnAllowed = true
    state.selectedCell = { position: [ 4, 1 ], piece: 1 }
    const target = { position: [ 5, 1 ], piece: 1 }

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
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 1 ],
      [ 0, 0, 0, 0, 2, 0, 0, 1 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0, 0, 0, 0 ]
    ]
    let state = { endTurnAllowed: true, playerTurn: 1, board, actionsHistory: [], icons: [ '1', '2' ] }

    expect(gameBrain(state, endTurnAction())).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 1,
      winnerFinished: true
    }))

    board = [
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 1 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state = { endTurnAllowed: true, playerTurn: 2, board, actionsHistory: [], icons: [ '1', '2' ] }

    expect(gameBrain(state, endTurnAction())).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 1,
      win: 2,
      winnerFinished: true
    }))
  })

  test('should switch turns after walk that results in game end to the player that lost and keep status game ove', () => {

    const state = createInitState()
    state.board = [
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 1 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state.actionsHistory = [ [ [ 6, 0 ], [ 4, 2 ] ] ]
    const target1 = {
      rowIndex: 3, columnIndex: 6, piece: 1
    }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = {
      rowIndex: 2, columnIndex: 6, piece: 0
    }

    expect(gameBrain(selectedState, selectCellAction(target2))
    ).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 1,
      winnerFinished: true
    }))
  })

  test('should switch turns after jump that results in game end to the player that lost and keep status game over', () => {

    const state = createInitState()
    state.board = [
      [ 0, 0, 0, 0, 1, 1, 1, 0 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 1 ],
      [ 2, 0, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state.actionsHistory = [ [ [ 6, 0 ], [ 4, 2 ] ] ]
    const target1 = {
      rowIndex: 2, columnIndex: 5, piece: 1
    }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = {
      rowIndex: 0, columnIndex: 7, piece: 0
    }
    const jumpedState = gameBrain(selectedState, selectCellAction(target2))

    expect(gameBrain(jumpedState, endTurnAction())
    ).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 1,
      winnerFinished: true
    }))
  })

  test('dont switch turns after game is over to allow the other player finish the game', () => {
    const state = createInitState()
    state.board = [
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 1 ],
      [ 2, 0, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state.actionsHistory = []
    state.winnerFinished = true
    state.win = 1
    state.playerTurn = 2

    const target1 = {
      rowIndex: 4, columnIndex: 2, piece: 2
    }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = {
      rowIndex: 5, columnIndex: 2, piece: 0
    }

    expect(gameBrain(selectedState, selectCellAction(target2))
    ).toEqual(expect.objectContaining({
      endTurnAllowed: false,
      playerTurn: 2,
      win: 1,
      winnerFinished: true
    }))

  })

  test('keep counting score while the other player finish the game', () => {
    const state = createInitState()
    state.board = [
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 1 ],
      [ 2, 0, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state.actionsHistory = []
    state.winnerFinished = true
    state.win = 1
    state.playerTurn = 2

    const target1 = {
      rowIndex: 4, columnIndex: 2, piece: 2
    }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = {
      rowIndex: 5, columnIndex: 2, piece: 0
    }

    expect(gameBrain(selectedState, selectCellAction(target2))
    ).toEqual(expect.objectContaining({
      score: 1,
      winnerFinished: true,
      looserFinished: false
    }))
  })

  test('Game state is finished when the second player finishes', () => {
    const state = createInitState()
    state.board = [
      [ 0, 0, 0, 0, 1, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 1, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 1, 1 ],
      [ 0, 0, 0, 0, 0, 0, 0, 1 ],
      [ 2, 0, 2, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 0, 0, 0, 0, 0, 0 ],
      [ 2, 2, 2, 2, 0, 0, 0, 0 ]
    ]
    state.actionsHistory = []
    state.winnerFinished = true
    state.win = 1
    state.playerTurn = 2

    const target1 = {
      rowIndex: 4, columnIndex: 2, piece: 2
    }
    const selectedState = gameBrain(state, selectCellAction(target1))
    const target2 = {
      rowIndex: 5, columnIndex: 2, piece: 0
    }
    const unfinishedState = gameBrain(selectedState, selectCellAction(target2))
    const target3 = {
      rowIndex: 5, columnIndex: 2, piece: 2
    }
    const unfinishedSelectedState = gameBrain(unfinishedState, selectCellAction(target3))
    const target4 = {
      rowIndex: 6, columnIndex: 2, piece: 0
    }
    const finsishedState = gameBrain(unfinishedSelectedState, selectCellAction(target4)
    // should add to the score and change looserFinished state to true
    expect(finsishedState)
    ).toEqual(expect.objectContaining({
      score: 2,
      winnerFinished: true,
      looserFinished: true
    }))
    const target5 = {
      rowIndex: 7, columnIndex: 0, piece: 2
    }
    // should not allow selection anymore - game is over
    expect(gameBrain(finsishedState, selectCellAction(target5))
    ).toEqual(expect.objectContaining({
      selectedCell: undefined,
      score: 2,
      winnerFinished: true,
      looserFinished: true
    }))
  })
})


