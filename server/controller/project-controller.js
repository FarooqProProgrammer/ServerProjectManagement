import Project from "../models/ProjectModel.js"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

class ProjectController {
    // Create a new project
    static async createProject(req, res) {
        try {
            const { name, description, startDate, endDate, status, budget, teamMembers, createdBy } = req.body;

            // Validate required fields
            if (!name || !description || !startDate || !endDate || !status || !createdBy) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: ReasonPhrases.BAD_REQUEST,
                    error: 'All fields (name, description, startDate, endDate, status, and createdBy) are required.'
                });
            }

            // Create a new project instance
            const newProject = new Project({
                name,
                description,
                startDate,
                endDate,
                status,
                budget,
                teamMembers,
                createdBy
            });

            // Save the project to the database
            const savedProject = await newProject.save();

            // Send a success response
            return res.status(StatusCodes.CREATED).json({
                message: ReasonPhrases.CREATED,
                project: savedProject
            });

        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while creating the project.'
            });
        }
    }

    // Get all projects
    static async getAllProjects(req, res) {
        try {
            const projects = await Project.find().populate("teamMembers");
            return res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                projects
            });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while fetching projects.'
            });
        }
    }

    // Get a specific project by ID
    static async getProjectById(req, res) {
        try {
            const projectId = req.params.id;
            const project = await Project.findById(projectId);
            if (!project) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                    error: 'Project not found.'
                });
            }
            return res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                project
            });
        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while fetching the project.'
            });
        }
    }

    // Update a project
    static async updateProject(req, res) {
        try {
            const projectId = req.params.id;
            const { name, description, startDate, endDate, status, budget, teamMembers } = req.body;

            const updatedProject = await Project.findByIdAndUpdate(
                projectId,
                { name, description, startDate, endDate, status, budget, teamMembers },
                { new: true }
            );

            if (!updatedProject) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                    error: 'Project not found.'
                });
            }

            return res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                project: updatedProject
            });

        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while updating the project.'
            });
        }
    }

    // Delete a project
    static async deleteProject(req, res) {
        try {
            const projectId = req.params.id;
            const deletedProject = await Project.findByIdAndDelete(projectId);

            if (!deletedProject) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: ReasonPhrases.NOT_FOUND,
                    error: 'Project not found.'
                });
            }

            return res.status(StatusCodes.NO_CONTENT).json({
                message: ReasonPhrases.NO_CONTENT,
                success: 'Project deleted successfully.'
            });

        } catch (error) {
            console.error(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while deleting the project.'
            });
        }
    }
}

export default ProjectController;
