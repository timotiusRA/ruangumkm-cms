const express = require("express");
const Route = express.Router();
const controller = require("./controller");
const checkToken = require("../../helpers/middleware/checkToken");

Route.post("/add", checkToken.login, controller.addEvaluation);
Route.post("/grade/add", controller.addPassingGrade);
Route.put("/grade/update/:id", controller.updatePassingGrade);
Route.get("/passinggrade", controller.getPassingGrade);

module.exports = Route;
