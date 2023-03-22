import {render,screen} from '@testing-library/react'
import Welcome from './welcome'

describe('Test Suite 1',()=>{
    test('test welcome render',()=>{
        render(<Welcome/>)
        render(<Welcome name={'Anurag Kumar'}/>)
        const textValue = screen.getByText("Hello Anurag Kumar")
        expect(textValue).toBeInTheDocument()
    })
})