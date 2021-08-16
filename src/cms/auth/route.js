const express = require("express");
const Route = express.Router();
const controller = require("./controller");

Route.post("/login", controller.login);

module.exports = Route;
