import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  joinBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0,
    marginRight: '20px'
  }
})

const JoinRoom = ({ socket, setUserData, userData, setError }) => {
  const [ roomValue, setRoomValue ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const classes = useStyles()

  const submitForm = (e) => {
    e.preventDefault()
    setIsLoading(true)
    socket.timeout(5000).emit('join',
      { roomId: roomValue, username: userData.username },
      (err, { error, room, player }) => {
        setIsLoading(false)
        if (err) {
          console.log(err)
        } else
          if (error) {
            setError(error)
            console.log(error)
          } else {
            // console.log('player', player, error)
            setUserData(player)
          }
      })

  }

  return socket && userData.username && !userData.roomId
    ?
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
      <button className={classes.joinBtn} type="submit" disabled={isLoading}>Join Room</button>
      or
    </form>
    : ''
}

export default JoinRoom
