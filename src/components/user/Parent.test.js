import {screen,render} from '@testing-library/react'
import Parent from './Parent'
import Child from  './Child'
jest.mock('./Child.js')

jest.mock('./User.js')
jest.mock('./SubChild.js')
import User from   './User'
Child.mockImplementation(props => props.user)

import SubChild from './SubChild'
jest.mock('./SubChild.js')

test('Render Parent Text Test Suite',()=>{
    render(<Parent/>)
    const textValue = screen.getByText(/Parent Component/i)
    expect(textValue).toBeInTheDocument()
})

test('Child mock was called',()=>{
    render(<Parent/>)
    expect(Child).toHaveBeenCalled()
})
test('Child mock was called',()=>{
    render(<Parent/>)
    expect(SubChild).toHaveBeenCalled()
})

// test('User mock was called', () => {
//     render(<Parent />)
//     expect(User).toHaveBeenCalled()
//   })

