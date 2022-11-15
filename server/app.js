import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

import selectCellRouter from './routers/selectCellRouter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(selectCellRouter)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

export default app