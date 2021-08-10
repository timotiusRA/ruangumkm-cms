const organizerRouter = require("express").Router();
const organizerController = require("../controller/organizer");
const upload = require("../helpers/middleware/upload");

organizerRouter.post("/", upload, organizerController.createOrganizer);
organizerRouter.get("/", organizerController.getOrganizer);
organizerRouter.put("/:id", upload, organizerController.updateOrganizer);
organizerRouter.delete("/:id", organizerController.deleteOrganizer);

module.exports = organizerRouter;
