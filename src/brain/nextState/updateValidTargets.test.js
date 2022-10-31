import { updateValidTargets } from './updateValidTargets'
import { gameBrain, createInitState, moveAction, selectCellAction, endTurnAction } from '../Game'
describe('Testing updateValidTargets', () => {


  test('should not allow walks after jump', () => {
    const state = createInitState()
    state.board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]
    ]
    state.endTurnAllowed = true
    state.actionsHistory = [[[6, 0], [4, 2]]]
    state.selectedCell = {
      position: [4, 2],
      piece: 1
    }

    expect(
      updateValidTargets(state)
    ).toEqual(expect.objectContaining({
      validTargets: {
        jumps: { 6: [0] },
        walks: {}
      }
    }))
  })

  test('should allow jumps and walks in the beginning of the turn', () => {
    const state = createInitState()
    state.selectedCell = { position: [5, 0], piece: 1 }

    expect(
      updateValidTargets(state)
    ).toEqual(expect.objectContaining({
      validTargets: {
        jumps: { 3: [0], 5: [2] },
        walks: { 4: [1] }
      }
    }))
  })

  test('must jump over pieces on empty space', () => {
    const state = createInitState()
    state.board = [
      [0, 0, 0, 0, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 2, 2, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0]]

    state.selectedCell = { position: [5, 2], piece: 1 }

    expect(
      updateValidTargets(state)
    ).toEqual(expect.objectContaining({
      validTargets: {
        jumps: { 5: [4] },
        walks: { 4: [1, 2, 3], 6: [1, 2, 3] }
      }
    }))
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
    state.actionsHistory = [[[6, 1], [4, 1]]]
    state.endTurnAllowed = true
    state.selectedCell = { position: [4, 1], piece: 1 }

    expect(
      updateValidTargets(state)
    ).toEqual(expect.objectContaining({
      validTargets: {
        jumps: { 4: [3], 6: [1] },
        walks: {}
      }
    }))
  })
}

)