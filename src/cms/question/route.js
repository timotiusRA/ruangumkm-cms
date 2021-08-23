const express = require("express");
const Route = express.Router();
const controller = require("./controller");
const checkToken = require("../../helpers/middleware/checkToken");

Route.put("/update/:id", controller.updateQuestion);
Route.get("/view", controller.getQuestion);
Route.post("/add", controller.addQuestion);

module.exports = Route;
