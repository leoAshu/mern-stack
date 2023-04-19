import React, { useState } from 'react';
import InputArea from './InputArea';
import ToDoItem from './ToDoItem';

function App() {
  const [items, setItems] = useState([]);

  function addItem(newItem) {
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
    // setInputText('');
  }

  function deleteItem(id) {
    setItems((prevItems) => prevItems.filter((item, idx) => id !== idx));
  }

  return (
    <div className='container'>
      <div className='heading'>
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem}/>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              item={todoItem}
              onClick={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
