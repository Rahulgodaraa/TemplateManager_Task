import Template from "../models/models.templateModel.js";


export const getTemplates = (req, res) => {
  console.log("Template Model:", Template);
  Template.find()
    .then((templates) => {
      return res.status(200).json({ success: true, message: templates }); // Add return to prevent further execution
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ success: false, message: "Error fetching templates" }); // Add return here as well
    });
};

export const createTemplates = async (req, res) => {
  try {
      const { name, content, type, textColor, backgroundColor, fontSize } = req.body;

      const newTemplate = await Template.create({
          name,
          content,
          type,
          createdAt: new Date().toISOString(),
          textColor,
          backgroundColor,
          fontSize,
      });

      return res.status(200).json({ success: true, message: newTemplate }); // Add return to prevent further execution

  } catch (error) {
      return res.status(500).json({ success: false, message: error.message }); // Add return here to avoid sending multiple responses
  }
};

// Update Template API
export const updateTemplates = async (req, res) => {
  const { templateId } = req.params;
  const updatedData = req.body;

  if (!templateId) {
      return res.status(400).json({ success: false, message: "Template ID is missing" });
  }

  try {
      const updatedTemplate = await Template.findByIdAndUpdate(templateId, updatedData, { new: true });
      if (!updatedTemplate) {
          return res.status(404).json({ success: false, message: "Template not found" });
      }
      return res.status(200).json({ success: true, message: updatedTemplate }); // Add return here
  } catch (error) {
      console.error("Error updating template:", error);
      return res.status(500).json({ success: false, message: "Server error" }); // Add return to avoid further response sending
  }
};

export const deleteTemplates = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedTemplate = await Template.findByIdAndDelete(id);

      if (!deletedTemplate) {
          return res.status(404).json({ success: false, message: "Template not found" });
      }

      return res.status(200).json({ success: true, message: "Template deleted successfully" }); // Add return to prevent multiple responses
  } catch (error) {
      console.error("Error deleting template:", error);
      return res.status(500).json({ success: false, message: "Server error" }); // Add return to avoid multiple responses
  }
};
