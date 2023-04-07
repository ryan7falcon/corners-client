import { createUseStyles } from 'react-jss'
import { positionIsInArray, arrayEquals, trace } from '../../util'
import { isValidWalk, isValidJump, allowedToDeselect, isSelected, isOwnTarget } from '../../brain/checks'
import Cell from './Cell'
import LocationLabel from './LocationLabel'
import { letters, getNumber } from '../../brain/notation'

const useStyles = createUseStyles({
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'calc(10px + 1vmin)',
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
function DisplayBoard({ state, handleSelectCell, isPlayersTurn, icon }) {
  const classes = useStyles()

  const lastTurn = state.actionsHistory.slice(-1)[ 0 ]
  const lastTurnPlayerIcon = state.icons[ (state.actionsHistory.length - 1) % 2 ]
  const lastMoveTarget = lastTurn && lastTurn.slice(-1)[ 0 ][ 1 ]
  console.log('lastMoveTarget', lastMoveTarget)
  console.log('lastTurn', lastTurn)
  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {
          state.board.map((row, rowIndex) => (
            <div className={classes.row} key={rowIndex}>
              {LocationLabel(getNumber(rowIndex))}
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
                  isSelected={isPlayersTurn && isSelected(state, target)}
                  isValidWalk={isPlayersTurn && isValidWalk(state, target)}
                  isValidJump={isPlayersTurn && isValidJump(state, target)}
                  isOwnCell={isPlayersTurn && isOwnTarget(state, target)}
                  canDeselect={isPlayersTurn && allowedToDeselect(state, target)}
                  lastTurnLastMoveTarget={lastTurn && arrayEquals(lastMoveTarget, target.position)}
                  lastTurnAnyMove={lastTurn && (lastTurn.findLastIndex((move) => arrayEquals(move[ 0 ], target.position)) + 1) / lastTurn.length}
                  icon={icon}
                  lastTurnPlayerIcon={lastTurnPlayerIcon}
                />
              })}
            </div>
          ))
        }
        <div className={classes.row} key={'letters'}>
          {letters.map((letter) => LocationLabel(letter))}
        </div>
      </div>
    </div>
  )
}


export default DisplayBoard
