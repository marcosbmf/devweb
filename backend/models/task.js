var mongoose = require("mongoose")

var TaskSchema = new mongoose.Schema({  
    name: {type: String, required: true},
    order: {type: Number, required: true},
    description: {type: String},
    deadline: {type: Date, required: true}
})

TaskSchema.pre('save', async function(next) {
    this.deadline = new Date(this.deadline).toISOString().slice(0, 10);
    next()
})

module.exports = TaskSchema