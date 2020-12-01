const express = require("express");
const router = express.Router();

const {
    create,
    getById,
    _delete,
    update,
    list,
} = require('../controlers/projectController');

router.get("/", list);
router.post("/", create);
router.get("/:projectId", getById);
router.delete("/:projectId", _delete);
router.put("/:projectId", update);

module.exports = router;