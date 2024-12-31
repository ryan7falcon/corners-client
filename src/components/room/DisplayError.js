import React, { useState } from 'react'

import { createUseStyles } from 'react-jss'
// import styles from '../styles'

const useStyles = createUseStyles({

  errorDisplay: {
    marginRight: '20px'
  }
})

const DisplayError = ({ error }) => {
  const classes = useStyles()
  return error ?
    <div className={classes.errorDisplay}>{error}</div>
    : ''
}

export default DisplayError
