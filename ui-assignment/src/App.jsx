import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '' });
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  // Load notes from local storage on initial render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to local storage whenever 'notes' changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.title && newNote.description) {
      setNotes([...notes, newNote]);
      setNewNote({ title: '', description: '' });
    }
  };

  const handleUpdateNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = { title: newNote.title, description: newNote.description };
      setNotes(updatedNotes);
      setNewNote({ title: '', description: '' });
      setSelectedNoteIndex(null);
    }
  };

  const handleEditNote = (index) => {
    const selectedNote = notes[index];
    setNewNote({
      title: selectedNote.title,
      description: selectedNote.description,
    });
    setSelectedNoteIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>Notes Management</h1>
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        {selectedNoteIndex !== null ? (
          <button className="update-button" onClick={handleUpdateNote}>Update</button>
        ) : (
          <button className="add-button" onClick={handleAddNote}>Add Note</button>
        )}
      </div>

      <div className="note-list">
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button className="edit-button" onClick={() => handleEditNote(index)}>Edit</button>
            <button className="delete-button" onClick={() => handleDeleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;