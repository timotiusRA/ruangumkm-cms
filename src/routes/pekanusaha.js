const pekanusahaRouter = require("express").Router();
const pekanusahaController = require("../controller/pekanusaha");
const checkToken = require("../helpers/middleware/checkToken");
const upload = require("../helpers/middleware/upload");

pekanusahaRouter.post("/", checkToken.login, upload, pekanusahaController.postPekanusaha);
pekanusahaRouter.get("/", checkToken.login, pekanusahaController.getPekanusaha);
pekanusahaRouter.put("/:id", checkToken.login, upload, pekanusahaController.updatePekanusaha);
pekanusahaRouter.delete("/:id", checkToken.login, pekanusahaController.deletePekanusaha);
pekanusahaRouter.get("/:id", checkToken.login, pekanusahaController.getByIdPekanusaha);

module.exports = pekanusahaRouter;
