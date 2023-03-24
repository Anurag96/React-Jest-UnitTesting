import { useCounter } from "./useCounter";
import React from 'react'
import Greet from "./components/greet/Greet";
import Parent from "./components/user/Parent";
import ParentComponent from "./components/mock/ParentComponent";
import Parent1 from "./components/mytest/Parent";
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
        <Parent1/>
      </div>
    </>
  );
}

export default App;
