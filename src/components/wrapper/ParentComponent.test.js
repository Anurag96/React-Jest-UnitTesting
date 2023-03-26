import { screen,render } from "@testing-library/react";
import ParentComponent from "./ParentComponent";
import WrapperComponent from "./WrapperComponent";

jest.mock('./WrapperComponent')
beforeEach(() => {
    // eslint-disable-next-line testing-library/no-node-access
    WrapperComponent.mockImplementation(props => <>{props.children}</>)
  })
  
test('Test where Parent component is loaded ',()=>{
render(<ParentComponent/>)
const textValue = screen.getByText(/Parent Component/i)
expect(textValue).toBeInTheDocument()
})

test('Test where Parent component is loaded ',()=>{
render(<ParentComponent/>)
const textValue = screen.getByText(/Parent Component/i)
expect(textValue).toBeInTheDocument()
})

test('Check Child Render',()=>{
    render(<ParentComponent/>)
    expect(WrapperComponent).toHaveBeenCalledTimes(2)
    expect(screen.getAllByText(/Textblock/)).toHaveLength(4)
})

test('',()=>{
    render(<ParentComponent/>)
    expect(screen.queryAllByText(/Wrapper Component/i)).toHaveLength(0)
})