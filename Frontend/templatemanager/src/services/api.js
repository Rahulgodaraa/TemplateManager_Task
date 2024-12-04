import axios from "axios";

// create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://localhost:8000/api/templates",
});

// fe/tch all templates (with type filtering if needed in the future)
export const fetchTemplates = async () => {
  try {
    const response = await api.get("/gettemplate");
    if (response.data.success && Array.isArray(response.data.message)) {
      return response.data;   
    } else {
      return { success: false, message: [] };   
    }
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

// create a new template
export const createTemplate = async (templateData) => {
  try {
    const response = await api.post("/createTemplates", templateData);
    return response.data;  
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};

// update an existing template
export const updateTemplate = async (templateId, updatedTemplateData) => {
  try {
    const response = await api.put(`/editTemplate/${templateId}`, updatedTemplateData);
    return response.data;
  } catch (error) {
    console.error("Error updating template:", error);
    throw error;
  }
};

// Uelete an selected template
 

export const deleteTemplate = async (id) => {
  try {
    const response = await api.delete(`/deleteTemplate/${id}`);
    if (response.data.success) {
      return response.data.message;  // Return success message
    } else {
      throw new Error("Failed to delete template.");
    }
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
};

export default api;
