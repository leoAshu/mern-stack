import React, {useState} from 'react';

function App() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count+1);
    }

    return (
        <div className="container">
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default App;
