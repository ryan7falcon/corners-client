
import React, { useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessagesInput'

import { createUseStyles } from 'react-jss'
import styles from '../styles'


const useStyles = createUseStyles({
  ...styles,

  chatContainer: {
    margin: 0,
    padding: '20px',
    justifyContent: 'end',
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    width: '90%',
    fontSize: 'calc(10px + 1vmin)',
    alignItems: 'center',
    minHeight: 'calc(100px + 40vmin)',
    borderRadius: '20px',
    background: '#2f3239'
  }
})

export default function Chat({ socket, userData, isLoading, setIsLoading }) {
  const classes = useStyles()

  return socket
    ? <div className={classes.chatContainer} hidden={!userData.roomId || !socket.connected}>
      <MessageInput socket={socket} userData={userData} isLoading={isLoading} setIsLoading={setIsLoading} />
      <Messages socket={socket} userData={userData} />
    </div > : ''
}

