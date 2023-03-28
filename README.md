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

## 4. Testing Parent data rending as props in Child

[Reference Doc ](https://dev.to/peterlidee/mocking-react-components-jest-mocking-react-part-2-2l8j)

Parent.js

```
import React from 'react'
import Child from './Child'
function Parent() {
  const mydata = {
    message: 'Hello'
  }
  return (
    <div className="ParentComponent">
      <div>Parent Component</div>
      {/* <Child message={'Hello'}/> */}
      {/* {Child(message:'Hello')} */}
      {Child(mydata)}
    </div>
  )
}

export default Parent

```

Child.js

```
import React from 'react'

function Child(props) {
  return (
    <>
      {/* {`Hello ${props.name}`} */}
      <div className="ChildComponent">
        {`Child component 
      ${props.message}
      `}
      </div>
    </>
  )
}

export default Child
```

Parent.test.js

```
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
    
    screen.debug()
    
    expect(Child).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Hello"
    })),
        expect.anything()
})

```

## 5. Mocking useNagivate of React-Router-Dom to verify path, using `act`, `renderHook` from '@testing-library/react-hooks

[Reference Link](https://github.com/testing-library/react-hooks-testing-library/issues/588)

home.js
```
import { useNavigate } from 'react-router-dom';

const useHome = () => {

  const navigate = useNavigate();

  const handleClientChange = () => { navigate(`/home`);};


  return {
    handleClientChange
  };
};


export default useHome
```

home.test.js
```
import useHome from './HomeButton'
import { screen, render } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

//Mocking the useNavigate from React-Router-Domr

const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom")),
    useNavigate: () => mockedNavigator,
}));

it('should  navigate to a new client page', () => {
    const { result } = renderHook(() => useHome());

    act(() => {
        result.current.handleClientChange();
    });

    expect(mockedNavigator).toHaveBeenCalled();
    expect(mockedNavigator).toHaveBeenCalledWith('/home')
});

```

## 5. Mocking useNagivate of React-Router-Dom to verify path, using `screen`, `render` using getAllByRole

header.js
```
import { useNavigate } from 'react-router-dom';

const useHome = () => {

  const navigate = useNavigate();

  const navigateHome = () => { navigate(`/`);};


  return {
                        <div className="menu" >
                        <li onClick={navigateHome} className="home-link">
                            <Button
                                fill="white"
                                icon="ki-home-f"
                                title="HOME"
                                inline="true"
                                size="3rem"
                            />
                        </li>
                    </div>
  };
};


export default useHome
```

header.test.js
```
import Header from './header'
import { screen, render } from '@testing-library/react'
describe('Header has been rendered',()=>{
   
    it('Test validate navigate called from navigateHome method',()=>{
        render(<Header onChange={mockFn} />)
        const homeIcon = screen.getAllByRole('listitem').find(listitem =>listitem.className === "home-link");
        homeIcon.click();
        expect(mockFn).toHaveBeenCalled();
        expect(mockFn).toHaveBeenCalledWith('/')
    })
})
```

- For your specific query I'd suggest [Reference](https://stackoverflow.com/questions/63033144/unable-to-use-getbyrole-on-listitem-with-a-specific-name-rtl)

```
screen.getAllByRole('listitem').find(listitem =>listitem.className === "home-link");
```