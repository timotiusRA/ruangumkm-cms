const userRouter = require("express").Router();
const userController = require("../controller/user");
const checkToken = require("../helpers/middleware/checkToken");

userRouter.post("/register", checkToken.isRegistered, userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/updateUser", checkToken.login, userController.updateUser);
module.exports = userRouter;
