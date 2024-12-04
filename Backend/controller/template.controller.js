import Template from "../models/models.templateModel.js";

export const getTemplates = (req, res) => {
    Template.find()
      .then((templates) => {
        res.status(200).json({ success: true, message: templates });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, message: "Error fetching templates" });
      });
  };
  

export const createTemplates = async (req , res) => {
    try {
        const { name , content , type , textColor,
            backgroundColor,
            fontSize,} = req.body

        const newTemplate = await Template.create({
            name ,
            content ,
            type ,
            createdAt :  new Date().toISOString(),
            textColor,
            backgroundColor,
            fontSize,
        });

        res.status(200).json({success : true , message : newTemplate})

    } catch (error) {
        res.status(500).json({success : false , message : error.message})
    }
}

// Backend: Update Template API
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
    res.status(200).json({ success: true, message: updatedTemplate });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
  };
  
  export const deleteTemplates = async (req , res ) => {
    try {
      const { id } = req.params;
      const deletedTemplate = await Template.findByIdAndDelete(id);
  
      if (!deletedTemplate) {
        return res.status(404).json({ success: false, message: "Template not found" });
      }
  
      res.status(200).json({ success: true, message: "Template deleted successfully" });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }