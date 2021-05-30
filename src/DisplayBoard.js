import { createUseStyles } from 'react-jss'

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
  }

})
// TODO: add row and column indecies
function DisplayBoard ({ board, handleSelectCell, selectedCell, icons }) {
  const classes = useStyles()
  return (
    <div className={classes.boardContainer}>
      <div className={classes.board}>
        {
          board.map((row, rowIndex) => (
            <div className={classes.row} key={rowIndex}>
              {row.map((x, columnIndex) => (
                <Cell
                  className={classes.cell}
                  selectedClassName={classes.selectedCell}
                  handleSelect={handleSelectCell}
                  x={x}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  key={[rowIndex, columnIndex]}
                  selected={selectedCell && (selectedCell[0] === rowIndex) && (selectedCell[1] === columnIndex)}
                  icons={icons}
                />))}
            </div>
          ))
          }
      </div>
    </div>
  )
}

function Cell ({ x, className, selectedClassName, handleSelect, rowIndex, columnIndex, selected, icons }) {
  return (
    <div className={selected ? selectedClassName : className} key={columnIndex} onClick={(e) => { handleSelect(rowIndex, columnIndex, x) }}>
      {(x === 1) ? icons[0] : (x === 2) ? icons[1] : ''}
    </div>
  )
}

export default DisplayBoard
