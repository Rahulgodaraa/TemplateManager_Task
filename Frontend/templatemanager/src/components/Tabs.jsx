import React, { useEffect } from "react";
import { fetchTemplates } from "../services/api";
 
import "../style/global.css"


const Tabs = ({ activeTab, setActiveTab }) => {
 
  console.log("Props received in Tabs component:", { activeTab, setActiveTab });

 

  return (
    <div className="tabs">
      <div
        className={`tab-item ${activeTab === "templateLibrary" ? "active" : ""}`}
        onClick={() => setActiveTab("templateLibrary")}  
      >
        Template Library
      </div>
      <div
        className={`tab-item ${activeTab === "savedTemplates" ? "active" : ""}`}
        onClick={() => setActiveTab("savedTemplates")}   
      >
        Saved Templates
      </div>
    </div>
  );
};

export default Tabs;
