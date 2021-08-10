const pekanusahaRouter = require("express").Router();
const pekanusahaController = require("../controller/pekanusaha");
const checkToken = require("../helpers/middleware/checkToken");

pekanusahaRouter.post("/", checkToken.login, pekanusahaController.postPekanusaha);
pekanusahaRouter.get("/", checkToken.login, pekanusahaController.getPekanusaha);
pekanusahaRouter.put("/:id", checkToken.login, pekanusahaController.updatePekanusaha);
pekanusahaRouter.delete("/:id", checkToken.login, pekanusahaController.deletePekanusaha);
pekanusahaRouter.get("/:id", checkToken.login, pekanusahaController.getByIdPekanusaha);

module.exports = pekanusahaRouter;
