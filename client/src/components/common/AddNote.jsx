import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function AddNote() {
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
          <input type="text" className="modal-title" placeholder="Note title" />
          <label className="modal-label">CONTENT</label>
          <textarea
            className="modal-content"
            placeholder="Write your note here..."
          />
          <button className="add-note-btn">Add New Note</button>
        </form>
      </div>
      <div className="shade" />
    </>
  );
}
