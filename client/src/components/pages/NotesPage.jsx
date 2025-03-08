import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserNotes } from "../api/noteApis";

import Header from "../common/Header";
import Note from "../common/Note";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../common/Loader";
import EditNote from "../common/EditNote";

export default function NotesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["userNotes"],
    queryFn: getUserNotes,
  });

  const notes = data?.data || [];

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.content.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="note-container">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      {isLoading ? (
        <Loader />
      ) : filteredNotes.length > 0 ? (
        <main>
          {filteredNotes.map((note) => {
            return (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                setIsEditing={setIsEditing}
                searchValue={searchValue}
              />
            );
          })}
        </main>
      ) : searchValue ? (
        <div className="notes-empty">
          <FontAwesomeIcon icon={faSearch} />
          <h2>No notes found.</h2>
          <p>Try adjusting your search or add a new note</p>
        </div>
      ) : (
        <div className="notes-empty">
          <FontAwesomeIcon icon={faNoteSticky} />
          <h2>No notes created.</h2>
          <p>Add your first note</p>
        </div>
      )}
      <Link to="/create-note" className="create-note">
        <div className="icon">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <span>Create</span>
      </Link>
      <Outlet />
      {isEditing && (
        <EditNote noteData={isEditing} setIsEditing={setIsEditing} />
      )}
    </div>
  );
}
