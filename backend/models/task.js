var db = require("mongoose")

var TaskSchema = new db.Schema({  
    name: {type: String, required: true},
    description: {type: String},
    deadline: {type: Date},
    user: {type: String, required: true},
    finished: {type: Boolean, default: false}
   }, {collection: 'tasks'})

var Task = db.model(name='Task', Schema=TaskSchema, skipInit=true);

module.exports = {Task, TaskSchema}