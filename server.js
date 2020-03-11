const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const usersRouter = require("./users/userRouter");

const server = express();

server.use(express.json());

server.use("/users", usersRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint} | @ ${Date()}`);
  next();
}

module.exports = server;
