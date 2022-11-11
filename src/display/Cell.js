import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
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
  validTargetWalk: {
    extend: 'cell',
    background: 'rgba(255,255,0,0.2)'
  },
  validTargetJump: {
    extend: 'cell',
    background: 'rgba(0,255,0,0.2)'
  }

})

function Cell({
  x,
  handleSelect,
  rowIndex,
  columnIndex,
  isSelected,
  getIcon,
  isValidWalk,
  isValidJump }) {
  const classes = useStyles()
  return (
    <div data-testid={`cell-${rowIndex}-${columnIndex}`} className={isSelected ? classes.selectedCell : isValidWalk ? classes.validTargetWalk : isValidJump ? classes.validTargetJump : classes.cell} key={columnIndex} onClick={(e) => { handleSelect(rowIndex, columnIndex, x) }}>
      {getIcon(x)}
    </div>
  )
}

export default Cell