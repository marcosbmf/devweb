var db = require("mongoose")
var proj = require("./project")

var UserSchema = new db.Schema({  
    name: {type: String, required: true},
    projects: [proj.ProjectSchema]
   }, {collection: 'users'});  
   
var User = db.model('User', UserSchema);

module.exports = User