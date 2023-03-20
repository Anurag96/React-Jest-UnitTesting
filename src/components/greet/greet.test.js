import Greet from './Greet'
import {render,screen} from '@testing-library/react'


describe('Testing Greet rendering',()=>{
    test('greet renders correctly',()=>{
        render(<Greet/>)
        const textValue = screen.getByText(/Hello/i)
        expect(textValue).toBeInTheDocument()
    })
})

describe('Testing Greet rendering',()=>{
    test('Greet render with name',()=>{
        render(<Greet name='Anurag'/>)
        const textValue = screen.getByText(/ Hello Anurag/i)
        expect(textValue).toBeInTheDocument()
    })
})