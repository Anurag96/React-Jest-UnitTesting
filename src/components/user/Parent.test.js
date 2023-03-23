import {screen,render} from '@testing-library/react'
import Parent from './Parent'

import Child from  './Child'
jest.mock('./Child.js')
Child.mockImplementation(props => props.user)

jest.mock('./User.js')
import User from   './User'

import SubChild from './SubChild'
// SubChild.mockImplementation(props => props.name)
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

test('SubChild mock was called',()=>{
    // render(<Parent name='Anurag'/>)
    render(<SubChild name='Anurag'/>)
    expect(SubChild).toHaveBeenCalled()
    // expect(screen.getByText(/SubComponent is used by Anurag/i)).toBeInTheDocument();
})

// test('User mock was called', () => {
//     render(<Parent />)
//     expect(User).toHaveBeenCalled()
//   })

