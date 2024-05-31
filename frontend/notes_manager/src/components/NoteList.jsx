import {useState, useEffect} from "react";
import {CreateNote} from "./CreateNote";
import {UpdateNote} from "./UpdateNote";
import {useTranslation, Trans} from "react-i18next";

export function NoteList(){
    const {i18n} = useTranslation()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/notes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNotes(data)
            })
            .catch(error => {
                console.error('There was a problem fetching the notes: ', error);
            });

    }, []);

    const deleteHandler = (id) => {
        const res = fetch(`http://localhost:8080/api/notes/${id}`, {
            method: "DELETE",
        }).then(response => {
            if (response.ok){
                setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
            }else{
                console.error("Failed to delete note");
            }
        }).catch(error => {
            console.error('There was a problem deleting the note: ', error);
        })
    }

    return (
        <div id="notes">
            <div id="create-update">
                <CreateNote notes = {notes} setNotes = {setNotes} />
                <UpdateNote notes = {notes} setNotes = {setNotes}/>
            </div>
            <div id="notes-list">
                <h1><Trans i18nKey='title'>Notes</Trans></h1>
                <ul>
                    {
                        notes.map(note => (
                            <li key = {note.id}>
                                <strong>ID</strong> {note.id},
                                <strong>Note name</strong> {note.noteName},
                                <strong>Description</strong> {note.description},
                                <strong>Date</strong> {note.date}
                                <button key={note.id} onClick={()=>{deleteHandler(note.id)}}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

