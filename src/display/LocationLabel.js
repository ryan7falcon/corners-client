import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  label: {
    overflow: 'hidden',
    display: 'flex',
    width: 'calc(20px + 5vmin)',
    height: 'calc(20px + 5vmin)',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0)',
    position: 'relative',
    userSelect: 'none'
  },
})

const LocationLabel = (label) => {
  const classes = useStyles()
  return <div className={classes.label} key={label}>{label}</div>
}

export default LocationLabel