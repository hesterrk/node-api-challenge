const express = require("express");
const cors = require("cors");
const server = express();
const helmet = require("helmet");
const projectsRouter = require("./projectsRouter");
const actionsRouter = require("./actionsRouter");

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

//Projects Route
server.use("/api/projects", projectsRouter);

//Actions Route
server.use("/api/actions", actionsRouter);

//Tester/home route

server.get("/", (req, res) => {
  res.send("It is working as should");
});

// Logger Custom middleware: av. with all endpoints

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl} `
  );
  next();
}

//Custom Middleware: get rid of 500 catch statements
server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong"
  });
});

// Custom Middleware: custom error message for bad requests
server.use((req, res) => {
  res.status(404).json({
    message: "Your request is not found"
  });
});

module.exports = server;
