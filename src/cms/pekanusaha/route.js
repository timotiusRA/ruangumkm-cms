const express = require("express");
const Route = express.Router();
const pekanUsahaController = require("./controller");

Route.get("/byid/:id", pekanUsahaController.getByID);
Route.get("/", pekanUsahaController.getAll);

module.exports = Route;
