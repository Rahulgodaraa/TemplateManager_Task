import express from "express";
import { Router } from "express";
import { createTemplates, deleteTemplates, getTemplates, updateTemplates } from "../controller/template.controller.js";

const templateRoutes = Router();

templateRoutes.get('/gettemplate' , getTemplates)
templateRoutes.post('/createTemplates' , createTemplates)
templateRoutes.put('/editTemplate/:templateId', updateTemplates);
templateRoutes.delete('/deleteTemplate/:id' , deleteTemplates)



export default templateRoutes;