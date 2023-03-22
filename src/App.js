import {useCounter} from "./useCounter";
import React from 'react'
import Greet from "./components/greet/Greet";
import Parent from "./components/user/Parent";
function App() {
  const {count,increment,decrement } = useCounter()
  return (
    <div className="App">
      <Greet name='Anurag'/>
      <button onClick={increment}>+</button>
      {count}
      <button onClick={decrement}>-</button>
      <Parent/>
    </div>
  );
}
 
export default App;
