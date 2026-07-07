import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>

    {/* All routes */}

    <Routes>
      <Route
        path = "/register"
        element = {<RegisterPage/>}
      />

      <Route
        path = "/login"
        element = {<LoginPage/>}
      />

      <Route
        path = "/dashboard"
        element = {
          <ProtectedRoute>
              <DashboardPage/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
              <ProfilePage  />
          </ProtectedRoute>
        } 
      />

      {/* Default route */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Other routes go to login by default */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
    </BrowserRouter>
  );
}

export default App;