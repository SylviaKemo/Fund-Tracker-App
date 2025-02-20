import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import React from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <Nav className="justify-content-center" activeKey="/dashboard">
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/campaign-form">
          Create Campaign
        </Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
      <Nav.Item>
        <button onClick={handleLogout} style={{ backgroundColor: "#456" }}>
          Logout
        </button>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
