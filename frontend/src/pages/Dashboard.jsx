import React, { useState, useEffect } from "react";

import CampaignDetails from "../dashboardSections/CampaignDetails";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/dashboard/userdashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        setError("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <Navbar />

      <div>
        <CampaignDetails />
      </div>
    </div>
  );
};

export default Dashboard;
