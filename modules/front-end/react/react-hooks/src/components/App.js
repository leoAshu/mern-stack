import React from 'react';

function App() {
    let count = 0;

    function increment() {
        count++;
    }
    return (
        <div className="container">
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default App;
