import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotesPage from "./components/pages/NotesPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

import AddNote from "./components/common/AddNote";
import ViewNote from "./components/common/ViewNote";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotesPage />}>
          <Route path="create-note" element={<AddNote />} />
          <Route path="note/:id" element={<ViewNote />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
