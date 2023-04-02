import { useReducer, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import axios from "axios"

import { trace } from '../../util'
import { callAPIAction, successAction, errorAction, endTurnAction, selectCellAction, restartGameAction, gameBrain } from '../../brain/Game'
import { restartGame } from '../../brain/api'

import DisplayState from './DisplayState'
import DisplayBoard from './DisplayBoard'
import { EndTurnBtn, RestartGameBtn } from './GameButtons'

const useStyles = createUseStyles({

  gameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start',
    flex: 3,
    flexWrap: 'wrap',
  },
  message: {
    fontSize: 'calc(10px + 2vmin)',
    // margin: {
    //   top: 'calc(10px + 2vmin)',
    //   bottom: 'calc(10px + 2vmin)'
    // }
  },
  gameColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
})



const api = axios.create({
  baseURL: "http://localhost:3001"
})

export default function GameContainer({ socket, icons, userData }) {
  const { roomId } = userData
  const [ state, dispatch ] = useReducer(gameBrain, { loading: false })
  // params: row, column and piece (1- for player 1, 2 - for player 2, 0 - for empty spot) of the target (intention to switch selection)
  const handleSelectCell = (target) => dispatch(selectCellAction(target))

  const handleEndTurn = () => dispatch(endTurnAction())

  const handleRestartGame = async () => {
    dispatch(callAPIAction())
    socket.timeout(5000).emit('restartGame', { player: userData }, (err, { error, room, player }) => {
      if (err) {
        console.log('restart game err', err)
        return dispatch(errorAction(err))
      }
      if (error) {
        console.log('restart game error', error)
        return dispatch(errorAction(error))
      }
      dispatch(successAction(room.game))
    })
  }

  // fetch from server
  // const [ data, setData ] = useState(null)

  useEffect(() => {
    // api.get('api')
    //   // .then(trace('data'))
    //   .then((response) => setData(response.data.message))

    // Initial game start
    if (!state.game && !state.loading && roomId) {
      console.log('restarting the game')
      handleRestartGame()
    }
  }, [])


  const classes = useStyles()
  return <div className={classes.gameContainer}>
    {/* <p>{!data ? "Loading message..." : data}</p> */}
    {/* <div>{userData.player}{userData.icon}{userData.username}</div> */}
    <>{
      state.loading || !state.game
        ? "Loading game..."
        : state.error
          ? "There was an error"
          : <>
            <div className={classes.gameColumn}>
              <DisplayState state={state.game} />

              <div className={classes.message}>{state.game.moveMessage}</div>
              <div className={classes.message}>{state.game.turnMessage}</div>

              <div id='allowed-moves' />

              {state.game.loserFinished
                ? <RestartGameBtn handleRestartGame={handleRestartGame} />
                : <EndTurnBtn
                  endTurnAllowed={state.game.endTurnAllowed}
                  handleEndTurn={handleEndTurn}
                />
              }
            </div>

            <DisplayBoard state={state.game} handleSelectCell={handleSelectCell} />
          </>
    }
    </>
  </div>
}

