# Jest & React-Testing-Library with React

- To run test case on virtual test dom we require `--env=jsdom`
- To run the test cases execute `npm run test` Script : jest --env=jsdom
- To run the test coverage execute `npm run coverage` Script : jest --env=jsdom --coverage
- Jest helps to find the test folder, run them and return Fail or Pass report output.
- Usually a test function starts with either test('',()=>{}) || it('',()=>{})
- The test() takes two parameter : 1. Description of Test 2. Call back function
- Test() can be written inside the describe
```
describe('',()=>{
    test('',()=>{})
})
```

Libraries Required :
- import { render, screen } from '@testing-library/react'


## Write a basic Unit Test with/without passing Props
- welcome.jsx
```
function welcome(props) {
  return (
    <div>
      <span>
      {`Hello ${props.name}`}
      </span>
    </div>
  )
}

export default welcome
```

- welcome.test.js
```
import {render,screen} from '@testing-library/react'
import Welcome from './welcome'

describe('Test Suite 1',()=>{
    test('test welcome render',()=>{
        render(<Welcome/>)                         // without passing Props
        render(<Welcome name={'Anurag Kumar'}/>)   // with passing Props
        const textValue = screen.getByText("Hello Anurag Kumar")
        expect(textValue).toBeInTheDocument()
    })
})
```

## Thinks to remember :
- Test suite can be written inside the describe
- Test suite can be written inside the it/test
- The component which is being tested has to be imported never be mocked.
- @testing-library/react provide 1.Render 2.Screen 
- Jest provide 1.mock() function 2.expect() function .
- Mock all the component imported inside the component for which test is being written to being with.

## how to mock 
- Library mocking 
```
const mockFn = jest.fn()
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockFn,
}));

jest.mock('react-redux', () => ({
    useDispatch: () => mockFn,
}));

```
- Redux mocking 
```
jest.mock('../../redux/loadingSlice', () => ({
    storeIsLoading: () => mockFn,
}));

```
- Mocking Component 
``` 
jest.mock("./appCard") 
```

## Check is Child is loading in Parent [Reference Doc](https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn)

- Parent.jsx
```
import React from 'react'
import Child from './Child'

function Parent() {
    
       return (
        <>
            <div>Parent Component</div>
            <Child />
        </>
    )
}

export default Parent

```

- Child.jsx
```
export default function Child(){
    return(
      <>
        <div>component Child</div>
      </>
    )
  }
```

- Parent.test.jsx
```
import {screen,render} from '@testing-library/react'
import Parent from './Parent'
import Child from  './Child'
jest.mock('./Child.js')
Child.mockImplementation(props => props.user) // for mocking any props

test('Child mock was called',()=>{
    render(<Parent/>)
    expect(Child).toHaveBeenCalled()
})

```