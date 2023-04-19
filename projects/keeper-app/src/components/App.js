import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote}/>
            {notes.map((note, idx) => <Note key={idx} title={note.title} content={note.content}/>)}
            <Footer />
        </div>
    );
}

export default App;
