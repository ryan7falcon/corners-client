
import React, { useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessagesInput'

import { createUseStyles } from 'react-jss'
import styles from '../styles'


const useStyles = createUseStyles({
  ...styles,

  chatContainer: {
    margin: '20px',
    padding: 0,
    justifyContent: 'end',
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    width: '90%',
    fontSize: 'calc(10px + 1vmin)',
    alignItems: 'center',
    marginTop: '0px',
    minHeight: 'calc(100px + 40vmin)',
  }
})

export default function Chat({ socket, userData, isLoading, setIsLoading }) {
  const classes = useStyles()

  return socket
    ? <div className={classes.chatContainer} hidden={!userData.room || !socket.connected}>
      <MessageInput socket={socket} userData={userData} isLoading={isLoading} setIsLoading={setIsLoading} />
      <Messages socket={socket} userData={userData} />
    </div > : ''


}

