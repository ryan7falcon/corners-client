import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

import EnterUsername from './EnterUsername'

const useStyles = createUseStyles({
  ...styles,

  usernameBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
    marginLeft: '20px'
  },
  manageUsernameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  usernameDisplay: {
    display: 'flex',
    alignItems: 'center',
  },
  yourName: {
    fontSize: 'calc(10px + 1vmin)'
  }
})

export default function ManageUsername({ username, setUsername, isLoading, setIsLoading, setShowChangeUsername, showChangeUsername, icon }) {
  const classes = useStyles()

  return (
    <div className={classes.manageUsernameContainer}>
      {username ?
        !showChangeUsername
          ? <div className={classes.usernameDisplay}>
            <span className={classes.yourName}>{username} is {icon}</span>
            <button className={classes.usernameBtn} onClick={() => setShowChangeUsername(true)} disabled={isLoading}>Change Username</button>
          </div>
          :
          <EnterUsername username={username} setUsername={setUsername} isLoading={isLoading} setIsLoading={setIsLoading} setShowChangeUsername={setShowChangeUsername} />
        : ''}
    </div>
  )
}