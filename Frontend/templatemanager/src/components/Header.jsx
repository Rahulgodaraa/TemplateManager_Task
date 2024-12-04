import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/global.css"

const Header = () => {
  const navigate = useNavigate();

  const handleCreateTemplate = () => {
    navigate("/create-template");
  };

  return (
    <header className="header">
      <h1 
      onClick={() => {
        navigate('/')
      }}>Templates</h1>
      <button
        className="create-template-btn"
        onClick={handleCreateTemplate}
      >
        Create blank email
      </button>
    </header>
  );
};

export default Header;
