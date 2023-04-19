import React, { useState } from 'react';

function App() {

  const [name, setName] = useState({
    fName: '',
    lName: ''
  });

  function handleChange(event) {
    const { value, name: eventName } = event.target;
    
    setName(prevName => {
      if (eventName === 'fName') {
        return {
          fName: value,
          lName: prevName.lName
        };
      } else {
        return {
          fName: prevName.fName,
          lName: value
        };
      }
    });
  }

  return (
    <div className='container'>
      <h1>
        Hello {name.fName} {name.lName}
      </h1>
      <form>
        <input 
          onChange={handleChange} 
          name='fName' 
          placeholder='First Name' 
          value={name.fName}
        />
        <input 
          onChange={handleChange} 
          name='lName' 
          placeholder='Last Name' 
          value={name.lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
