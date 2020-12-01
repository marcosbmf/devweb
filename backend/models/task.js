var mongoose = require("mongoose")

var TaskSchema = new mongoose.Schema({  
    name: {type: String, required: true},
    order: {type: Number, required: true, unique: true},
    description: {type: String},
    deadline: {type: Date, required: true}
})

module.exports = TaskSchema