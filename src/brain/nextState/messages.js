import { getLocation } from '../notation'

const getPlayerIcon = (icons) => (player) => (player === 1) ? icons[ 0 ] : (player === 2) ? icons[ 1 ] : ''

// move messages
const jumpingMessage = (state, target) => `Player ${getPlayerIcon(state.icons)(state.playerTurn)} jumped: 
    ${getLocation(state.selectedCell.position)} to ${getLocation(target.position)}. `
const walkingMessage = (state, target) => `Player ${getPlayerIcon(state.icons)(state.playerTurn)} walked:
    ${getLocation(state.selectedCell.position)} to ${getLocation(target.position)}. `

// Turn messages
const startMessage = (icons) => `Player ${getPlayerIcon(icons)(1)} turn.`
const playerTurnMessage = (icons, playerTurn) => `Player ${getPlayerIcon(icons)(playerTurn)} turn.`
const gameOverMessage = 'Game Over!'

export { playerTurnMessage, jumpingMessage, startMessage, gameOverMessage, getPlayerIcon, walkingMessage }