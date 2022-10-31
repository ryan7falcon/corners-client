import { createUseStyles } from 'react-jss'
import { positionIsInArray, arrayEquals } from '../util'
import { isValidWalk, isValidJump } from '../brain/checks'
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
  },

  cell: {
    overflow: 'hidden',
    display: 'flex',
    width: 'calc(20px + 5vmin)',
    height: 'calc(20px + 5vmin)',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #555',
    position: 'relative',
    transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)',
    cursor: 'pointer',
    '&:hover': {
      '&:after': {
        left: '120%',
        transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)'
      }
    },
    '&:after': {
      position: 'absolute',
      content: "''",
      background: 'rgba(255,255,255,0.05)',
      zIndex: 10,
      width: 'calc(20px + 5vmin)',
      height: 'calc(20px + 5vmin)',
      top: '0',
      left: 'calc(-20px - 5vmin)',
      transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)'
    },
    '&:active': {
      fontSize: 'calc(10px + 4vmin)'
    }
  },
  selectedCell: {
    extend: 'cell',
    background: 'rgba(255,255,255,0.1)',
    '&:after': {
      transition: 'none'
    },
    '&:hover': {
      '&:after': {
        transition: 'none'
      }
    }
  },
  validTargetCell: {
    extend: 'cell',
    background: 'rgba(0,255,0,0.1)'
  }

})
// TODO: add row and column indecies (chessboard notation)
// TODO: make icons non-selectable as text
function DisplayBoard({ state, handleSelectCell, icons }) {
  const classes = useStyles()
  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {
          state.board.map((row, rowIndex) => (
            <div className={classes.row} key={rowIndex}>
              {row.map((x, columnIndex) => {
                const target = {
                  position: [rowIndex, columnIndex],
                  piece: x
                }
                return <Cell
                  className={classes.cell}
                  selectedClassName={classes.selectedCell}
                  handleSelect={handleSelectCell}
                  x={x}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  key={[rowIndex, columnIndex]}
                  isSelected={!!state.selectedCell && (arrayEquals(state.selectedCell.position, [rowIndex, columnIndex]))}
                  icons={icons}
                  isValidTarget={isValidWalk(state, target) || isValidJump(state, target)}
                  validTargetClassName={classes.validTargetCell}

                />
              })}
            </div>
          ))
        }
      </div>
    </div>
  )
}

function Cell({ x, className, selectedClassName, validTargetClassName, handleSelect, rowIndex, columnIndex, isSelected, icons, isValidTarget }) {
  return (
    <div data-testid={`cell-${rowIndex}-${columnIndex}`} className={isSelected ? selectedClassName : isValidTarget ? validTargetClassName : className} key={columnIndex} onClick={(e) => { handleSelect(rowIndex, columnIndex, x) }}>
      {(x === 1) ? icons[0] : (x === 2) ? icons[1] : ''}
    </div>
  )
}

export default DisplayBoard
