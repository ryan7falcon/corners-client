import { createUseStyles } from 'react-jss'
const cellSize = 'calc(8vmin)'
const useStyles = createUseStyles({
  label: {
    overflow: 'hidden',
    display: 'flex',
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0)',
    position: 'relative',
    userSelect: 'none',
    fontSize: 'calc(5vmin)'
  },
})

const LocationLabel = (label) => {
  const classes = useStyles()
  return <div className={classes.label} key={label}>{label}</div>
}

export default LocationLabel