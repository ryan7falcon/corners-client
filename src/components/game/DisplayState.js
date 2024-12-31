import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  propertyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  propertyName: {
    fontWeight: 100,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '20px'
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
    marginBottom: '10px'
  },
  hiddenDiv: {
    display: 'none'
  }
})

function DisplayState({ state }) {
  const classes = useStyles()
  return (
    <div className={state.winnerFinished ? classes.state : classes.hiddenDiv}>
      <div className={classes.propertyContainer}>
        <div className={classes.propertyName}>
          {state.icons[ state.win - 1 ]} has won! {state.icons[ state.win % 2 ]} continues to finish.
        </div>
        <div className={classes.propertyName}>Score:
          <div className={classes.propertyValue}>{state.score.toString()}</div>
        </div>
      </div>
    </div>
  )
}

export default DisplayState
