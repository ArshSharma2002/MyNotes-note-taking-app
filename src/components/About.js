import React,{ useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NotesContext'

export default function About() {
    // useContext is a func. to use any context which it takes as an argument.
    const notesContext = useContext(NoteContext);
    // useEffect(() => {
    //     a.update();
    // }, []) // this array is given empty because we want to run this hook only once.

    return (
            // we are using a.state.name because we are requiring here a = state and state consists of name and stars
        <p>
            this is about Arsh and have 5 stars on CodeChef.
        </p>
    )
}


