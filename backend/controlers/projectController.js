const Project = require('../models/project');

const create = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    const project = new Project(body)
    project.tasks = ['TODO', 'DOING', 'DONE'].map(s => ({status: s}))

    if (!project) {
        return res.status(400).json({ success: false, error: err })
    }

    project
        .save()
        .then((doc) => {
            return res.status(201).json({
                success: true,
                id: project._id,
                message: 'Project created!',
                value: doc
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Project not created!',
            })
        })
}

const update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Project.findOne({ _id: req.params.projectId }, (err, project) => {
        if (err || !project) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }
        project.name = body.name
        project.description = body.description
        project.deadline = body.deadline
        project.tasks = body.tasks
        project
            .save()
            .then((doc) => {
                return res.status(200).json({
                    success: true,
                    id: project._id,
                    message: 'Project updated!',
                    value: doc
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Project not updated!',
                })
            })
    })
}

const list  = async (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    await Project.find()
        .sort([[sortBy, order]])
        .exec((err, projects) => {
            if (err) {
                return res.status(400).json({
                    error: "Projects not found"
                });
            }
            res.json(projects);
        });
};

const getById = async (req, res) => {
    await Project.findOne({ _id: req.params.projectId }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}

const _delete = async (req, res) => {
    await Project.findOneAndDelete({ _id: req.params.projectId }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }

        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}


module.exports = {create, _delete, update, getById, list }