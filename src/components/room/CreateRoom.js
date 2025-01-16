import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  createBtn: {
    extend: 'btn',
    background: 'limegreen',
    marginTop: '5px',
    marginLeft: '20px', 
    marginRight: '20px',
  }
})

const CreateRoom = ({ socket, setUserData, userData, icons }) => {
  const [ roomValue, setRoomValue ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const classes = useStyles()

  const createRoom = () => {
    setIsLoading(true)
    socket.timeout(5000).emit('createRoom',
      { username: userData.username, icons },
      (err, { error, room, player }) => {
        setIsLoading(false)
        if (err) {
          console.log(err)
        } else
          if (error) {
            console.log(error)
          } else {
            setUserData(player)
          }
      })
  }

  return socket && userData.username && !userData.roomId
    ? <button className={classes.createBtn} disabled={isLoading} onClick={createRoom}>Create New Room</button>
    : ''
}

export default CreateRoom