import React from "react";
import { AddNote } from "./AddNote";
import Notes from "./Notes";

export default function Home(props) {
  const {showAlert} = props;
  return (
    <>
      <AddNote showAlert={showAlert} />
      <div className="container my-4">
        <Notes showAlert={showAlert} />
      </div>
    </>
  );
}
