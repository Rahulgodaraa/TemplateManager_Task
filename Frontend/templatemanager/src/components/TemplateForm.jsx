import React, { useState } from "react";
import EditorSidebar from "./EditorSidebar";
import { createTemplate } from "../services/api";
import "../style/global.css";

const TemplateForm = ({ setNeedsRefresh, navigate }) => {
  const [template, setTemplate] = useState({
    name: "",
    content: "",
    type: "user-created",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    fontSize: 16,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating template with data:", template);
      const response = await createTemplate(template);
      console.log("Template creation response:", response);

      if (response.success) {
        alert("Template created successfully!");
        setNeedsRefresh(true);  
        navigate("/"); 
      } else {
        console.error("Error response:", response);
        alert(response.message || "Failed to create template.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("Error creating template.");
    }
  };

  return (
    <div className="template-form">
      <div className="form-container">
        <div className="form-content">
          <h2>Create Template</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Template Name:</label>
              <input
                type="text"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                value={template.content}
                onChange={(e) => setTemplate({ ...template, content: e.target.value })}
              />
            </div>
            <button type="submit">Save Template</button>
          </form>
        </div>

        <div className="sidebar">
          <EditorSidebar template={template} setTemplate={setTemplate} />
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;
