import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const [updateNote, setUpdateNote] = useState({updatedtitle:"",updatedtag:"",updateddescription:""})

  const notesContext = useContext(NoteContext);
  const { notes, getNotes } = notesContext;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);


// useRef hook is used to give reference to an element here we are refering open modal button via edit   note button
  const ref = useRef(null);

  const editNote = (currentNote) => {
    ref.current.click();
    setUpdateNote({updatedtitle:currentNote.title,updatedtag:currentNote.tag,updateddescription:currentNote.description})

  };


  const onChange = (e) => {
    // e.target.name means 'name' attribute of the input tag becomes equals to the value of that input tag that we are entering . for eg. if name="title" than title :"value we are entering in the input tag" .
    setUpdateNote({ ...updateNote, [e.target.name]: e.target.value });
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
                  <label htmlFor="updatedtitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updatedtitle"
                    name="updatedtitle"
                    value={updateNote.updatedtitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updateddescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateddescription"
                    name="updateddescription"
                    value={updateNote.updateddescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="updatedtag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="updatedtag"
                    name="updatedtag"
                    value={updateNote.updatedtag}
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
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
          {notes.map((note) => {
            // we are passing each note in NoteItem as props and returning <NoteItem/> . but we can also directly access the same in noteItem by using context api .
            return <NoteItem key={note._id} editNote={editNote} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
