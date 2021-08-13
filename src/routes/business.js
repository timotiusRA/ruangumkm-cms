const businessRouter = require("express").Router();
const businessController = require("../controller/business");
const checkToken = require("../helpers/middleware/checkToken");
const upload = require("../helpers/middleware/upload");

businessRouter.post("/", checkToken.login, upload, businessController.postBusiness);
businessRouter.get("/", checkToken.login, businessController.getAllBusiness);
businessRouter.get("/:id", checkToken.login, businessController.getBusinessById);
businessRouter.delete("/:id", checkToken.login, businessController.deleteBusiness);
businessRouter.put("/:id", checkToken.login, upload, businessController.updateBusiness);

module.exports = businessRouter;
