import React, { useState } from 'react';

function CreateArea(props) {
    const [note, setNote] = useState({title: '', content: ''});

    function handleChange(event) {
        const {name: eventName, value} = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [eventName]: value
            }
        });
    }

    return (
        <div>
            <form onSubmit={(event) => {
                props.onAdd(note);
                setNote({title: '', content: ''});
                event.preventDefault();
            }}>
            <input 
                onChange={handleChange} 
                name='title' 
                placeholder='Title' 
                value={note.title}
            />
            <textarea 
                onChange={handleChange} 
                name='content' 
                placeholder='Take a note...' 
                rows='3' 
                value={note.content}
            />
            <button>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
