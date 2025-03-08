import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import { useAuthMutations } from "../hooks/useAuthMutations";

export default function Header({ searchValue, setSearchValue }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const { userData } = useContext(AuthContext);

  const { logoutMutation } = useAuthMutations();

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
        <div className="name-wrapper no-wrap">{userData?.username}</div>
        <div
          onClick={logoutMutation.mutate}
          className="logout-wrapper logout-text"
        >
          Log Out
        </div>
        {menuVisible && (
          <div className="mobile-menu">
            <div className="no-wrap">{userData.username}</div>
            <div onClick={logoutMutation.mutate} className="logout-text">
              Log Out
            </div>
          </div>
        )}
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {menuVisible && (
        <div className="shade mobile" onClick={() => setMenuVisible(false)} />
      )}
    </header>
  );
}
