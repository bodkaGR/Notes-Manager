import {useState, useEffect} from "react";
import {CreateNote} from "./CreateNote";
import {UpdateNote} from "./UpdateNote";
import {useTranslation, Trans} from "react-i18next";
import {GetNoteById} from "./GetNoteById";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/notesList.scss'

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
        <div id="notes" data-testid="cypress-notes-container">
            <div id="create-update">
                <CreateNote notes = {notes} setNotes = {setNotes} />
                <UpdateNote notes = {notes} setNotes = {setNotes}/>
                <GetNoteById />
            </div>
            <div id="notes-list">
                <h1><Trans i18nKey='title'>Notes</Trans></h1>
                <ul id="list">
                    <TransitionGroup>
                    {
                        notes.map(note => (
                            <CSSTransition
                                key={note.id}
                                timeout={1000}
                                classNames="list-item"
                            >
                                <li key = {note.id} className="list-item" data-testid="cypress-noteList">
                                    <strong>ID</strong> {note.id} <br/>
                                    <strong>Note name</strong> {note.noteName} <br/>
                                    <strong>Description</strong> {note.description} <br/>
                                    <strong>Date</strong> {note.date} <br/>
                                    <button key={note.id} onClick={()=>{deleteHandler(note.id)}}>Delete</button>
                                </li>
                            </CSSTransition>
                        ))
                    }
                    </TransitionGroup>
                </ul>
            </div>
        </div>
    );
}

