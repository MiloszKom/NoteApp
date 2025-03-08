import React from "react";

import { useNotesMutations } from "../hooks/useNotesMutations";
import Spinner from "./Spinner";

export default function ConfirmDelete({ noteId, setIsDeleting }) {
  const { deleteNoteMutation } = useNotesMutations();

  const deleteNote = () => {
    deleteNoteMutation.mutate(noteId, {
      onSuccess: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <>
      <div className="confirm-delete-modal">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="confirm-options">
          <button
            className="option"
            onClick={() => setIsDeleting(false)}
            disabled={deleteNoteMutation.isPending}
          >
            Cancel
          </button>
          <button
            className={`option delete ${
              deleteNoteMutation.isPending ? "disabled" : ""
            }`}
            onClick={deleteNote}
            disabled={deleteNoteMutation.isPending}
          >
            {deleteNoteMutation.isPending ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
      <div className="shade" />
    </>
  );
}
