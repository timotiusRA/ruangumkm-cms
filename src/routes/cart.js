const cartRouter = require("express").Router();
const cartController = require("../controller/cart");
const checkToken = require("../helpers/middleware/checkToken");

cartRouter.post("/", checkToken.login, cartController.addCart);
cartRouter.get("/", checkToken.login, cartController.getCart);
cartRouter.delete("/:id", checkToken.login, cartController.deleteCart);
cartRouter.get("/getCartByid", checkToken.login, cartController.getCartById);

module.exports = cartRouter;
