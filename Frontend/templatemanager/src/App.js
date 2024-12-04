import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import TemplateCard from "./components/TemplateCard";
import TemplateForm from "./components/TemplateForm"; 
import { fetchTemplates } from "./services/api";
import "./style/global.css";
import TemplateEditor from "./pages/TemplateEditor";

const App = () => {
  const [templates, setTemplates] = useState([]);  
  const [filteredTemplates, setFilteredTemplates] = useState([]);  
  const [activeTab, setActiveTab] = useState("library");  
  const [needsRefresh, setNeedsRefresh] = useState(false);  
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState("recent");  
  const location = useLocation(); 
  const navigate = useNavigate();

  // Function to fetch all templates
  const loadTemplates = async () => {
    try {
      const data = await fetchTemplates(); 
      if (data.success && Array.isArray(data.message)) {
        setTemplates(data.message);
        filterTemplates(data.message, activeTab); // Filter templates based on active tab
      } else {
        setTemplates([]);
        setFilteredTemplates([]);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
      setFilteredTemplates([]);
    }
  };

  // Filter templates based on activeTab
  const filterTemplates = (allTemplates, tab) => {
    let filtered = [];
    if (tab === "library") {
      filtered = allTemplates.filter(template => template.type === "library");
    } else if (tab === "saved") {
      filtered = allTemplates.filter(template => template.type === "user-created");
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort templates by creation date (recent or old)
    if (sortOrder === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === "old") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredTemplates(filtered);
  };

  // Load templates whenever the activeTab, searchQuery, or sortOrder changes
  useEffect(() => {
    loadTemplates();
  }, [activeTab, searchQuery, sortOrder]);

  // Trigger refresh if needsRefresh is true and location changes to home
  useEffect(() => {
    if (needsRefresh && location.pathname === "/") {
      loadTemplates();
      setNeedsRefresh(false); // Reset the refresh state
    }
  }, [location, needsRefresh]);

  return (
    <div className="app">
      <Header />

      {/* Conditionally render tab buttons based on route */}
      {location.pathname !== "/create-template" && (
        <div className="tab-buttons">
          <button
            className={activeTab === "library" ? "active" : ""}
            onClick={() => setActiveTab("library")}
          >
            Template Library
          </button>
          <button
            className={activeTab === "saved" ? "active" : ""}
            onClick={() => setActiveTab("saved")}
          >
            Saved Templates
          </button>
        </div>
      )}

      {/* Search bar and filter */}
      <div className="filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="sort-buttons">
          <button 
            onClick={() => setSortOrder("recent")} 
            className={sortOrder === "recent" ? "active" : ""}
          >
            Recent
          </button>
          <button 
            onClick={() => setSortOrder("old")} 
            className={sortOrder === "old" ? "active" : ""}
          >
            Oldest
          </button>
        </div>
      </div>

      <main className="main-content">
        <Routes>
          {/* Define Routes here */}
          <Route path="/" element={
            <div className="templates-container">
              {filteredTemplates.length > 0 ? (
                <div className="grid-container">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template._id} template={template} refreshTemplates={loadTemplates} />
                  ))}
                </div>
              ) : (
                <p>No templates available.</p>
              )}
            </div>
          } />
          <Route path="/create-template" element={<TemplateForm setNeedsRefresh={setNeedsRefresh} navigate={navigate} />} />
          <Route path="/edit-template/:templateId" element={<TemplateEditor setNeedsRefresh={setNeedsRefresh} navigate={navigate} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
