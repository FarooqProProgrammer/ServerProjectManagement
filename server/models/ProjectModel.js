import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true,
            minlength: [3, 'Project name must be at least 3 characters long']
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
            minlength: [10, 'Project description must be at least 10 characters long']
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
            validate: {
                validator: function (value) {
                    return value >= this.startDate; // endDate should not be before startDate
                },
                message: 'End date cannot be earlier than the start date.'
            }
        },
        status: {
            type: String,
            enum: ['not started', 'in progress', 'completed'],
            default: 'not started',
            required: [true, 'Project status is required']
        },
        budget: {
            type: Number,
            min: [0, 'Budget cannot be negative'],
            default: 0,
        },
        teamMembers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth', // Assuming there's a User model that this project relates to
            required: false // This is optional, so no need to enforce it strictly
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'auth', // Reference to the User model (creator of the project)
            required: true
        }
    },
    {
        timestamps: true // automatically adds createdAt and updatedAt fields
    }
);

// Create and export the model
const Project = mongoose.model('Project', projectSchema);

export default Project;
