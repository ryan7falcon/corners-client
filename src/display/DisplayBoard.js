import { createUseStyles } from 'react-jss'
import { positionIsInArray, arrayEquals, trace } from '../util'
import { isValidWalk, isValidJump, allowedToDeselect, isSelected, isOwnTarget } from '../brain/checks'
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
function DisplayBoard({ state, handleSelectCell }) {
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
                  state={state}
                  handleSelect={handleSelectCell}
                  target={target}
                  key={target.position}
                  isSelected={isSelected(state, target)}
                  isValidWalk={isValidWalk(state, target)}
                  isValidJump={isValidJump(state, target)}
                  isOwnCell={isOwnTarget(state, target)}
                  canDeselect={allowedToDeselect(state, target)}
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
