import React from "react";
import { Link } from "react-router-dom";

export default function ViewNote() {
  return (
    <>
      <div className="view-note-modal">
        <div className="title">Your Note Title</div>
        <div className="content">
          Meeting with Client: Discuss the project timeline, deliverables, and
          review feedback on the initial design. Confirm the budget adjustments
          and plan for the next sprint meeting on Thursday. Set up a follow-up
          meeting with the development team by next Tuesday. The client
          mentioned needing more frequent updates. The design feedback was
          mostly positive, but they want to explore a few more options for the
          homepage.
        </div>
        <div className="date">March 7, 2025</div>
        <Link to="/" className="close">
          Close
        </Link>
      </div>
      <div className="shade" />
    </>
  );
}
