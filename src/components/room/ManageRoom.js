import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
import styles from '../styles'

const useStyles = createUseStyles({
  ...styles,

  manageRoomContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    marginRight: '20px',
  },

  roomName: {
    fontSize: 'calc(10px + 1vmin)'
  },

  leaveBtn: {
    extend: 'btn',
    background: 'tomato',
    marginTop: 0,
    marginLeft: '20px'
  },
})

const ManageRoom = ({ isLoading, room, leave }) => {
  const classes = useStyles()
  return (
    <div className={classes.manageRoomContainer}>
      {
        room
          ? <>
            <div className={classes.roomName}>{`Room ${room}`}</div>
            <button onClick={leave} className={classes.leaveBtn} disabled={isLoading}>Leave the room</button>
          </>
          : ''
      }
    </div>
  )
}

export default ManageRoom

