import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Emergency from "./Emergency";
import BloodDonationPage from "./flow";
import Footer from "./footer";
import Emergencyheading from "./head";
import Home1 from "./Home";
import BloodTypeCompatibilityPage from "./Type";
import { HeroVideoDialogDemoTopInBottomOut } from "./video";
import Donate from "./Donate";
import Request from "./Request";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Home1 />
            <HeroVideoDialogDemoTopInBottomOut />
            <Emergencyheading />
            <Emergency
              title="TNTJ- Kumari Blood Wing"
              desc="TNTJ - Kumari Blood Donors is a part of their Non- profit organization. they conduct Blood donation Camps all over Tamilmadu and they are active all days 24/7"
              src="img/tntj.jpeg"
              ph="8110819811"
            />
            <Emergency
              title="Kumari Blood Donors - Kanniyakmari"
              desc="Non- Profit Organization Active on all providing Blood Donation services to thw whole kanyakumari"
              src="img/kkblood.jpeg"
              ph="9488050751"
            />
            <BloodTypeCompatibilityPage />
            <BloodDonationPage />
            <Footer />
          </>
        } />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;