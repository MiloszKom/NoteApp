import React, { useState } from "react";
import { Link } from "react-router-dom";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotesMutations } from "../hooks/useNotesMutations";

import Spinner from "../common/Spinner";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { createNoteMutation } = useNotesMutations();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };

    createNoteMutation.mutate(data);
  };

  return (
    <>
      <div className="add-note-modal">
        <form className="add-note-form">
          <div className="add-note-header">
            <label className="modal-label">TITLE</label>
            <Link to="/" className="close-btn">
              <FontAwesomeIcon icon={faXmark} />
            </Link>
          </div>
          <input
            type="text"
            className="modal-title"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="modal-label">CONTENT</label>
          <textarea
            className="modal-content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className={`add-note-btn ${
              createNoteMutation.isPending ? "disabled" : ""
            }`}
            onClick={handleSubmit}
            disabled={createNoteMutation.isPending}
            type="submit"
          >
            {createNoteMutation.isPending ? <Spinner /> : "Add New Note"}
          </button>
        </form>
      </div>
      <div className="shade" />
    </>
  );
}
