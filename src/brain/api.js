import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001"
})


const restartGame = async (icons = [ '💩', '💎' ]) => {
  const response = await api.get('restartGame', {
    params: {
      icons
    }
  })
  return response.data.game
}

export { restartGame }