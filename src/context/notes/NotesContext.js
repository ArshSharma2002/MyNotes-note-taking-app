// context is basically holds all the states . so, that any component can access it directly without passing them as props.
import { createContext } from "react";

// creating a new context .
const NoteContext = createContext();


export default NoteContext;
