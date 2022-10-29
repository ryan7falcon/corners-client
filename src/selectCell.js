import { getValidTargetsForStateAndStartPos } from './move'
import { handleSelection } from './handlers' 

function deselect (state) {
  return {
    ...state,
    selectedCell: undefined
  }
}

function updateValidTargets(state) {
  if (state.selectedCell) {
    const validTargets = getValidTargetsForStateAndStartPos(state, state.selectedCell)
    return {
        ...state,
        validTargets
      }
  } else {
    return {
      ...state,
      validTargets: {
        jumps: [],
        walks: []
      }
    }
  }
}

function selectCell (state, target) {
  return updateValidTargets(handleSelection(state, target))
} 

export { selectCell, deselect, updateValidTargets }