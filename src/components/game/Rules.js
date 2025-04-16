import { createUseStyles } from 'react-jss'
import walk from '../../assets/walk.gif'
import jump from '../../assets/jump.gif'
import endturn from '../../assets/end-turn.png'
import end from './../../assets/end.gif'

const useStyles = createUseStyles({
  rulesPane: {
    position: 'fixed',
    zIndex: 1,
    transition: 'all 0.5s ease',
    left: 0,
    top: '10vh',
    height: 'calc(100vh - 150px)',
    width: 'calc(100%)',
    //transform: 'translateX(-95vw)',
    '&:hover': {
      transform: 'translateX(0)'
    },
    display: 'flex',
    border: '1px solid grey'
  },
  rulesContainer: {
    backgroundColor: '#2f3239',
    // display: 'flex',
    height: 'calc(100%)',
    width: 'calc(100vw - 200px)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflowY: "auto"
  },
  rulesTab: {
    backgroundColor: 'tomato',
    writingMode: 'sideways-lr',
    borderRadius: '0 10px 10px 0',
    cursor: 'pointer',
    alignItems: 'center',
    display: 'flex',
    height: '4em'
  },
  rulesLink: {
    color: '#282c34',
    transform: 'rotate(-90deg)',
  },
  endImg: {
    maxWidth: '100%'
  },
  walkImg: { maxWidth: '100%' },
  jumpImg: { maxWidth: '100%' },
  endturnImg: { maxWidth: '100%' },
  x: {
    position: 'fixed',
    right: '1.5em',
    cursor: 'pointer',
    padding: '10px'
  },
  p: {
    padding: '10px'
  }
})

function Rules({ state, show, setShow }) {
  const classes = useStyles()
  return (<div>
    <div className={classes.rulesTab} onClick={e => setShow(true)} >
      <div className={classes.rulesLink}>
        Rules
      </div>
    </div>
    {
      show ? <div className={classes.rulesPane} >
        <div className={classes.rulesContainer}>
          <p className={classes.x} onClick={e => setShow(false)}>X</p>
          <h1>Rules</h1>
          <p className={classes.p}>The goal of the game is to swap places with your opponent. Whoever does it first, wins. The looser will keep going until they are done and will count the number of moves needed to finish after the winner has finished.</p>
          <img src={end} alt="game goa is to swap places with the opponent" className={classes.endImg}></img>
          <p className={classes.p}>Possible moves include jumping and walking. Walking is moving your piece by one square in any direction that is not occupied</p>
          <img src={walk} alt="walking one square at a time" className={classes.walkImg}></img>
          <p className={classes.p}>Jumping allows you to move far within one turn by chaining jumps together. You can jump in any direction over your own pieces or over your opponent's. All the pieces always remain on the board.</p>
          <img src={jump} alt="jumping over own pieces and over opponents" className={classes.jumpImg}></img>
          <p className={classes.p}>When you are satisfied with your chain of jumps you end your turn by pressing the button.</p>
          <img src={endturn} alt="ending a turn with a button" className={classes.endturnImg}></img>
        </div>
      </div > : null
    } </div >
  )
}

export default Rules
