const userRouter = require("express").Router();
const userController = require("../controller/user");
const checkToken = require("../helpers/middleware/checkToken");

userRouter.post("/register", checkToken.isRegistered, userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/updateUser", checkToken.login, userController.updateUser);
userRouter.get("/activation/:UserEmail", userController.activationUser);
userRouter.put("/resetpassword", userController.resetPassword);
userRouter.post("/sendlinkresetpassword", userController.linkResetPassword);
userRouter.get("/getUserById", checkToken.login, userController.getUserById);

module.exports = userRouter;
