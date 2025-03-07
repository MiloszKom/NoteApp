import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header>
      <h1>My Notes</h1>
      <div className="user">
        <div className="icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="name-wrapper no-wrap">Milosz</div>
        <Link to="/login" className="logout-wrapper logout-text">
          Log Out
        </Link>
        {menuVisible && (
          <div className="mobile-menu">
            <div className="no-wrap">Milosz</div>
            <div className="logout-text">Log Out</div>
          </div>
        )}
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search notes..." />
      </div>
      {menuVisible && (
        <div className="shade mobile" onClick={() => setMenuVisible(false)} />
      )}
    </header>
  );
}
