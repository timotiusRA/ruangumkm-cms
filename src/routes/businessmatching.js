const businessmatchingRouter = require("express").Router();
const businessmatchingController = require("../controller/businessmatching");
const upload = require("../helpers/middleware/upload");
const checkToken = require("../helpers/middleware/checkToken");

businessmatchingRouter.post("/", checkToken.login, upload, businessmatchingController.postBusinessMatch);
businessmatchingRouter.get("/", businessmatchingController.getBusinessMatch);
businessmatchingRouter.put("/:id", checkToken.login, upload, businessmatchingController.updateBusinessMatch);
businessmatchingRouter.delete("/:id", checkToken.login, businessmatchingController.deleteBusinessMatch);
businessmatchingRouter.get("/join", checkToken.login, businessmatchingController.getBusinessMatchJoin);

module.exports = businessmatchingRouter;
