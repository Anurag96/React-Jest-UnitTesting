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

## 1. Check is Parent if Child is loading 
[Reference Doc](https://dev.to/peterlidee/how-to-test-a-component-passed-as-prop-with-jest-4pgn)

- Parent.jsx
```
import Child from './Child'
import User from './User'

export default function Parent(){
  const user = <User name="Peter" />
  return(
    <>
      <div>component Parent</div>
      <Child user={user} />
    </>
  )
}

```
- User.jsx

```
export default function User({ name }){
  return(
    <>
      <div>component User</div>
      <div>name: {name}</div>
    </>
  )
}
```

- Child.jsx
```
export default function Child(props){
    return(
      <>
        <div>component Child</div>
        {props.user}
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

## 2. Check in Parent if text is present

### Example 1

- Welcome.jsx
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

- Welcome.test.jsx
```
test('test welcome render',()=>{
        render(<Welcome/>)
        render(<Welcome name={'Anurag Kumar'}/>)
        const textValue = screen.getByText("Hello Anurag Kumar")
        expect(textValue).toBeInTheDocument()
    })

```

### Example 2
- appCard.jsx
```
function appCard(props) {
  return (
    <div>
      <div className="mx-3 my-3">{props.data.title} </div>
      <div className="mx-3 my-3">{props.data.subTitle} </div>
      <div className="mx-3 my-3">{props.data.description} </div>
    </div>
  )
}

export default welcome
```

- appCard.test.jsx
```
import { render, screen } from '@testing-library/react'
import AppCard from './appCard';
const data = {
        title: 'test title',
        subTitle: 'test subTitle',
        description: 'test description',
}

    it('Test Rendering of AppCard',()=>{
        render(<AppCard data={data} />)
        expect(screen.getByText('test title')).toBeInTheDocument()
    })

```

## 3. Testing Hooks useState in Parent

- useCounter.jsx
```
import React, {useState} from 'react'

export const useCounter = ()=> {
    
    const [count, setCount] =  useState(0)
    const increment = ()=>{
    setCount(count+1)
    }
    const decrement = ()=>{
      setCount(count-1)
    }
      return {count,increment,decrement}
}
```

- useCounter.test.jsx

```
import { useCounter } from './useCounter'
import { act, renderHook } from '@testing-library/react-hooks'

describe('Increment', () => {
    it('increment acount by 1', () => {
        const { result } = renderHook(useCounter)

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
        act(() => {
            result.current.decrement()
        })
        expect(result.current.count).toBe(0)
    })
})
```