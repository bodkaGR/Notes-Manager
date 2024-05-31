import React, {useState} from "react";
import {Trans} from "react-i18next";

export function UpdateNote(props){
    const [formData, setFormData] = useState({
        id:"",
        noteName:"",
        description:"",
        date:""
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleIdChange = (e) => {
    //     setNoteId(e.target.value);
    // };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:8080/api/notes/${formData.id}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok){
                const updatedNote = await response.json();
                console.log("Put successful!");
                // Update the notes state with the updated note
                props.setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === updatedNote.id ? updatedNote : note
                    )
                );
                // Reset form data
                setFormData({
                    id:"",
                    noteName:"",
                    description:"",
                    date:""
                });
            }else{
                console.error("Failed to put data");
            }
        }catch (error){
            console.error("Error putting data:", error);
        }
    };

    return(
        <div className="update form">
            <h1><Trans i18nKey="updateNote">Update</Trans></h1>
            <form id="noteForm" onSubmit={handleUpdateSubmit}>
                <label htmlFor="id-label">Id:</label>
                <input
                    type="text"
                    value={formData.id}
                    id="id"
                    name="id"
                    onChange={handleChangeInput}
                    required
                />
                <br/><br/>

                <label htmlFor="noteName"><Trans i18nKey="noteName">Note Name:</Trans></label>
                <input
                    type="text"
                    value={formData.noteName}
                    id="noteName"
                    name="noteName"
                    onChange={handleChangeInput}
                    required
                />
                <br/><br/>

                <label htmlFor="description"><Trans i18nKey="description">Description:</Trans></label>
                <textarea
                    id="description"
                    value={formData.description}
                    name="description"
                    onChange={handleChangeInput}
                    required
                /><br/><br/>

                <label htmlFor="date"><Trans i18nKey="date">Date:</Trans></label>
                <input
                    type="date"
                    value={formData.date}
                    id="date"
                    name="date"
                    onChange={handleChangeInput}
                    required
                /><br/><br/>

                <button type="submit"><Trans i18nKey="submit">Submit</Trans></button>
            </form>
        </div>
    )
}

