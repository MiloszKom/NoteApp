import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Note() {
  return (
    <Link to="/note/123" className="note">
      <h3 className="note-title no-wrap">Note Title</h3>
      <p className="note-content no-wrap">
        This is the content of the note. This is the content of the note.
      </p>
      <span className="note-date">March 7, 2025</span>
      <div className="note-actions">
        <div className="action">
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="action">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </Link>
  );
}
