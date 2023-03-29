export default {
  btn: {
    boxSizing: 'borderBox',
    marginTop: 'calc(10px + 2vmin)',
    '&:disabled': {
      background: '#AAA',
      '&:after': {
        transition: 'none'
      }
    },
    borderRadius: 'calc(25px + 1vmin)',
    padding: {
      top: 'calc(10px + 0vmin)',
      bottom: 'calc(10px + 0vmin)',
      left: 'calc(10px + 1vmin)',
      right: 'calc(10px + 1vmin)'
    },
    border: 'None',
    fontSize: 'calc(10px + 1vmin)',
    span: {
      zIndex: 20
    },
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '2px 5px 5px 5px rgb(0 0 0 / 5%)',
    transition: 'all 500ms cubic-bezier(0.19, 1, 0.22, 1)',
    '&:after': {
      background: '#fff',
      content: "''",
      height: 'calc(30px + 2vmin)',
      left: ' calc(-150px - 6vmin)',
      opacity: '.2',
      position: 'absolute',
      top: 'calc(-10px - 1vmin)',
      transform: 'rotate(-35deg)',
      transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)',
      width: 'calc(150px + 6vmin)',
      zIndex: '10'
    },
    '&:hover': {
      transform: 'scale(1.01)',
      transition: 'all 500ms cubic-bezier(0.19, 1, 0.22, 1)',
      boxShadow: '2px 5px 5px 8px rgb(0 0 0 / 8%)',
      '&:after': {
        left: '120%',
        transition: 'all 1000ms cubic-bezier(0.19, 1, 0.22, 1)'
      }
    }
  }
}