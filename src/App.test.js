import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

test('Clicking on a cell updates valid moves', () => {
  render(<App />)
  fireEvent.click(screen.getByTestId('cell-6-0'))
  expect(screen.getByTestId('cell-6-0').className).toContain('selectedCell')
  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error

  expect(screen.getByTestId('cell-4-2').className).toContain('validTargetCell')
})

test('jumping preserves selection of the cell', () => {
  render(<App />)
  fireEvent.click(screen.getByTestId('cell-6-0'))
  fireEvent.click(screen.getByTestId('cell-4-2'))
  // target becomes new selected piece
  expect(screen.getByTestId('cell-4-2').className).toContain('selectedCell')
  // old start becomes new valid target
  expect(screen.getByTestId('cell-6-0').className).toContain('validTargetCell')
})

test('End turn deselects the cell', () => {
  render(<App />)
  // make a jump
  fireEvent.click(screen.getByTestId('cell-6-0'))
  fireEvent.click(screen.getByTestId('cell-4-2'))
  // end turn
  fireEvent.click(screen.getByText('End Turn').closest('button'))
  // should not be selected
  expect(screen.getByTestId('cell-4-2').className).not.toContain('selectedCell')
})
