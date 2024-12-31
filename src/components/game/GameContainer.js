import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import axios from "axios"

import DisplayState from './DisplayState'
import DisplayBoard from './DisplayBoard'
import { EndTurnBtn, RestartGameBtn } from './GameButtons'

const useStyles = createUseStyles({

  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
  },
  message: {
    fontSize: 'calc(10px + 2vmin)',
  },
  gameColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  },
  roomCode: {
    fontSize: 'calc(10px + 3vmin)',
    color: 'gold',
    fontWeight: 800
  },
  waitForYourTurn: {
    marginTop: 'calc(10px + 2vmin)',
    marginBottom: 'calc(10px + 2vmin)',
  },
  turnRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itIsYourTurn: {
    marginTop: 'calc(10px + 2vmin)',
    marginBottom: 'calc(10px + 2vmin)',
  }
})



const api = axios.create({
  baseURL: "http://localhost:3001"
})



export default function GameContainer({ socket, icons, userData, roomData }) {
  const { roomId, icon, player } = userData
  const { game } = roomData
  const [ serverError, setServerError ] = useState()

  const isPlayersTurn = Number(userData.player[ userData.player.length - 1 ]) === game?.playerTurn
  const bothPlayersJoined = roomData.player1 && roomData.player2

  // params: row, column and piece (1- for player 1, 2 - for player 2, 0 - for empty spot) of the target (intention to switch selection)

  const handleCallbackError = (err, { error, room, player }) => {
    if (err) {
      console.log('restart game err', err)
      setServerError(err)
    }
    if (error) {
      console.log('restart game error', error)
      setServerError(error)
    }
  }

  const handleSelectCell = (target) => {
    if (isPlayersTurn && bothPlayersJoined) socket.timeout(5000).emit('selectCell', { player: userData, target }, handleCallbackError)
  }

  const handleEndTurn = () => {
    socket.timeout(5000).emit('endTurn', { player: userData }, handleCallbackError)
  }

  const handleRestartGame = async () => {
    socket.timeout(5000).emit('restartGame', { player: userData }, handleCallbackError)
  }


  useEffect(() => {
    // Initial game start
    if (!game && roomId) {
      console.log('restarting the game')
      handleRestartGame()
    }
  }, [])

  // TODO: add hotseat option
  const classes = useStyles()


  return <div className={classes.gameContainer}>
    {/* <p>{!data ? "Loading message..." : data}</p> */}
    {/* <div>{userData.player}{userData.icon}{userData.username}</div> */}
    <>{
      !game
        ? "Loading game..."
        : serverError
          ? `There was an error ${serverError}`
          : <>
            {bothPlayersJoined
              ? <div className={classes.gameColumn}>
                <DisplayState state={game} />

                {/* <div className={classes.message}>{game.moveMessage}</div> */}
                {/* <div className={classes.message}>{game.turnMessage}</div> */}

                <div id='allowed-moves' />
                <div className={classes.turnRow}>
                {game.loserFinished
                  ? <RestartGameBtn handleRestartGame={handleRestartGame} />
                  : isPlayersTurn ? <>
                  <div className={classes.itIsYourTurn}>
                    {game.win 
                    ? `It's your turn until you finish, each turn adds to the winner's score` 
                    : `It is your turn, ${icon}`}
                  </div> 
                  < EndTurnBtn
                    endTurnAllowed={game.endTurnAllowed}
                    handleEndTurn={handleEndTurn}
                    icon={icon}
                  />
                  </> : <div className={classes.waitForYourTurn}>{game.win ? `You have won! Wait for the other player to finish` : `Wait for your turn, ${icon}`}</div>
                }
              </div>
              </div>
              : <div>
                <p>Waiting for the other player to join. Room code is </p>
                <p className={classes.roomCode}>{roomData.roomId}</p>

              </div>
            }
            <DisplayBoard state={game} handleSelectCell={handleSelectCell} isPlayersTurn={isPlayersTurn} icon={icon} reverseBoard={player === 'player2'} />
          </>
    }
    </>
  </div>
}

