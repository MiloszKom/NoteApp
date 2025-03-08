import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotesPage from "./components/pages/NotesPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

import AddNote from "./components/common/AddNote";
import ViewNote from "./components/common/ViewNote";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<PrivateRoute message="Log in to access your notes." />}
        >
          <Route path="/" element={<NotesPage />}>
            <Route path="create-note" element={<AddNote />} />
            <Route path="note/:id" element={<ViewNote />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
