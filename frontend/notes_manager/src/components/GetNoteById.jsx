import {useEffect, useState} from "react";
import {Trans} from "react-i18next";

export function GetNoteById(){
    const [selectedNote, setSelectedNote] = useState(null);
    const [noteId, setNoteId] = useState()
    const [error, setError] = useState(null);


    const getNoteById = (id) => {
        fetch(`http://localhost:8080/api/notes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setError(null);
                return response.json();
            })
            .then(data => {
                setSelectedNote(data);
            })
            .catch(error => {
                setError("Note not found")
                alert("Note not found");
                console.error('There was a problem fetching the note: ', error);
            });
    };

    const handleIdChange = (e) => {
        setNoteId(e.target.value);
    };

    const handleGetNote = () => {
        getNoteById(noteId);
    };

    return (
        <div className="getById form">
            <h1><Trans i18nKey="noteById">Note by id</Trans></h1>
            <input
                type="text"
                value={noteId}
                onChange={handleIdChange}
                placeholder="Enter note ID"
            />
            <button onClick={handleGetNote}><Trans i18nKey="getNote">Get Note</Trans></button>
            {error && <div className="error-message"><Trans i18nKey="error">{error}</Trans></div>}
            {selectedNote && (
                <div>
                    <h3><Trans i18nKey="noteDetails">Note Details</Trans></h3>
                    <p><strong>Note name:</strong> {selectedNote.noteName}</p>
                    <p><strong>Description:</strong> {selectedNote.description}</p>
                    <p><strong>Date:</strong> {selectedNote.date}</p>
                </div>
            )}
        </div>
    );
}