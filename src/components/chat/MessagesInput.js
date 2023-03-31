import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  msgBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
  },

  messageForm: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '100%',
  },
  messageInput: {
    flex: 1
  }

})
const NewMessage = ({ socket, isLoading, setIsLoading }) => {
  const [ value, setValue ] = useState('')
  const classes = useStyles()

  const submitForm = (e) => {
    e.preventDefault()
    if (value) {
      setIsLoading(true)
      socket.timeout(5000).emit('sendMessage', value, () => {
        setIsLoading(false)
      })
      setValue('')
    }
  }

  return (
    <form onSubmit={submitForm} className={classes.messageForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
        className={classes.messageInput}
      />
      <button type="submit" className={classes.msgBtn} disabled={isLoading}>Submit</button>
    </form>
  )
}

export default NewMessage