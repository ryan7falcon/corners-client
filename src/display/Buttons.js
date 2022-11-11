import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  btn: {
    boxSizing: 'borderBox',
    marginTop: 'calc(10px + 2vmin)',
    '&:disabled': {
      background: '#AAA',
      '&:after': {
        transition: 'none'
      }
    },
    borderRadius: 25,
    padding: {
      top: 'calc(10px + 0vmin)',
      bottom: 'calc(10px + 0vmin)',
      left: 'calc(10px + 1vmin)',
      right: 'calc(10px + 1vmin)'
    },
    border: 'None',
    fontSize: 'calc(10px + 1vmin)',
    span: {
      zIndex: 20
    },
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '2px 5px 5px 5px rgb(0 0 0 / 5%)',
    transition: 'all 500ms cubic-bezier(0.19, 1, 0.22, 1)',
    '&:after': {
      background: '#fff',
      content: "''",
      height: 'calc(30px + 2vmin)',
      left: ' calc(-150px - 6vmin)',
      opacity: '.2',
      position: 'absolute',
      top: 'calc(-10px - 1vmin)',
      transform: 'rotate(-35deg)',
      transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)',
      width: 'calc(150px + 6vmin)',
      zIndex: '10'
    },
    '&:hover': {
      transform: 'scale(1.01)',
      transition: 'all 500ms cubic-bezier(0.19, 1, 0.22, 1)',
      boxShadow: '2px 5px 5px 8px rgb(0 0 0 / 8%)',
      '&:after': {
        left: '120%',
        transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)'
      }
    }
  },

  moveBtn: {
    extend: 'btn',
    background: 'deepskyblue'
  },

  endTurnBtn: {
    extend: 'btn',
    background: 'tomato'
  },

  restartBtn: {
    extend: 'btn',
    background: 'limegreen'
  }
})

function EndTurnBtn({ endTurnAllowed, handleEndTurn }) {
  const classes = useStyles()
  return (
    <button
      className={classes.endTurnBtn} disabled={!endTurnAllowed} onClick={(e) => {
        handleEndTurn()
      }}
    >End Turn
    </button>
  )
}

function MoveBtn({ x, y, newX, newY, move }) {
  const classes = useStyles()
  return (
    <button
      className={classes.moveBtn} onClick={(e) => {
        e.preventDefault()
        move([ x, y ], [ newX, newY ])
      }}
      disabled={!(x && newX && y && newY)}
    > <span>Make a move![{x}{y ? ', ' + y : ''}] {(x && newX && y && newY) ? '->' : ''} [{newX}{newY ? ', ' + newY : ''}]</span>
    </button>
  )
}

const RestartGameBtn = ({ handleRestartGame }) => {
  const classes = useStyles()
  return (
    <button
      className={classes.restartBtn} onClick={(e) => {
        e.preventDefault()
        handleRestartGame()
      }}
    > Restart Game
    </button>
  )
}

export { EndTurnBtn, MoveBtn, RestartGameBtn }
