import React from 'react';

let count = 0;

function increment() {
  count++;
  console.log(count);
}

function App() {
    return (
        <div className="container">
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default App;
