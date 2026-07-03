import {BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
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

    </Routes>
    </BrowserRouter>
  );
}

export default App;