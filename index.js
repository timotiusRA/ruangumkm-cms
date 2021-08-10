require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const logger = require("morgan");

const cors = require("cors");
const mainRouter = require("./src/routes");

const app = express();
const port = PORT;
const server = require("http").createServer(app);

app.use(express.static("public"));
app.use(cors());
server.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", mainRouter);

module.exports = app;
