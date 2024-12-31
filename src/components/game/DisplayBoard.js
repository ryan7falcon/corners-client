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

const I = (x) => x
const reverse = (o) => o.slice().reverse()

function DisplayBoard({ state, handleSelectCell, isPlayersTurn, icon, reverseBoard }) {
  const classes = useStyles()

  const applyReverseF = (f) => reverseBoard ? f : I
  const maybeReverseBoard = applyReverseF(reverse)
  const compliment = (a) => (7 - a)
  const maybeComplimentLocation = applyReverseF((loc) => (loc.map(compliment)))

  const lastTurn = state.actionsHistory.slice(-1)[ 0 ]
  const lastTurnPlayerIcon = state.icons[ (state.actionsHistory.length - 1) % 2 ]
  const lastMoveTarget = lastTurn && (lastTurn.slice(-1)[ 0 ][ 1 ])
  console.log('lastMoveTarget', lastMoveTarget)
  console.log('lastTurn', lastTurn)
  console.log('reverseBoard', reverseBoard)


  const getMaybeReverseLocation = (position) => {
    const [ rowIndex, columnIndex ] = position
    return [ applyReverseF(compliment)(rowIndex), applyReverseF(compliment)(columnIndex) ]
  }

  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {
          maybeReverseBoard(state.board).map((row, rowIndex) => (
            <div className={classes.row} key={rowIndex}>
              {LocationLabel(getNumber(applyReverseF(compliment)(rowIndex)))}
              {maybeReverseBoard(row).map((x, columnIndex) => {
                const target = {
                  position: getMaybeReverseLocation([ rowIndex, columnIndex ]),
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
                  lastTurnAnyMove={lastTurn && (lastTurn.findLastIndex((move) => arrayEquals((move[ 0 ]), target.position)) + 1) / lastTurn.length}
                  icon={icon}
                  lastTurnPlayerIcon={lastTurnPlayerIcon}
                />
              })}
            </div>
          ))
        }
        <div className={classes.row} key={'letters'}>
          {maybeReverseBoard(letters).slice(0, -1).map((letter) => LocationLabel(letter))}
        </div>
      </div>
    </div>
  )
}


export default DisplayBoard
