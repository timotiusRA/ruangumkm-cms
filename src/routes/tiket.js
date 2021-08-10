const tiketRouter = require("express").Router();
const tiketController = require("../controller/tiket");

tiketRouter.post("/", tiketController.addTiket);
tiketRouter.get("/", tiketController.getTiket);
tiketRouter.put("/:id", tiketController.updateTiket);
tiketRouter.delete("/:id", tiketController.deleteTiket);

module.exports = tiketRouter;
