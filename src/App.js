import { useReducer, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import io from 'socket.io-client'

import Chat from './components/chat/Chat'
import GameContainer from './components/game/GameContainer'
import './App.css'


const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto'
  },
  appHeader: {


  },
  gameHeader: {
    paddingTop: 'calc(10px + 7vmin)',
    marginBottom: 'calc(10px + 7vmin)',
    fontSize: 'calc(10px + 3vmin)'
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    // maxHeight: 'calc(100vh - 25vmin)'
    overflow: 'auto'
  }
})

function App() {
  const classes = useStyles()

  const [ socket, setSocket ] = useState(null)
  const [ userData, setUserData ] = useState({ username: null, room: null })

  const icons = [ '💩', '💎' ]
  // const icons = [ 'I', 'J' ]

  // TODO: create server-client app with socket connections
  // TODO: export turn history to a file
  // TODO: tutorial

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`)
    setSocket(newSocket)
    return () => newSocket.close()
  }, [ setSocket ])

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.gameHeader}>Game of Corners  🚧 🛠  Under Construction ⚙ 🚧</div>
      </header>
      {!userData.room
        ? <div>Please Join a room</div> : ''}
      <div className={classes.appContainer}>
        {userData.room
          ? <GameContainer socket={socket} userData={userData} icons={icons} /> : ''}
        <Chat socket={socket} userData={userData} setUserData={setUserData} />
      </div>
    </div>
  )
}

export default App
