const getPlayerIcon = (icons) => (player) => (player === 1) ? icons[ 0 ] : (player === 2) ? icons[ 1 ] : ''

const playerTurnMessage = (icons, playerTurn) => `Player ${getPlayerIcon(icons)(playerTurn)} turn`

const jumpingMessage = (state, startPos, targetPos) => `Player ${state.icons[ state.playerTurn - 1 ]} jumped: 
    ${startPos} to ${targetPos}. `

const startMessage = (icons) => `Player ${getPlayerIcon(icons)(1)} turn`

const gameOverMessage = 'Game Over!'

export { playerTurnMessage, jumpingMessage, startMessage, gameOverMessage, getPlayerIcon }