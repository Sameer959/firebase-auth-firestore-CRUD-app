import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Login from '../Login';
import Dashboard from '../Dashboard';
import Logout from '../Logout';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirebaseImageUpload from '../../config/FirebaseImageUpload';
import PrivateRoute from '../../PrivateRoute';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Ensure redirection to the homepage
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = 'http://localhost:3000/';
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <FirebaseImageUpload />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;