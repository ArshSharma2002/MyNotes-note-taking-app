import React, { useContext , useEffect } from "react";
import NoteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const notesContext = useContext(NoteContext);
  const {notes , getNotes} = notesContext;

  useEffect(() => {
    getNotes()
  }, [])
  

  return (
    <>
      <div className="container">
        <h2>Your Notes : </h2>
        {/* <NoteItem/> */}
        <div className="row container my-4" >
          {notes.map((note) => {
            // we are passing each note in NoteItem as props and returning <NoteItem/> . but we can also directly access the same in noteItem by using context api .
            return <NoteItem key={note._id} note={note}/>;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
