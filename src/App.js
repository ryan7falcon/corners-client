// import logo from './logo.svg'
import './App.css'
import { START_STATE, moveAction, endTurnAction, gameBrain, createInitState } from './Game'
import { useState, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import DisplayState from './DisplayState'
import DisplayBoard from './DisplayBoard'
import { EndTurnBtn } from './Buttons'

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
// TODO: not select empty cells or opponent cells
// TODO: pass selected cell to move
// TODO: capture target cell and do the move
// TODO: logic for selecting only valid cells
// TODO: highlight valid cells to select
// TODO: unit tests
// TODO: drag and drop

function App () {
  const classes = useStyles()

  // function useInput ({ type /* ... */ }) {
  //   const [value, setValue] = useState('')
  //   const input = <input className={classes.input} value={value} onChange={e => setValue(e.target.value)} type={type} min='0' max='7' />
  //   return [value, input]
  // }

  // const [x, xInput] = useInput({ type: 'number' })
  // const [y, yInput] = useInput({ type: 'number' })
  // const [newX, newXInput] = useInput({ type: 'number' })
  // const [newY, newYInput] = useInput({ type: 'number' })
  const icons = ['💩', '💎']

  const [selectedCell, setSelectedCell] = useState()
  const [game, dispatch] = useReducer(gameBrain, createInitState(icons))

  const move = (startPos, targetPos) => dispatch(moveAction(startPos, targetPos))
  const endTurn = () => dispatch(endTurnAction())

  const handleSelectCell = (rowIndex, columnIndex, x) => {
    // if there is an active selection
    if (selectedCell) {
      // deselect selected cell
      if (selectedCell[0] === rowIndex && selectedCell[1] === columnIndex) {
        setSelectedCell(null)
      } else if (x === game.playerTurn) {
        // Select another piece of the same player
        setSelectedCell([rowIndex, columnIndex])
      } else if (x === 0) {
      // make a move
      // TODO: check if in allowed moves
        move(selectedCell, [rowIndex, columnIndex])
        // deselect
        setSelectedCell(null)
      } else {
      // ignore
      }

    // if there is no active selection
    } else if (x === game.playerTurn) {
      setSelectedCell([rowIndex, columnIndex])
    }
  }

  const handleEndTurn = () => {
    endTurn()
  }

  console.log(game.message, game)
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.gameHeader}>Game of Corners</div>
        <div className={classes.gameContainer}>
          <DisplayBoard board={game.board} handleSelectCell={handleSelectCell} selectedCell={selectedCell} icons={icons} />
          <div className={classes.gameColumn}>
            <DisplayState
              playerTurn={game.playerTurn}
              endTurnAllowed={game.endTurnAllowed}
              win={game.win}
              gameOver={game.gameOver}
              actionsHistory={game.actionsHistory}
            />

            <div className={classes.message}>{game.message}</div>

            <div id='allowed-moves' />

            {/* <div>X: {xInput} -&gt;  {newXInput} </div>
            <div>Y: {yInput} -&gt;  {newYInput}</div>

            <MoveBtn
              x={x}
              y={y}
              newX={newX}
              newY={newY}
              move={move}
            /> */}
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
