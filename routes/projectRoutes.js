const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectsController.js');
console.log("controller exports:", controller);
const auth = require('../middleware/authmiddleware.js');
console.log("auth is:", auth);

// public routes
router.get("/", controller.getAllProjects);
router.get("/id/:id", controller.getProjectById);
router.get("/slug/:slug", controller.getProjectBySlug);

// protected (admin)
router.post("/", auth, controller.createProject);
// use custom id in the route param to match controller's findOne* usage
router.put("/:id", auth, controller.updateProject);
router.delete("/:id", auth, controller.deleteProject);

module.exports = router;