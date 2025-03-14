import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({

  ...styles,

  moveBtn: {
    extend: 'btn',
    background: 'deepskyblue'
  },

  endTurnBtn: {
    extend: 'btn',
    background: 'tomato',
    marginTop:0,
    marginLeft: '20px',
    marginRight: '20px',
    color: 'black'
  },

  restartBtn: {
    extend: 'btn',
    background: 'limegreen',
    marginBottom: 'calc(10px + 2vmin)'
  }
})

function EndTurnBtn({ endTurnAllowed, handleEndTurn, icon }) {
  const classes = useStyles()
  return (
    endTurnAllowed ? 
    <button
      className={classes.endTurnBtn} disabled={!endTurnAllowed} onClick={(e) => {
        handleEndTurn()
      }}
    >End Turn
    </button> 
    : ''
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
