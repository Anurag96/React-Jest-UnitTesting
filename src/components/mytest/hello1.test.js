import { render, screen } from '@testing-library/react'
import Parent from './Parent'
import Child from './Child'
jest.mock('./Child.js')


test('See father has text', () => {
    render(<Parent />)
    expect(screen.getByText(/Parent Component/i)).toBeInTheDocument()
    expect(screen.queryByText(/Child Component/i)).not.toBeInTheDocument()
})

test('See child is called in father', () => {
    render(<Parent />)
    expect(Child).toHaveBeenCalled()
    expect(Child.mock.calls).toHaveLength(1)
})

test('See if any one child props is called in father', () => {
    render(<Parent />)
    screen.debug()
    expect(Child).toHaveBeenCalledWith(expect.objectContaining({
        message: "Hello"
    })),
        expect.anything()
})

test('See if all child props is called in father', () => {
    render(<Parent />)
    // screen.debug()
    expect(Child).toHaveBeenCalledWith(expect.objectContaining({ "description": "test description", "message": "Hello", "subTitle": "test subTitle", "title": "test title" })),
        expect.anything()

})


