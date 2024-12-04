import React, { useState, useEffect } from "react";
import TemplateCard from "../components/TemplateCard";
import TemplateForm from "../components/TemplateForm";
import { fetchTemplates } from "../services/api";

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  const refreshTemplates = async () => {
    try {
      const response = await fetchTemplates();
      console.log("Fetched templates response:", response); // Log response data
      if (response.success) {
        setTemplates(response.message);
      } else {
        console.error("Error fetching templates:", response);
        alert("Failed to fetch templates.");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      alert("Error fetching templates.");
    }
  };

  useEffect(() => {
    refreshTemplates();
  }, []);

  return (
    <div className="main-content">
      <TemplateForm refreshTemplates={refreshTemplates} />
      <div className="templates-container">
      {templates.map((template) => (
        <TemplateCard key={template._id} template={template} refreshTemplates={refreshTemplates} />
      ))}
      </div>
    </div>
  );
};

export default TemplateList;
