import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    // now all the states we have declared in NoteState.js will be accessible by all the components wrapped inside <NoteState> ... </NoteState>
    <NoteState>
      <Router>
        <Navbar title="mereNotes" />
        <div className="container">
        {/* <h1 className ="container d-flex justify-content-centre" >My Notes - your notes on cloud</h1> */}
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
