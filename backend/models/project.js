var db = require("mongoose")
var Task = require("./task.js")

var ProjectSchema = new db.Schema({  
    name: {type: String, required: true},
    description: {type: String},
    deadline: {type: Date},
    Tasks: [Task.TaskSchema],
    user: {type: db.Schema.Types.ObjectId, ref: 'User'}
   }, {collection: 'Projects'})

var Project = db.model(name='Project', Schema=ProjectSchema, skipInit=true);

module.exports = {Project, ProjectSchema}