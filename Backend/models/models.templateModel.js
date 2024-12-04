import mongoose from "mongoose";

 const templateSchema = mongoose.Schema({
    name : {type : String , required: true},
    content : {type : String , required: true},
    type : {type: String, 
        enum: ['library', 'user-created'],        
        required: true},
    createdAt : {type : Date , default: Date.now},
    type: { type: String, required: true },
    textColor: { type: String, default: "#000000" }, // Default text color
    backgroundColor: { type: String, default: "#ffffff" }, // Default background color
    fontSize: { type: Number, default: 16 },
 },
  {timestamps : true}
);

 const Template = mongoose.model("Template" , templateSchema);

 export default Template;