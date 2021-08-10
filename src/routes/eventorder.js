const eventorderRouter = require("express").Router();
const eventorderController = require("../controller/eventorder");
const checkToken = require("../helpers/middleware/checkToken");

eventorderRouter.post("/", checkToken.login, eventorderController.addeventorder);
eventorderRouter.delete("/", checkToken.login, eventorderController.deleteeventorder);
eventorderRouter.get("/", checkToken.login, eventorderController.geteventorder);

module.exports = eventorderRouter;
