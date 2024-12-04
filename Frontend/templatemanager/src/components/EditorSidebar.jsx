import React from "react";

const EditorSidebar = ({ template, setTemplate }) => {
  const handleStyleChange = (field, value) => {
    setTemplate({ ...template, [field]: value });
  };

  return (
    <div className="editor-sidebar">
      <h3>Text Block</h3>
      <label>
        Text color:
        <input
          type="color"
          value={template.textColor || "#000000"}
          onChange={(e) => handleStyleChange("textColor", e.target.value)}
        />
      </label>
      <label>
        Background color:
        <input
          type="color"
          value={template.backgroundColor || "#ffffff"}
          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
        />
      </label>
      <label>
        Font size:
        <input
          type="number"
          value={template.fontSize || 16}
          onChange={(e) => handleStyleChange("fontSize", e.target.value)}
        />
      </label>
    </div>
  );
};

export default EditorSidebar;
