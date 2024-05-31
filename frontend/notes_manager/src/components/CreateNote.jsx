import React, { useEffect, useState } from "react";
import {Trans} from "react-i18next";

export function CreateNote(props){
    const [formData, setFormData] = useState({
        noteName:"",
        description:"",
        date:""
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:8080/api/notes", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok){
                const newNote = await response.json();
                console.log("Post successful!");
                props.setNotes(prevNotes => [...prevNotes, newNote]);
                // Reset form data
                setFormData({
                    noteName:"",
                    description:"",
                    date:""
                });
            }else{
                console.error("Failed to post data");
            }
        }catch (error){
            console.error("Error posting data:", error);
        }
    };

    return (
        <div className="create form">

            <h1><Trans i18nKey="noteCreation">Create</Trans></h1><br/>
            <form id="noteForm" onSubmit={handleSubmit}>

                <label htmlFor="noteName"><Trans i18nKey="noteName">Note Name:</Trans></label>
                <input type="text" value={formData.noteName} id="noteName" name="noteName" onChange={handleChangeInput} required></input><br/><br/>

                <label htmlFor="description"><Trans i18nKey="description">Description:</Trans></label>
                <textarea id="description" value={formData.description} name="description" onChange={handleChangeInput} required></textarea><br/><br/>


                <label htmlFor="date"><Trans i18nKey="date">Date:</Trans></label>
                <input type="date" value={formData.date} id="date" name="date" onChange={handleChangeInput} required></input><br/><br/>

                    <button type="submit">
                        <Trans i18nKey="submit">
                            Submit
                        </Trans>
                    </button>
            </form>
        </div>
    );
}