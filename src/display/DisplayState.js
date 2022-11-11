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
  },
  hiddenDiv: {
    display: 'none'
  }
})

function DisplayState({ playerTurn, endTurnAllowed, win, winnerFinished, score, actionsHistory, getIcon }) {
  const classes = useStyles()
  return (
    <div className={classes.state}>
      <div className={classes.propertyContainer}>
        <div className={winnerFinished ? classes.propertyName : classes.hiddenDiv}> Winner:
          <div className={classes.propertyValue}>{getIcon(win)}</div>
        </div>
        <div className={winnerFinished ? classes.propertyName : classes.hiddenDiv}>Score:
          <div className={classes.propertyValue}>{score.toString()}</div>
        </div>
      </div>
    </div>
  )
}

export default DisplayState
