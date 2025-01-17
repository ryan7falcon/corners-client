import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? `http://${window.location.hostname}:3001` : `http://${window.location.hostname}:3001`

export const socket = io(URL)