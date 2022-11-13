import { createUseStyles } from 'react-jss'
import { getPlayerIcon } from '../brain/nextState/messages'

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

function DisplayState({ state }) {
  const classes = useStyles()
  return (
    <div className={classes.state}>
      <div className={classes.propertyContainer}>
        <div className={state.winnerFinished ? classes.propertyName : classes.hiddenDiv}> Winner:
          <div className={classes.propertyValue}>{getPlayerIcon(state.icons)(state.win)}</div>
        </div>
        <div className={state.winnerFinished ? classes.propertyName : classes.hiddenDiv}>Score:
          <div className={classes.propertyValue}>{state.score.toString()}</div>
        </div>
      </div>
    </div>
  )
}

export default DisplayState
