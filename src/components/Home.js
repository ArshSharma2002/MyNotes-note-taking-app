import React from "react";
import { AddNote } from "./AddNote";
import Notes from "./Notes";

export default function Home() {
  return (
    <>
      <AddNote />
      <div className="container my-4">
        <Notes />
      </div>
    </>
  );
}
