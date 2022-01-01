import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {

  const [note, setNote] = useState({id:"",etitle:"",etag:"",edescription:""})
  const notesContext = useContext(NoteContext);
  const { notes, getNotes, updateNote } = notesContext;
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);


// useRef hook is used to give reference to an element here we are refering open modal button via edit  note button
  const ref = useRef(null);
  const refClose = useRef(null);

  const editNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,etag:currentNote.tag,edescription:currentNote.description})

  };

  const handleOnUpdate = (e) =>{
    console.log("updating the note...",note)
    updateNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Note updated Successfuly" , "success")
  }

  const onChange = (e) => {
    // e.target.name means 'name' attribute of the input tag becomes equals to the value of that input tag that we are entering . for eg. if name="title" than title :"value we are entering in the input tag" .
    setNote({ ...note, [e.target.name]: e.target.value });
    
  };

  return (
    <>
      <button
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleOnUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Your Notes : </h2>
        {/* <NoteItem/> */}
        <div className="row container my-4">
          
          {notes.length===0 ? "No notes to display. add some" : notes.map((note) => {
            // we are passing each note in NoteItem as props and returning <NoteItem/> . but we can also directly access the same in noteItem by using context api .
            return <NoteItem key={note._id}  showAlert={props.showAlert} editNote={editNote} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
