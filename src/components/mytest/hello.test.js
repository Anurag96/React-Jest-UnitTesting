import { render, screen } from '@testing-library/react'
import Parent from './Parent'
import Child from './Child'
// jest.mock('./Child.js')

test('See child is called in father', () => {
    render(<Parent />)
    // expect(Parent).toHaveBeenCalled()
})

test('See father has text', () => {
    render(<Parent />)
    expect(screen.getByText(/Parent Component/i)).toBeInTheDocument()
})

test('When searching data in child, avoid mocking of child', () => {
    render(<Parent />)
    // screen.debug()
    expect(screen.queryByText(/Child Component/i)).toBeInTheDocument()
    expect(screen.queryByText(/Child component Hello/i)).toBeInTheDocument()
})




