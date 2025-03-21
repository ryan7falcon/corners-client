import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'dev' ? `http://${window.location.hostname}:3001` : `http://52.14.157.242:3001`
// const URL = process.env.NODE_ENV === 'dev' ? `https://${window.location.hostname}:3001` : `https://cornersapi.artisando.ca:3001`
const URL = process.env.NODE_ENV === 'dev' ? `https://${window.location.hostname}:3001` : `https://corners-server.artisando.ca`
// const URL = `http://${window.location.hostname}:3001`
export const socket = io(URL)