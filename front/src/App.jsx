import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ToDo from "./pages/ToDo";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<ToDo />} />
      </Routes>
    </Router>
  );
}

export default App;
