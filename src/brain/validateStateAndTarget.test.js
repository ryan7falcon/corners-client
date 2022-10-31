import { validateState, validateStartAndTargetPos } from './validateStateAndTarget'
import { createInitState } from './Game'

describe('Validate state', () => {
  test('empty state throws', () => {
    const state = {}

    expect(() => {
      validateState(state)
    }).toThrow('State must be a non-empty object')
  })

  test('state without a board throws', () => {
    const state = createInitState()
    state.board = null

    expect(() => {
      validateState(state)
    }).toThrow('state must have a "board" property that is a 2-dimentional array')
  })

  test('state without actionsHistory throws', () => {
    const state = createInitState()
    state.actionsHistory = null

    expect(() => {
      validateState(state)
    }).toThrow('state must have a "actionsHistory" property that is a 1-dimentional array')
  })

  test('state with an improper board throws', () => {
    const state = createInitState()
    state.board = [1, 2, 3]

    expect(() => {
      validateState(state)
    }).toThrow('state must have a "board" property that is a 2-dimentional array')
  })

  test('state without icons throws', () => {
    const state = createInitState()
    state.icons = null

    expect(() => {
      validateState(state)
    }).toThrow('state must have an "icons" property that is a 1-dimentional array')
  })
})

describe('validateStartAndTargetPos', () => {
  test('0-length target pos throws', () => {
    const startPos = [1]
    const targetPos = []

    expect(() => {
      validateStartAndTargetPos(startPos, targetPos)
    }).toThrow('startPos and targetPos must be arrays of two elements')
  })
})