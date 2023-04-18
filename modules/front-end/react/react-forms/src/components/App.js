import React, {useState} from 'react';

function App() {
  const [name, setName] = useState('');

  function onChange(event) {
    setName(event.target.value);
  }

  return (
    <div className='container'>
      <h1>Hello {name}</h1>
      <input 
        onChange={onChange} 
        type='text' 
        placeholder="What's your name?" 
        value={name}
      />
      <button>Submit</button>
    </div>
  );
}

export default App;
