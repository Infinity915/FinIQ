import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Importing Auth Context
import "./Home.css";
import logo from "../assets/finq-logo.png"; // Import your logo image

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the user's details from the Auth context
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown toggle

  const handleLogout = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile"); // Replace with the correct profile route
  };

  // Helper to get the correct image URL
  const getImageUrl = (pfp) => {
    if (!pfp) return "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    if (pfp.startsWith("http")) return pfp;
    return `http://localhost:2100${pfp}`;
  };

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-left">
          <img
            src={logo}
            alt="FinIQ Logo"
            className="navbar-logo"
            style={{
              height: "40px",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          <span
            style={{
              verticalAlign: "middle",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            FinIQ
          </span>
        </div>
        <nav className="navbar-center"></nav>
        <div
          className="navbar-right profile-dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
        >
          <img
            src={getImageUrl(user?.pfp)}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-name">{user?.name || "Profile"} ▾</div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleProfile}>Profile</button>
              <button onClick={handleLogout}>Sign out</button>
            </div>
          )}
        </div>
      </header>
      {/* HERO SECTION */}
      <main className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            FinIQ
            <br /> Master Your Money, One Lesson at a Time
          </h1>
          <br />
          <br />
          <h2 className="hero-subheading">
            Interactive, beginner-friendly modules to build real-world financial
            skills
          </h2>
          <br />
          <br />
          <p>
            FinIQ is your personal guide to understanding money, markets, and
            investing. Whether you're a student, a young professional, or just
            getting started with personal finance — our visual-rich lessons,
            short videos, and hands-on quizzes make learning simple, practical,
            and engaging.
            <br />
            <br />
            No ads, Just free, high-quality financial education for everyone.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/modules")}
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          &copy; 2025 FinIQ. All rights reserved. | Contributors:
          <a
            href="https://github.com/soham-06"
            target="_blank"
            rel="noopener noreferrer"
          >
            soham-06(Soham)
          </a>
          ,
          <a
            href="https://github.com/Infinity915"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinity915(Taksh)
          </a>
          ,
          <a
            href="https://github.com/Deepak-Sharma-2006"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deepak-Sharma-2006(Deepak)
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;