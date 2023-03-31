import { useReducer, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import io from 'socket.io-client'

import Chat from './components/chat/Chat'
import GameContainer from './components/game/GameContainer'
import JoinRoom from './components/chat/JoinRoom'
import EnterUsername from './components/chat/EnterUsername'

import './App.css'
import ManageRoom from './components/chat/ManageRoom'
import ManageUsername from './components/chat/ManageUsername'


const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'auto'
  },
  appHeader: {
    display: 'flex',
  },
  gameHeader: {
    paddingTop: 'calc(10px + 2vmin)',
    marginBottom: 'calc(10px + 2vmin)',
    fontSize: 'calc(10px + 3vmin)',
    flex: 1,
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    // maxHeight: 'calc(100vh - 25vmin)'
    flexWrap: 'wrap',
  },
  enterUserDatacontainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    flex: 1,
    alignItems: 'center',
  },

})

function App() {
  const classes = useStyles()

  const [ socket, setSocket ] = useState(null)
  const [ userData, setUserData ] = useState({ username: null, room: null })
  const [ isLoading, setIsLoading ] = useState(false)
  const [ showChangeUsername, setShowChangeUsername ] = useState(true)

  const setUsername = (newUserName) => {
    setUserData({
      ...userData,
      username: newUserName
    })
    if (userData.room) {
      setIsLoading(true)
      socket.timeout(5000).emit('changeName', newUserName, () => {
        setIsLoading(false)
      })
    }
  }

  const setJoinedRoom = (newRoom) => {
    setUserData({
      ...userData,
      room: newRoom
    })
  }

  function leave() {
    setIsLoading(true)
    socket.timeout(5000).emit('leave', () => {
      setJoinedRoom(null)
      setIsLoading(false)
    })
  }

  const icons = [ '💩', '💎' ]
  // const icons = [ 'I', 'J' ]

  // TODO: create server-client app with socket connections
  // TODO: generate room code for the first person to Join
  // TODO: separate derver logic from DB storage logic
  // TODO: save users and games by room
  // TODO: reconnect to lost session
  // TODO: make the FE mobile friendly
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
        <ManageUsername username={userData.username} setUsername={setUsername} isLoading={isLoading} setIsLoading={setIsLoading} showChangeUsername={showChangeUsername} setShowChangeUsername={setShowChangeUsername} />
        <ManageRoom room={userData.room} leave={leave} isLoading={isLoading} />
      </header>
      <div className={classes.enterUserDatacontainer} hidden={userData.room}>
        {!userData.username ? <EnterUsername username={userData.username} setUsername={setUsername} isLoading={isLoading} setIsLoading={setIsLoading} setShowChangeUsername={setShowChangeUsername} /> : ''}
        <JoinRoom
          socket={socket}
          setUserData={setUserData}
          userData={userData}
          icons={icons} />
      </div>
      <div className={classes.appContainer}>
        <GameContainer socket={socket} userData={userData} icons={icons} />
        <Chat socket={socket} userData={userData} setUserData={setUserData} icons={icons} isLoading={isLoading} setIsLoading={setIsLoading} />
      </div>
    </div>
  )
}

export default App
