import React, {useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleClick(event) {
    setName(value);
    event.preventDefault();
  }

  return (
    <div className='container'>
      <h1>Hello {name}</h1>
      <form onSubmit={handleClick}>
        <input 
          onChange={handleChange}
          type='text' 
          placeholder="What's your name?" 
          value={value}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
