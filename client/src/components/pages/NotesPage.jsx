import React from "react";
import { Link, Outlet } from "react-router-dom";

import Header from "../common/Header";
import Note from "../common/Note";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function NotesPage() {
  return (
    <div className="note-container">
      <Header />
      <main>
        <Note />
        <Note />
      </main>
      <Link to="/create-note" className="create-note">
        <div className="icon">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <span>Create</span>
      </Link>
      <Outlet />
    </div>
  );
}
