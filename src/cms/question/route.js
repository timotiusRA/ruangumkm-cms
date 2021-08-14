const express = require("express");
const Route = express.Router();
const controller = require("./controller");
const checkToken = require("../../helpers/middleware/checkToken");

Route.put("/update/:id", checkToken.login, controller.updateQuestion);
Route.get("/view", checkToken.login, controller.getQuestion);
Route.post("/add", checkToken.login, controller.addQuestion);

module.exports = Route;
