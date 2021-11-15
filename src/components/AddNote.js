import React , {useContext , useState} from 'react'
import NoteContext from '../context/notes/NotesContext'
export const AddNote = () => {
    const notesContext = useContext(NoteContext)
    const {addNote} = notesContext

    const [newNote, setNewNote] = useState({tag:"",description:"",title:""})
    const {title,description,tag} = newNote

    const handleAddNote=(e)=>{
        e.preventDefault();
        addNote(title,description,tag);
        }

    const onChange=(e)=>{
        // e.target.name means 'name' attribute of the input tag becomes equals to the value of that input tag that we are entering . for eg. if name="title" than title :"value we are entering in the input tag" .
        setNewNote({...newNote, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <h2 className="my-4" >Add Notes Here : </h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote} >Add Note</button>
            </form>
        </div>
    )
}
