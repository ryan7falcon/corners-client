import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Game Title', () => {
  render(<App />)
  const gameTitleElement = screen.getByText(/Game of Corners/i)
  expect(gameTitleElement).toBeInTheDocument()
})

test('End turn buton is disabled at the start of the game', () => {
  render(<App />)
  expect(screen.getByText(/End Turn/i).closest('button')).toBeDisabled()
})
