import {render,screen} from '@testing-library/react'
import ParentComponent from './ParentComponent'
import WrapperComponent from './WrapperComponent'
jest.mock('./WrapperComponent.js')
beforeEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    WrapperComponent.mockImplementation(props => <>{props.children}</>)
  })

test("Testing if text Parent Component has been called",()=>{
render(<ParentComponent/>)
const textValue = screen.getByText(/Parent Component/i)
expect(textValue).toBeInTheDocument()
})

test("Testing if Wrapper Rendered",()=>{
    render(<ParentComponent/>)
    expect(WrapperComponent).toHaveBeenCalled()
    })

    test('Wrapper mock was called with the correct arguments', () => {
        render(<ParentComponent />)
        expect(WrapperComponent).toHaveBeenCalledTimes(2)
        // expect(screen.getAllByText(/Textblock/)).toHaveLength(4)
      })