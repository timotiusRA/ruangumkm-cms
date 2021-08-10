const tagRouter = require("express").Router();
const tagController = require("../controller/tag");

tagRouter.post("/", tagController.addTag);
tagRouter.get("/", tagController.getAllTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.delete("/:id", tagController.deletetag);

module.exports = tagRouter;
