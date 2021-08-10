const eventtagRouter = require("express").Router();
const eventtagController = require("../controller/eventtag");

eventtagRouter.post("/", eventtagController.addEventtag);
eventtagRouter.get("/", eventtagController.getEventtag);
eventtagRouter.put("/", eventtagController.updateEventtag);
eventtagRouter.delete("/", eventtagController.deleteEventtag);
eventtagRouter.get("/getByEventId/:id", eventtagController.getEventTagById);

module.exports = eventtagRouter;
