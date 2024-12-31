import { createUseStyles } from 'react-jss'
import { trace } from '../../util'
import { cellSize, backgroundColor } from './consts'


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
    background: 'rgba(255,255,255,0.1)',
    textShadow: '0 0 10px rgba(255,255,255,0.85)'
  },
  validTargetWalk: {
    extend: 'selectableTarget',
    // background: 'rgba(255,255,0,0.2)',
    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '120%',
      height: '120%',
      borderRadius: '50%',
      boxShadow: '0 0 10px 3px gold',
    }
  },
  validTargetJump: {
    extend: 'selectableTarget',
    // background: 'rgba(0,255,0,0.2)',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 100,
      display: 'block',
      width: '120%',
      height: '120%',
      borderRadius: '50%',
      boxShadow: '0 0 10px 3px rgba(0,255,0,0.9)',
    }
  },
  lastTurnLastMoveTarget: {
    textShadow: '0 0 10px rgba(255,255,255,0.85)',
  },
  lastTurnAnyMove: ({ lastTurnAnyMove, icon }) => ({
    content: icon,
    '&:before': {
      opacity: lastTurnAnyMove,
      content: '""',
      display: 'block',
      width: '30%',
      height: '30%',
      borderRadius: '50%',
      boxShadow: '0 0 10px white',
    }
  }),
  shadow: ({ lastTurnAnyMove }) => ({
    opacity: lastTurnAnyMove,
    color: 'transparent',
    textShadow: '0px 0px 10px rgba(255,255,255,0.85)',
    background: backgroundColor,
  }),
  text: {
    position: 'absolute',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundImage: 'none',
    backgroundColor: backgroundColor,
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
  canDeselect,
  lastTurnLastMoveTarget,
  lastTurnAnyMove,
  icon,
  lastTurnPlayerIcon
}) {
  const classes = useStyles({ lastTurnAnyMove, icon })

  return (
    <div
      data-testid={`cell-${target.position[ 0 ]}-${target.position[ 1 ]}`}
      className={`${canDeselect
        ? classes.selectedCellDeselectable
        : isSelected
          ? classes.selectedCell
          : isOwnCell
            ? classes.selectableTarget
            : isValidWalk
              ? classes.validTargetWalk
              : isValidJump
                ? classes.validTargetJump
                : classes.cell} ${lastTurnLastMoveTarget ? classes.lastTurnLastMoveTarget : ''}`
      }
      key={target.position[ 0 ]}
      onClick={(e) => { handleSelect(target) }}
    >
      {lastTurnAnyMove && !lastTurnLastMoveTarget ? <><div className={classes.shadow}>{lastTurnPlayerIcon}</div><div className={classes.text}>{lastTurnPlayerIcon}</div></> : ''}
      {state.icons[ target.piece - 1 ]}
    </div>
  )
}

export default Cell