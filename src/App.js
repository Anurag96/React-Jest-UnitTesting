import {useCounter} from "./useCounter";
import React from 'react'
import Greet from "./components/greet/Greet";
function App() {
  const {count,increment,decrement } = useCounter()
  return (
    <div className="App">
      <Greet name='Anurag'/>
      <button onClick={increment}>+</button>
      {count}
      <button onClick={decrement}>-</button>
    </div>
  );
}
 
export default App;
