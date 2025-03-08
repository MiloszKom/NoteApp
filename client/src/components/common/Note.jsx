import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import ConfirmDelete from "./ConfirmDelete";
import { formatDate, highlightText } from "../utils/helperFunctions";

export default function Note({
  id,
  title,
  content,
  createdAt,
  setIsEditing,
  searchValue,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <Link to={`/note/${id}`} className="note">
        <h3 className="note-title no-wrap">
          {highlightText(title, searchValue)}
        </h3>
        <p className="note-content no-wrap">
          {highlightText(content, searchValue)}
        </p>
        <span className="note-date">{formatDate(createdAt)}</span>
        <div className="note-actions">
          <div
            className="action"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing({
                id,
                title,
                content,
              });
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </div>
          <div
            className="action"
            onClick={(e) => {
              e.preventDefault();
              setIsDeleting(id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </Link>
      {isDeleting && (
        <ConfirmDelete noteId={isDeleting} setIsDeleting={setIsDeleting} />
      )}
    </>
  );
}
