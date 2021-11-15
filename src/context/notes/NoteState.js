// here we create all the states wich can be direcrly accesssible by components .
import React , {useState} from "react";
import NoteContext from "./NotesContext";

const NoteState = (props)=>{

    const host = "http://localhost"

    const initialNotes = [];
    // {
    //   "_id": "614f6778634486d022aae2",
    //   "user": "614f66a3634486d15022aad9",
    //   "title": "play BGMI",
    //   "description": "refreshment",
    //   "tag": "enjoy",
    //   "date": "2021-09-25T18:16:24.412Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "61520269998dc7b64be59fa",
    //   "user": "614f66a3634486d15022aad9",
    //   "title": "watch netflix",
    //   "description": "for refrehment",
    //   "tag": "enjoy",
    //   "date": "2021-09-27T17:42:01.210Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "615202698998dc7b64e59fa",
    //   "user": "614f66a3634486d15022aad9",
    //   "title": "watch netflix",
    //   "description": "for refrehment",
    //   "tag": "enjoy",
    //   "date": "2021-09-27T17:42:01.210Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "65202698998dc7b64be59fa",
    //   "user": "614f66a3634486d15022aad9",
    //   "title": "watch netflix",
    //   "description": "for refrehment",
    //   "tag": "enjoy",
    //   "date": "2021-09-27T17:42:01.210Z",
    //   "__v": 0
    // }
    
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
        const result = await response.json();
        console.log(result);

        let newNote = {
          "_id": "65202698998dkhdgsd59fa",
          "user": "614f66a456789sd6d15022aad9",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-09-27T17:42:01.210Z",
          "__v": 0
        };
        // adding/conating new note to the notes state .
        setNotes(notes.concat(newNote));
      }


      // updating a note
      const updateNote = async (id,title,description,tag)=>{
        console.log("updating note...")
        // API CALL for fetching data.
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

      // logic for updating a note .
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
        console.log("note updated with id : " + id)
      }

      // deleting a note
      const deleteNote=(id)=>{
        console.log("deleting note... with id : " + id)
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

