import { createUseStyles } from 'react-jss'
import { positionIsInArray, arrayEquals } from '../util'
import { isValidWalk, isValidJump } from '../brain/checks'
import Cell from './Cell'

const useStyles = createUseStyles({
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'calc(10px + 7vmin)'
  },

  board: {
    display: 'flex',
    flexDirection: 'column'
  },

  row: {
    display: 'flex',
    flexDirection: 'row'
  }

})
// TODO: add row and column indecies (chessboard notation)
// TODO: make icons non-selectable as text
function DisplayBoard({ state, handleSelectCell, getIcon }) {
  const classes = useStyles()
  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {
          state.board.map((row, rowIndex) => (
            <div className={classes.row} key={rowIndex}>
              {row.map((x, columnIndex) => {
                const target = {
                  position: [ rowIndex, columnIndex ],
                  piece: x
                }
                return <Cell
                  handleSelect={handleSelectCell}
                  x={x}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  key={[ rowIndex, columnIndex ]}
                  isSelected={!!state.selectedCell && (arrayEquals(state.selectedCell.position, [ rowIndex, columnIndex ]))}
                  getIcon={getIcon}
                  isValidWalk={isValidWalk(state, target)}
                  isValidJump={isValidJump(state, target)}
                />
              })}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DisplayBoard
