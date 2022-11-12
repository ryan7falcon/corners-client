const playerTurnMessage = (state) => state.message = `Player ${state.icons[ state.playerTurn - 1 ]} turn`

const jumpingMessage = (state, startPos, targetPos) => `Player ${state.icons[ state.playerTurn - 1 ]}: 
    ${startPos} to ${targetPos}`

const startMessage = (getIcon) => `Player ${getIcon(1)} turn`

const gameOverMessage = 'Game Over!'

export { playerTurnMessage, jumpingMessage, startMessage, gameOverMessage }