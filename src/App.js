import { useReducer, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { backgroundColor } from './components/game/consts'
import Chat from './components/chat/Chat'
import GameContainer from './components/game/GameContainer'
import JoinRoom from './components/chat/JoinRoom'
import CreateRoom from './components/chat/CreateRoom'
import EnterUsername from './components/chat/EnterUsername'
import DisplayError from './components/chat/DisplayError'

import './App.css'
import ManageRoom from './components/chat/ManageRoom'
import ManageUsername from './components/chat/ManageUsername'
import { socket } from './socket'

const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
    backgroundColor: backgroundColor,
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

  const [ userData, setUserData ] = useState({ username: null, roomId: null })
  const [ roomData, setRoomData ] = useState(undefined)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(undefined)
  const [ showChangeUsername, setShowChangeUsername ] = useState(true)

  const setUsername = (newName) => {
    if (userData.roomId) {
      setIsLoading(true)
      socket.timeout(5000).emit('changeName', { player: userData, newName }, () => {
        setIsLoading(false)
      })
    }
    setUserData({
      ...userData,
      username: newName
    })
  }

  const setJoinedRoom = (newRoom) => {
    setUserData({
      ...userData,
      roomId: newRoom
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
  // TODO: only allow to play your own turn
  // TODO: separate server logic from DB storage logic
  // TODO: reconnect to lost session
  // TODO: export turn history to a file
  // TODO: tutorial
  // TODO: unify font sizes
  // TODO: collapse chat
  // TODO: reverse board for opponent


  useEffect(() => {
    const handleRoomData = (room) => {
      console.log('roomData', room)
      setRoomData(room)
    }

    socket.on('roomData', handleRoomData)

    return () => {
      socket.off('roomData', handleRoomData)
    }
  }, [])

  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <div className={classes.gameHeader}>Game of Corners  🚧 🛠  Under Construction ⚙ 🚧</div>
        <ManageUsername
          username={userData.username}
          setUsername={setUsername}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          showChangeUsername={showChangeUsername}
          setShowChangeUsername={setShowChangeUsername}
          icon={userData.icon}
        />
        <ManageRoom
          room={userData.roomId}
          leave={leave}
          isLoading={isLoading} />
      </header>
      <div className={classes.enterUserDatacontainer} hidden={userData.roomId}>
        {!userData.username
          ? <EnterUsername
            username={userData.username}
            setUsername={setUsername}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setShowChangeUsername={setShowChangeUsername} />
          : ''}
        <DisplayError error={error} />
        <JoinRoom
          socket={socket}
          setUserData={setUserData}
          userData={userData}
          icons={icons}
          setError={setError} />
        <CreateRoom
          socket={socket}
          setUserData={setUserData}
          userData={userData}
          icons={icons} />
      </div>
      <div className={classes.appContainer}>
        {userData.roomId ?
          <GameContainer
            socket={socket}
            userData={userData}
            roomData={roomData}
            icons={icons} /> : ''}
        <Chat
          socket={socket}
          userData={userData}
          setUserData={setUserData}
          icons={icons}
          isLoading={isLoading}
          setIsLoading={setIsLoading} />
      </div>
    </div>
  )
}

export default App
