import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppHome from "./pages/AppHome";
import AppDashboard from "./pages/AppDashboard";
import "./App.css";
import AppSigninForm from "./pages/AppSigninForm";
import AppSignUpForm from "./pages/AppSignUpForm";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Ticket_Management_System_React" element={<AppHome />} />
        <Route
          path="/Ticket_Management_System_React/dashboard"
          element={
            <ProtectedRoute>
              <AppDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Ticket_Management_System_React/signin"
          element={<AppSigninForm />}
        />
        <Route
          path="/Ticket_Management_System_React/signup"
          element={<AppSignUpForm />}
        />
      </Routes>
    </Router>
  );
}

export default App;
