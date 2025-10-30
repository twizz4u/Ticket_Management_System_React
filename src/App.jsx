import { HashRouter, Routes, Route } from "react-router-dom";
import AppHome from "./pages/AppHome";
import AppDashboard from "./pages/AppDashboard";
import "./App.css";
import AppSigninForm from "./pages/AppSigninForm";
import AppSignUpForm from "./pages/AppSignUpForm";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<AppSigninForm />} />
        <Route path="/signup" element={<AppSignUpForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
