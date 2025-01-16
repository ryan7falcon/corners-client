import React, { useEffect, useState, useRef } from 'react'
import './Messages.css'

import { createUseStyles } from 'react-jss'
import styles from '../styles'


const useStyles = createUseStyles({
  ...styles,

  msgBtn: {
    extend: 'btn',
    background: 'deepskyblue',
    marginTop: 0
  },

  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    alignItems: 'center',
    borderRadius: '20px',
  },
  messageListContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    width: '100%',
  },
  messageList: {
    maxWidth: '100%',
    width: '100%',
    overflow: 'auto',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    // '&:last-child': {
    //   position: 'sticky',
    //   bottom: 0
    // }

  }
})

function Messages({ socket }) {
  const [ messages, setMessages ] = useState({})
  const classes = useStyles()
  const mainRef = useRef(null)

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        newMessages[ message.id ] = message
        return newMessages
      })

    }

    // const deleteMessageListener = (messageID) => {
    //   setMessages((prevMessages) => {
    //     const newMessages = { ...prevMessages }
    //     delete newMessages[ messageID ]
    //     return newMessages
    //   })
    // }

    socket.on('message', messageListener)
    // socket.on('deleteMessage', deleteMessageListener)
    // socket.emit('getMessages')

    return () => {
      socket.off('message', messageListener)
      // socket.off('deleteMessage', deleteMessageListener)
    }
  }, [ socket ])

  useEffect(() => {
    mainRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    })
  }, [ messages ])

  return (
    <div className={classes.messageListContainer}>
      <div className={classes.messageList} >
        <div ref={mainRef} />
        {[ ...Object.values(messages) ]
          .sort((a, b) => a.time - b.time)
          .reverse()
          .map((message) => (
            <div
              key={message.id}
              className={classes.messageContainer}
              title={`Sent at ${new Date(message.createdAt).toLocaleTimeString()}`}
            >
              <span className="user">{message.username}:</span>
              <span className="message">{message.text}</span>
              <span className="date">{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Messages