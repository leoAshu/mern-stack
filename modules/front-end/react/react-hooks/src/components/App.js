import React, {useState} from 'react';

function App() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        count > 0 && setCount(count - 1);
    }

    function getTime() {
        setTime(new Date().toLocaleTimeString());
    }
    setInterval(getTime, 1000);

    return (
        <div className='container'>
            <h2>{time}</h2>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default App;
