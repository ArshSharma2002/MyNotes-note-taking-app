import React, { useContext } from "react";
import NoteContext from "../context/notes/NotesContext";

  const NoteItem = (props) => {
  const notesContext = useContext(NoteContext);
  const {deleteNote} = notesContext;
  const { note , editNote} = props;

  const handleOnDelete = (e) =>{
    deleteNote(note._id); 
    props.showAlert("Note deleted successfuly" , "success")
  }


  return (


    <>
      {/* { notes.map((note) => {
            return note.title ;
          })} */}
      <div className="card text-white bg-secondary mx-4 mb-3" style={{maxWidth : '18rem'}}>
      <div className="card-header">{note.tag}</div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <button onClick={()=>{editNote(note)}} >
              <i className="fa fa-pencil mx-2" ></i>
          </button>
          <button className="mx-2" onClick={handleOnDelete} >
              <i className="fa fa-trash mx-2" ></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
