const pekanrayaRouter = require("express").Router();
const pekanrayaController = require("../controller/pekanraya");
const checkToken = require("../helpers/middleware/checkToken");
const upload = require("../helpers/middleware/upload");

pekanrayaRouter.post("/", checkToken.login, upload, pekanrayaController.postPekanraya);
pekanrayaRouter.get("/", checkToken.login, pekanrayaController.getPekanraya);
pekanrayaRouter.put("/", checkToken.login, upload, pekanrayaController.updatePekanraya);
pekanrayaRouter.delete("/", checkToken.login, pekanrayaController.deletePekanraya);
pekanrayaRouter.get("/getByReg", checkToken.login, pekanrayaController.getByIdRegPekanraya);

module.exports = pekanrayaRouter;
