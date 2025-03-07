import React from "react";

export default function ConfirmDelete() {
  return (
    <>
      <div className="confirm-delete-modal">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="confirm-options">
          <button className="option">Cancel</button>
          <button className="option delete">Delete</button>
        </div>
      </div>
      <div className="shade" />
    </>
  );
}
