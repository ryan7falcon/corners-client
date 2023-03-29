
import React, { useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessagesInput'
import JoinRoom from './JoinRoom'
import EnterUsername from './EnterUsername'
import { createUseStyles } from 'react-jss'
import styles from '../styles'


const useStyles = createUseStyles({
  ...styles,

  leaveBtn: {
    extend: 'btn',
    background: 'tomato',
    marginTop: 0,
    marginLeft: '20px'
  },
  chatContainer: {
    margin: '20px',
    padding: 0,
    justifyContent: 'end',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    fontSize: 'calc(10px + 1vmin)'
  },
  room: {
    display: 'flex'
  },
  roomName: {
    marginTop: '4px'
  },
  roomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    flex: 1,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
  }
})

export default function Chat({ socket, userData, setUserData, icons }) {

  const [ isLoading, setIsLoading ] = useState(false)
  const classes = useStyles()

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

  return (
    <div className={classes.container}>
      <EnterUsername username={userData.username} setUsername={setUsername} isLoading={isLoading} setIsLoading={setIsLoading} />
      {
        socket && userData.username ? (
          <div className={classes.roomContainer}>

            {!userData.room
              ? <JoinRoom
                socket={socket}
                setUserData={setUserData}
                userData={userData}
                icons={icons} />
              : <div className={classes.room}>
                <div className={classes.roomName}>{`You have joined room ${userData.room}`}</div>
                <button onClick={leave} className={classes.leaveBtn} disabled={isLoading}>Leave the room</button>
              </div>
            }

            <div className={classes.chatContainer} hidden={!userData.room || !socket.connected}>
              <Messages socket={socket} userData={userData} />
              <MessageInput socket={socket} userData={userData} isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>

          </div>
        ) : <></>
      }
    </div>
  )
}

