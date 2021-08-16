const express = require("express");
const Route = express.Router();
const controller = require("./controller");
const checkToken = require("../../helpers/middleware/checkToken");

Route.post("/add", checkToken.login, controller.addEvaluation);

module.exports = Route;
