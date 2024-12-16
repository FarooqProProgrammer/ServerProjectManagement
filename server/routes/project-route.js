import express from 'express';
import ProjectController from "../controller/project-controller.js"

const ProjectRouter = express.Router();

// Route for creating a project
ProjectRouter.post('/projects', ProjectController.createProject);

// Route for fetching all projects
ProjectRouter.get('/projects', ProjectController.getAllProjects);

// Route for fetching a single project by ID
ProjectRouter.get('/projects/:id', ProjectController.getProjectById);

// Route for updating a project by ID
ProjectRouter.put('/projects/:id', ProjectController.updateProject);

// Route for deleting a project by ID
ProjectRouter.delete('/projects/:id', ProjectController.deleteProject);

export default ProjectRouter;
