import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  joinBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0
  }
})

const JoinRoom = ({ socket, setJoinedRoom, username }) => {
  const [ roomValue, setRoomValue ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const classes = useStyles()

  const submitForm = (e) => {
    e.preventDefault()
    setIsLoading(true)
    socket.timeout(5000).emit('join', { room: roomValue, username }, () => {
      setIsLoading(false)
      setJoinedRoom(roomValue)
    })

  }

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={roomValue}
        placeholder="Enter room name"
        onChange={(e) => {
          setRoomValue(e.currentTarget.value)
        }}
        required
      />
      <button className={classes.joinBtn} type="submit" disabled={isLoading}>Submit</button>
    </form>
  )
}

export default JoinRoom
