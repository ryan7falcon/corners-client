import { createUseStyles } from 'react-jss'
import { trace } from '../../util'
import { getPlayerIcon } from '../../brain/nextState/messages'

const cellSize = 'calc(8vmin)'

const useStyles = createUseStyles({
  cell: {
    overflow: 'hidden',
    display: 'flex',
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #555',
    position: 'relative',
    userSelect: 'none',
    fontSize: 'calc(5vmin)',
  },
  selectedCell: {
    extend: 'cell',
    background: 'rgba(255,255,255,0.1)'
  },
  selectableTarget: {
    extend: 'cell',
    cursor: 'pointer',
    transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)',
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
      width: cellSize,
      height: cellSize,
      top: '0',
      left: 'calc(-8vmin)',
      transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)'
    },
    '&:active': {
      fontSize: 'calc(6vmin)'
    }
  },
  selectedCellDeselectable: {
    extend: 'selectableTarget',
    background: 'rgba(255,255,255,0.1)'
  },
  validTargetWalk: {
    extend: 'selectableTarget',
    background: 'rgba(255,255,0,0.2)'
  },
  validTargetJump: {
    extend: 'selectableTarget',
    background: 'rgba(0,255,0,0.2)'
  }

})

function Cell({
  handleSelect,
  state,
  target,
  isSelected,
  isValidWalk,
  isValidJump,
  isOwnCell,
  canDeselect }) {
  const classes = useStyles()
  return (
    <div
      data-testid={`cell-${target.position[ 0 ]}-${target.position[ 1 ]}`}
      className={
        canDeselect
          ? classes.selectedCellDeselectable
          : isSelected
            ? classes.selectedCell
            : isOwnCell
              ? classes.selectableTarget
              : isValidWalk
                ? classes.validTargetWalk
                : isValidJump
                  ? classes.validTargetJump
                  : classes.cell}
      key={target.position[ 0 ]}
      onClick={(e) => { handleSelect(target) }}
    >
      {getPlayerIcon(state.icons)(target.piece)}
    </div>
  )
}

export default Cell