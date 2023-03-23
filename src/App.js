import { useCounter } from "./useCounter";
import React from 'react'
import Greet from "./components/greet/Greet";
import Parent from "./components/user/Parent";
import ParentComponent from "./components/mock/ParentComponent";
function App() {
  const { count, increment, decrement } = useCounter()
  return (
    <>
      <div className="App">
        <Greet name='Anurag' />
        <button onClick={increment}>+</button>
        {count}
        <button onClick={decrement}>-</button>
        <Parent />
      </div>
      <hr/>
      <div>
        <ParentComponent/>
      </div>
    </>
  );
}

export default App;
