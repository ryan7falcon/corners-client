import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,
  enterUsernameBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
  },
  form: {
    flex: 1
  },
})

export default function EnterUsername({ username, setUsername, isLoading, setShowChangeUsername }) {

  const [ usernameValue, setUsernameValue ] = useState(username || '')
  const classes = useStyles()

  const submitForm = (e) => {
    e.preventDefault()
    if (usernameValue != username) { setUsername(usernameValue) }
    setShowChangeUsername(false)
  }
  return (

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
      <button type="submit" className={classes.enterUsernameBtn} disabled={isLoading}> Enter Username</button>
    </form >

  )
}