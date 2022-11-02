import { useReducer } from 'react'
import { createUseStyles } from 'react-jss'

import { endTurnAction, selectCellAction, gameBrain, createInitState } from './brain/Game'

import DisplayState from './display/DisplayState'
import DisplayBoard from './display/DisplayBoard'
import { EndTurnBtn } from './display/Buttons'
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

// TODO: Display game over message and restart game button
// TODO: dont allow to select a different piece when chain jumping, unless returned to the same spot, then make endTurn allowed false to start the turn from scratch and eraze jumps from history
// TODO: after game over allow only one player to make turns and count them to get the score
function App() {
  const classes = useStyles()
  const icons = ['💩', '💎']

  const [game, dispatch] = useReducer(gameBrain, createInitState(icons))

  // TODO: only allow hover effect on own cells

  // params: row, column and piece (1- for player 1, 2 - for player 2, 0 - for empty spot) of the target (intention to switch selection)
  const handleSelectCell = (rowIndex, columnIndex, piece) => {
    dispatch(selectCellAction({
      rowIndex, columnIndex, piece
    }))
  }

  const handleEndTurn = () => {
    dispatch(endTurnAction())
  }

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.gameHeader}>Game of Corners  🚧 🛠  Under Construction ⚙ 🚧</div>
        <div className={classes.gameContainer}>
          <DisplayBoard state={game} handleSelectCell={handleSelectCell} icons={icons} />
          <div className={classes.gameColumn}>
            <DisplayState
              playerTurn={game.playerTurn}
              endTurnAllowed={game.endTurnAllowed}
              win={game.win}
              winnerFinished={game.winnerFinished}
              actionsHistory={game.actionsHistory}
            />

            <div className={classes.message}>{game.message}</div>

            <div id='allowed-moves' />
            <EndTurnBtn
              endTurnAllowed={game.endTurnAllowed}
              handleEndTurn={handleEndTurn}
            />
          </div>
        </div>

      </header>
    </div>
  )
}

export default App
