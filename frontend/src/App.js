import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import CampaignForm from "./forms/CampaignForm";
import DonationForm from "./forms/DonationForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign-form" element={<CampaignForm />} />
          <Route path="/donation-form" element={<DonationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
