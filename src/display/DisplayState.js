import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  propertyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  propertyName: {
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'row'
  },

  propertyValue: {
    fontWeight: 300,
    marginLeft: '10px'
  },

  state: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'calc(300px + 5vmin)'
  }
})

function DisplayState ({ playerTurn, endTurnAllowed, win, gameOver, actionsHistory }) {
  const classes = useStyles()
  return (
    <div className={classes.state}>
      <div className={classes.propertyContainer}>
        {/* <div className={classes.propertyName}>Player Turn:
          <div className={classes.propertyValue}>{playerTurn}</div>
        </div> */}
        {/* <div className={classes.propertyName}>End Turn allowed:
          <div className={classes.propertyValue}>{endTurnAllowed.toString()}</div>
        </div> */}
        <div className={classes.propertyName}>Win:
          <div className={classes.propertyValue}>{win.toString()}</div>
        </div>
        <div className={classes.propertyName}>Game Over:
          <div className={classes.propertyValue}>{gameOver.toString()}</div>
        </div>
        {/* <div className={classes.propertyName}>Actions History:
          <div className={classes.propertyValue}>[{actionsHistory.toString()}]</div>
        </div> */}
      </div>
    </div>
  )
}

export default DisplayState
