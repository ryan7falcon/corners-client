import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  usernameBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
    marginLeft: '20px'
  },

  enterUsernameBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },

  form: {
    flex: 1
  },

  usernameDisplay: {
    display: 'flex'
  },
  yourName: {
    marginTop: '4px'
  }
})

export default function EnterUsername({ username, setUsername, isLoading, setIsLoading }) {

  const [ usernameValue, setUsernameValue ] = useState(username || '')
  const [ showChangeUsername, setShowChangeUsername ] = useState(true)
  const classes = useStyles()

  const submitForm = (e) => {
    e.preventDefault()
    if (usernameValue != username) { setUsername(usernameValue) }
    setShowChangeUsername(false)
  }
  return (
    <div className={classes.container}>
      {username && !showChangeUsername
        ? <div className={classes.usernameDisplay}>
          <span className={classes.yourName}>{`Your username is ${username}`}</span>
          <button className={classes.usernameBtn} onClick={() => setShowChangeUsername(true)} disabled={isLoading}>Change Username</button>
        </div>
        :
        <form onSubmit={submitForm} className={classes.form}>
          <input
            autoFocus
            value={usernameValue}
            placeholder="Enter user name"
            onChange={(e) => {
              setUsernameValue(e.currentTarget.value)
            }}
            required
          />
          <button type="submit" className={classes.enterUsernameBtn} >Enter Username</button>
        </form >}
    </div>
  )
}