const eventRouter = require("express").Router();
const eventController = require("../controller/event");
const checkToken = require("../helpers/middleware/checkToken");
const upload = require("../helpers/middleware/upload");

eventRouter.post("/", checkToken.login, upload, eventController.addEvent);
eventRouter.get("/", checkToken.login, eventController.getEvent);
eventRouter.get("/getAll", eventController.getAllEvent);
eventRouter.put("/:id", checkToken.login, upload, eventController.updateEvent);
eventRouter.delete("/:id", checkToken.login, eventController.deleteEvent);
eventRouter.get("/getEventByIdUser", checkToken.login, eventController.getEventByIdUser);
eventRouter.get("/getEventById/:id", eventController.getEventById);

module.exports = eventRouter;
