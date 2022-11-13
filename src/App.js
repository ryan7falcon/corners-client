import { useReducer } from 'react'
import { createUseStyles } from 'react-jss'

import { endTurnAction, selectCellAction, restartGameAction, gameBrain, createInitState } from './brain/Game'

import DisplayState from './display/DisplayState'
import DisplayBoard from './display/DisplayBoard'
import { EndTurnBtn, RestartGameBtn } from './display/Buttons'
import './App.css'

const useStyles = createUseStyles({
  app: {
    textAlign: 'center'
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  gameHeader: {
    paddingTop: 'calc(10px + 7vmin)',
    fontSize: 'calc(10px + 5vmin)'
  },
  gameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start',
    paddingTop: 'calc(10px + 7vmin)'
  },
  gameColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    borderRadius: 10,
    padding: 'calc(10px + 0vmin)',
    fontSize: 'calc(10px + 1vmin)'
  },
  message: {
    fontSize: 'calc(10px + 2vmin)',
    margin: {
      top: 'calc(10px + 2vmin)',
      bottom: 'calc(10px + 2vmin)'
    }
  }
})

function App() {
  const classes = useStyles()
  const icons = [ '💩', '💎' ]

  const [ game, dispatch ] = useReducer(gameBrain, createInitState(icons))

  // TODO: number the rows and columns as on a chessboard
  // TODO: create server-client app with socket connections
  // TODO: export turn history to a file
  // TODO: tutorial

  // params: row, column and piece (1- for player 1, 2 - for player 2, 0 - for empty spot) of the target (intention to switch selection)
  const handleSelectCell = (target) => dispatch(selectCellAction(target))

  const handleEndTurn = () => dispatch(endTurnAction())

  const handleRestartGame = () => dispatch(restartGameAction())

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.gameHeader}>Game of Corners  🚧 🛠  Under Construction ⚙ 🚧</div>
        <div className={classes.gameContainer}>
          <DisplayBoard state={game} handleSelectCell={handleSelectCell} />
          <div className={classes.gameColumn}>
            <DisplayState state={game} />

            <div className={classes.message}>{game.message}</div>

            <div id='allowed-moves' />

            {game.loserFinished
              ? <RestartGameBtn handleRestartGame={handleRestartGame} />
              : <EndTurnBtn
                endTurnAllowed={game.endTurnAllowed}
                handleEndTurn={handleEndTurn}
              />
            }
          </div>
        </div>

      </header>
    </div>
  )
}

export default App
