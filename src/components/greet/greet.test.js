import Greet from './Greet'
import {render,screen} from '@testing-library/react'


describe('Testing Greet rendering 1',()=>{
    test('greet renders correctly',()=>{
        render(<Greet/>)
        const textValue = screen.getByText(/Hello/i)
        expect(textValue).toBeInTheDocument()
    })
})

describe('Testing Greet rendering 2',()=>{
    test('Greet render with name',()=>{
        render(<Greet name={'Anurag Kumar'}/>)
        const textValue = screen.getByText(/Hello Anurag Kumar/i)
        expect(textValue).toBeInTheDocument()
    })
})