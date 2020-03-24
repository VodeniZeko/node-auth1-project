const express = require("express");
const helmet = require("helmet");
const session = require("express-session"); //import session middleware

const server = express();
const userRouter = require("../user/user-router.js");
const loginRouter = require("../login/router.js");
const registerRouter = require("../register/router.js");
const logoutRouter = require("../logout/router.js");
const restricted = require("../register/restrict.js");

const sessionConfig = {
  name: " cookie monster",
  secret: process.env.SECRET || "secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production to send only over https
    httpOnly: true // true means no access from JS
  },
  resave: false,
  saveUninitialized: true // GDPR laws require to check with client
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/users", restricted, userRouter);
server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);
server.use("/api/logout", logoutRouter);
server.get("/", (req, res) => {
  res.status(200).json({ api: "runnin" });
});

module.exports = server;
