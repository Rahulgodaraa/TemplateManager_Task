import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTemplates, updateTemplate } from "../services/api";
import EditorSidebar from "../components/EditorSidebar";
import "../style/global.css";

const TemplateEditor = ({ setNeedsRefresh, navigate }) => {
   
  const { templateId } = useParams();
  const [template, setTemplate] = useState({
    name: "",
    content: "",
    type: "user-created",
    textColor: "#000000",
    backgroundColor: "#ffffff",
    fontSize: 16,
  });

  useEffect(() => {
    const getTemplate = async () => {
      try {
        const response = await fetchTemplates();
        if (response.success) {
          const fetchedTemplate = response.message.find(
            (temp) => temp._id === templateId
          );
          if (fetchedTemplate) {
            setTemplate(fetchedTemplate);
          }  
        } else {
          alert("Failed to fetch templates.");
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        alert("Error fetching templates.");
      }
    };

    getTemplate();
  }, [templateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTemplate = await updateTemplate(templateId, template);
      alert("Template updated successfully!");
      setNeedsRefresh(true);
      navigate("/"); 
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Error updating template.");
    }
  };

  return (
    <div className="template-form">
      <div className="form-container">
        <div className="form-content">
          <h2>Edit Template</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Template Name:</label>
              <input
                type="text"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                value={template.content}
                onChange={(e) => setTemplate({ ...template, content: e.target.value })}
                required
              />
            </div>
            <button type="submit">Update Template</button>
          </form>
        </div>
        <div className="sidebar">
          <EditorSidebar template={template} setTemplate={setTemplate} />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
