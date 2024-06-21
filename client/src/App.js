import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Main from "./pages/main.jsx";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to ="/main" /> :<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/main" /> : <Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/main" element={isAuthenticated ? <Main/> : <Navigate to="/login" />} >
            <Route path="/task" element={<Task />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
