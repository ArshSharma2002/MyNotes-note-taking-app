// here we create all the states wich can be direcrly accesssible by components .
import React , {useState} from "react";
import NoteContext from "./NotesContext";

const NoteState = (props)=>{

    const host = "http://localhost"

    const initialNotes = [];
    
    const [notes, setNotes] = useState(initialNotes)
    

      // fetching all note
      const getNotes = async ()=>{

        // API call for fetching note .
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjY2YTM2MzQ0ODZkMTUwMjJhYWQ5In0sImlhdCI6MTYzNTg3MTI5Mn0.Wk8mcnCrfMSddmZs5r8dST1jGleUrPOxsMNRc3hjJW8'
            
            
          }
        });

        const json = await response.json();
        console.log(json)

        setNotes(json)

      }

      // Adding a note
      const addNote = async (title,description,tag)=>{
        console.log("Note is added...")

        // API call for adding note .
        const url = host+"/api/notes/addnotes";
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjY2YTM2MzQ0ODZkMTUwMjJhYWQ5In0sImlhdCI6MTYzNTg3MTI5Mn0.Wk8mcnCrfMSddmZs5r8dST1jGleUrPOxsMNRc3hjJW8'
            
            
          },
          // {title,description,tag} is an object title:title , desc:desc ...... so on .
          body: JSON.stringify({title,description,tag}) 
        });
        const newNote = await response.json();
        console.log(newNote);
        setNotes(notes.concat(newNote));
      }


      // updating a note
      const updateNote = async (id,title,description,tag)=>{
        console.log("updating note...")
        // API CALL for updating data.
        const url = host +"/api/notes/updatenotes/"+id;
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjY2YTM2MzQ0ODZkMTUwMjJhYWQ5In0sImlhdCI6MTYzNTg3MTI5Mn0.Wk8mcnCrfMSddmZs5r8dST1jGleUrPOxsMNRc3hjJW8'
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        // return response.json();
        const result = await response.json();
        console.log(result);

        // we cannot change the state directluy in reactjs so, here we are makinga copy of note state as newNotes
        // here we are making a copy of note state as newNotes so that we can assign updated values to the newNotes.
        let newNotes = JSON.parse(JSON.stringify(notes))
      // logic for updating a note at client side .
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes)
        console.log("note updated with id : " + id)
      }

      // deleting a note
      const deleteNote = async (id)=>{
        console.log("deleting note... with id : " + id)
        // API CALL for deleting data.
        const url = host +"/api/notes/deletenotes/"+id;
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0ZjY2YTM2MzQ0ODZkMTUwMjJhYWQ5In0sImlhdCI6MTYzNTg3MTI5Mn0.Wk8mcnCrfMSddmZs5r8dST1jGleUrPOxsMNRc3hjJW8'
          }

        });
        // return response.json();
        const result = await response.json();
        console.log(result);
        const newNotes = notes.filter((note)=>{
          // the notes whose id  do not matches with the id of note to be deleted will remain in newNotes else whose id matches will be deleted .
          return note._id !== id;
        })

        setNotes(newNotes)
      }


    return(
        // if we wrap up the components inside <NoteState> tags than all those components can access these states . value = {{state:state , update:update}}
        <NoteContext.Provider value = {{notes,addNote,updateNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;

