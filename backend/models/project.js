const mongoose = require("mongoose")
const TaskSchema = require("./task.js")

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    deadline: {
        type: Date,
        required: true,
    },
    tasks: [{
        status: {
            type: String,
            required: true
        },
        tasks: {
            type: [TaskSchema]
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', ProjectSchema)
Project.syncIndexes()
module.exports = Project; 