const express = require("express");
const Route = express.Router();
const controller = require("./controller");

Route.get("/byid/:id", controller.getByID);
Route.get("/byphase", controller.getAllByPhase);
Route.get("/", controller.getAll);

module.exports = Route;
