import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "../api/noteApis";

import { formatDate } from "../utils/helperFunctions";
import Loader from "./Loader";

export default function ViewNote() {
  const params = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["spot", params.id],
    queryFn: () => getNote(params.id),
  });

  const note = data?.data;

  return (
    <>
      <div className="view-note-modal">
        {isLoading ? (
          <Loader modalLoader={true} />
        ) : isError ? (
          <div className="modal-error">
            {error.response.data.message}
            <Link to="/" className="home-button">
              Return Home
            </Link>
          </div>
        ) : (
          <>
            <div className="title">{note.title}</div>
            <div className="content">{note.content}</div>
            <div className="date">{formatDate(note.createdAt)}</div>
            <Link to="/" className="close">
              Close
            </Link>
          </>
        )}
      </div>
      <div className="shade" />
    </>
  );
}
