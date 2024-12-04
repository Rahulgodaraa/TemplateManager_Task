import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { deleteTemplate } from "../services/api";  
import "../style/global.css";

const TemplateCard = ({ template, refreshTemplates }) => {
  const { _id, name, content, textColor, backgroundColor, fontSize } = template;
  const [isDeleting, setIsDeleting] = useState(false); 
  const navigate = useNavigate();  

  const handleDelete = async () => {
    setIsDeleting(true);  
    try {
      const message = await deleteTemplate(_id); 
      alert(message);  
      refreshTemplates();  
    } catch (error) {
      console.error("Error deleting template:", error);
      alert("Failed to delete the template.");
    } finally {
      setIsDeleting(false); 
    }
  };

   
  const handleEdit = () => {
    navigate(`/edit-template/${_id}`);  
  };

  
  
  return (
    <div
  className="template-card"
  style={{
    color: textColor,
    backgroundColor: backgroundColor,
    fontSize: `${fontSize}px`,
  }}
>
  <div className="template-card-content">
    <div className="template-left">
      <h3>{name}</h3>
      <p>{content}</p>
    </div>
  </div>
  <div className="template-actions template-right">
    <span className="template-date">{template.createdAt?.split("T")[0] || "N/A"}</span>
    <button
      onClick={handleEdit}
      className="template-button"
    >
      Edit
    </button>
    <button
      onClick={handleDelete}
      className="template-button"
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  </div>
</div>
  );
};

export default TemplateCard;
