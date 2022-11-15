import express from 'express'

const router = new express.Router()

router.post('/selectCell', async (req, res) => {
  const action = ({
    ...req.body,
  })

  try {
    console.log(action)
    res.status(201).send(action)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/selectCell', async (req, res) => {
  const action = ({
    cell: 1,
  })

  try {
    console.log('get', action)
    res.status(201).send(action)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default router