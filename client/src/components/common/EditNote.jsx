import React, { useState } from "react";
import { Link } from "react-router-dom";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotesMutations } from "../hooks/useNotesMutations";

import Spinner from "../common/Spinner";

export default function EditNote({ noteData, setIsEditing }) {
  const [title, setTitle] = useState(noteData.title);
  const [content, setContent] = useState(noteData.content);

  const { editNoteMutation } = useNotesMutations();

  const editNote = (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };

    editNoteMutation.mutate(
      { data, noteId: noteData.id },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <>
      <div className="add-note-modal">
        <form className="add-note-form">
          <div className="add-note-header">
            <label className="modal-label">TITLE</label>
            <div
              className="close-btn"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
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
              editNoteMutation.isPending ||
              (title === noteData.title && content === noteData.content)
                ? "disabled"
                : ""
            }`}
            onClick={editNote}
            disabled={
              editNoteMutation.isPending ||
              (title === noteData.title && content === noteData.content)
            }
            type="submit"
          >
            {editNoteMutation.isPending ? <Spinner /> : "Edit Note"}
          </button>
        </form>
      </div>
      <div className="shade" />
    </>
  );
}
